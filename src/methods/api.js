import { flatListToTree, ObjectLength } from "./extra-functions";
import { db } from "../firebase";
import { doc, getDocs, addDoc, updateDoc, collection, query, where, writeBatch } from "firebase/firestore";

// takes department data in object form
export const addDepartment = (departmentData, { setError, setIsSubmitting, setSuccess }) => {
    const departmentCollectionRef = collection(db, 'departments');
    addDoc(departmentCollectionRef, departmentData)
        .then(response => {
            setSuccess("Department inserted successfully");
            setError(null);
            setIsSubmitting(false);
        })
        .catch(error => {
            setSuccess(null);
            setIsSubmitting(false);
            setError(error.message || 'Something went wrong!');
        });
}

// takes department data in object form
export const updateDepartment = (departmentData, searchDepartmentValue, { setError, setIsSubmitting, setSuccess }) => {
    // console.log(searchDepartmentValue);
    const docRef = doc(db, 'departments', departmentData.id);
    console.log(docRef);
    updateDoc(docRef, departmentData)
    .then(response => {
        updateChildren(searchDepartmentValue, departmentData.departmentName, { setError, setIsSubmitting, setSuccess });
    })
    .catch((err) => {
        setIsSubmitting(false);
        setError(err.message || 'Something went wrong!');
        setSuccess(null);
    });
}

const updateChildren = async (departmentName, newDepartmentName, { setError, setIsSubmitting, setSuccess }) => {
    console.log(departmentName);
    console.log(newDepartmentName);
    // const departments = await getChildren(departmentName, {setError});
    // console.log(departments);
    const batch = writeBatch(db);
    // departments.forEach(department => {
        // const docRef = doc(db, 'departments', departments.id);
        const departmentCollectionRef = collection(db, 'departments');
        // console.log(docRef);
        // await updateDoc(docRef, {managedBy: departmentName})
        departmentCollectionRef.where('managedBy', '==', departmentName).get().then(response => {
            // let batch = firebase.firestore().batch()
            response.docs.forEach((doc) => {
                const docRef = departmentCollectionRef.doc(doc.id)
                batch.update(docRef, {managedBy: newDepartmentName})
            })
            batch.commit().then(() => {
                console.log(`updated all documents inside ${departmentCollectionRef}`)
            })
        })

        // .then(response => {
        //     console.log(response);
        //     setError(null);
        //     setIsSubmitting(false);
        //     setSuccess("Updated successfully");
        // })
        // .catch((err) => {
        //     setIsSubmitting(false);
        //     setError(err.message || 'Something went wrong!');
        //     setSuccess(null);
        // });
    // })
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
        const departmentCollectionRef = collection(db, 'departments');
        const q = query(departmentCollectionRef, where("managedBy", "==", departmentName));
        
        const querySnapshot = await getDocs(q);
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
        const departmentCollectionRef = collection(db, 'departments');
        const response = await getDocs(departmentCollectionRef);

        let departments = response.docs.map(doc => ({
            id: doc.id,
            title: doc.data().departmentName,
            value: doc.data().departmentName,
            parent: doc.data().managedBy ? doc.data().managedBy : null,
            parentId: null,
            children: []
        }))
        // assign parentId to each node to identify its parent
        departments.forEach(department => {
            departments.forEach(innerDepartment => {
                if(department.title === innerDepartment.parent){
                    innerDepartment.parentId = department.id;
                }
            })
        })
        // call flatListToTree (a custom function found in ./extra-functions.js) to
        // convert the array of departments (objects) into a parent-child hierarchy (tree)
        const result = flatListToTree(departments, "id", "parentId", "children", node => node.parentId === null);
        console.log(result);

        return result;
    }catch(error){
        setError(error.message || 'Something went wrong!');
    }
}

// const treeData = [
  //   {
  //     value: 'CEO',
  //     title: 'CEO',
  //     children: [
  //       {
  //         value: 'CFO',
  //         title: 'CFO',
  //         children: [
  //           {
  //             value: 'Finantial analyst',
  //             title: 'Finantial analyst',
  //           },
  //           {
  //             value: 'Auditors',
  //             title: 'Auditors',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'CMO',
  //         title: 'CMO',
  //         children: [
  //           {
  //             value: 'X',
  //             title: 'X',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  