import { flatListToTree } from "./extra-functions";
import { db } from "../firebase";
import { doc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, writeBatch } from "firebase/firestore";

// takes department data in object form
export const addDepartment = async (departmentData, { setError, setIsSubmitting, setSuccess }) => {
    // get the departments collection
    const departmentCollectionRef = collection(db, 'departments');
    try{
        await addDoc(departmentCollectionRef, departmentData)
        setSuccess("Department inserted successfully");
        setError(null);
        setIsSubmitting(false);
    }catch(error){
        setSuccess(null);
        setIsSubmitting(false);
        setError(error.message || 'Something went wrong!');
    }
}

// takes department data in object form
export const updateDepartment = async (departmentData, searchDepartmentValue, { setError, setIsSubmitting, setSuccess }) => {
    try{
        const docRef = doc(db, 'departments', departmentData.id);
        await updateDoc(docRef, {
            departmentName: departmentData.departmentName,
            description: departmentData.description,
            managedBy: departmentData.managedBy ? departmentData.managedBy : null, // assign managedBy to null if it is a root
        })
        // We need to update the children too because if the department name is updated, all its
        // children will lose their reference to their parent.
        // For example, if the department name of CEO is changed to something like CEO_UPDATED,
        // CFO, CMO, and CTO will no longer be CEO's children since their managedBy property is still CEO.
        // Therefore, updateChildren will update the managedBy property of CFO, CMO, and CTO to CEO_UPDATED
        updateChildren(searchDepartmentValue, departmentData.departmentName, "update", { setError, setIsSubmitting, setSuccess });

    } catch(error) {
        setIsSubmitting(false);
        setError(error.message || 'Something went wrong!');
        setSuccess(null);
    }
}

const updateChildren = async (departmentName, newDepartmentName, action, { setError, setIsSubmitting, setSuccess }) => {
    // get children by the old department name
    const departments = await getChildren(departmentName, {setError});
    const batch = writeBatch(db);
    // iterate through the children and update their managedBy property
    departments.forEach(department => {
        const docRef = doc(db, 'departments', department.id);
        batch.update(docRef, {"managedBy": newDepartmentName});
    })
    batch.commit().then(() => {
        if(action === "update"){
            setSuccess("Department updated successfully");
        }else if(action === "delete"){
            setSuccess("Department deleted successfully");
        }
        setError(null);
        setIsSubmitting(false);
    })
}

// takes department name from listed departments, searches by department name,
// and returns the whole data
export const searchDepartment = async (departmentName, {setError}) => {
    let department = {}; // to store the returned data
    try {
        const departmentCollectionRef = collection(db, 'departments');
        const q = query(departmentCollectionRef, where("departmentName", "==", departmentName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            department = {
                id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        setError(err.message || "Something went wrong")
    }
    
    return department;
}

// searches data just like searchDepartment() but also finds the
// departments that are managed by this department (children)
export const getChildren = async (departmentName, {setError}) => {
    let departments = []; // to store the returned data
    try {
        // get the collection reference and perform fetch documents with managedBy
        // property of the passed departmentName
        const departmentCollectionRef = collection(db, 'departments');
        const q = query(departmentCollectionRef, where("managedBy", "==", departmentName));
        
        const querySnapshot = await getDocs(q);
        // iterate through the fetched documents and populate the departments array
        querySnapshot.forEach((doc) => {
            departments.push({
                id: doc.id,
                ...doc.data()
            })
        });
    } catch (err) {
        setError(err.message || "Something went wrong")
    }
    
    return departments;
}

export const getTreeData = async ({setError}) => {
    try{
        // get all departments
        const departmentCollectionRef = collection(db, 'departments');
        const response = await getDocs(departmentCollectionRef);

        // iterate through the fetched documents and populate the departments array
        let departments = response.docs.map(doc => ({
            id: doc.id,
            title: doc.data().departmentName,
            value: doc.data().departmentName,
            parent: doc.data().managedBy ? doc.data().managedBy : null,
            parentId: null,
            children: []
        }))
        // assign parentId to each node to identify its parent
        // nested for loop with a complexity of O(n^2)
        // if a department (CFO for example) found its parent (CEO), 
        // the parentId property of CFO is replaced with the id of CEO
        departments.forEach(department => {
            departments.forEach(innerDepartment => {
                if(department.title === innerDepartment.parent){
                    innerDepartment.parentId = department.id;
                    return;
                }
            })
        })
        // call flatListToTree (a custom function found in ./extra-functions.js) to
        // convert the array of departments (objects) into a parent-child hierarchy (tree)
        const result = flatListToTree(departments, "id", "parentId", "children", node => node.parentId === null);
        return result;
    }catch(error){
        setError(error.message || 'Something went wrong!');
    }
}

export const deleteDepartment = async (departmentName, { setError, setIsSubmitting, setSuccess }) => {
    try{
        const { id, managedBy } = await searchDepartment(departmentName, {setError});
        console.log(managedBy);
        const docRef = doc(db, 'departments', id);
        await deleteDoc(docRef);
        
        // We need to update the children's parent too because if a department is deleted, all its
        // children will lose their reference to their parent.
        // For example, if the department CEO is deleted, its children i.e CFO, CMO, and CTO 
        // will no longer have a parent since their managedBy property is still CEO.
        // Therefore, updateChildren will update the managedBy property of CFO, CMO, and CTO to CEO's parent
        
        updateChildren(departmentName, managedBy, "delete", { setError, setIsSubmitting, setSuccess });
        
    } catch(error) {
        setIsSubmitting(false);
        setError(error.message || 'Something went wrong!');
        setSuccess(null);
    }
}

// const deleteChildren = async (departmentName, { setError, setIsSubmitting, setSuccess }) => {
//     // get children by the parent name
//     const departments = await getChildren(departmentName, {setError});
//     const batch = writeBatch(db);
//     // iterate through the children and update their managedBy property
//     departments.forEach(department => {
//         const docRef = doc(db, 'departments', department.id);
//         batch.update(docRef, {"managedBy": newDepartmentName});
//     })
//     batch.commit().then(() => {
//         setSuccess("Department updated successfully");
//         setError(null);
//         setIsSubmitting(false);
//     })
// }