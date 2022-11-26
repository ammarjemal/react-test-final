import { flatListToTree } from "./extra-functions";

// takes department data from form and makes a POST request to firebase
export const addDepartment = (departmentData, { setError, setIsSubmitting, setSuccess }) => {
    fetch('https://react-project-dff24-default-rtdb.firebaseio.com/departments.json', {
        method: 'POST',
        body: JSON.stringify(departmentData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if(res.ok){
            setError(null);
            return res.json();
        }else{
            return res.json().then((data) => {
            let errorMessage = 'Uploading failed!';
            if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
            });
        }
    })
    .then((data) => { // if successful
        // history.push('/')
        setSuccess("Department inserted successfully");
        setError(null);
        setIsSubmitting(false);
    })
    .catch((err) => {
        setSuccess(null);
        setIsSubmitting(false);
        setError(err.message || 'Something went wrong!');
    });
}

// takes department data from form and makes a PATCH request to firebase
export const updateDepartment = (departmentData, { setError, setIsSubmitting, setSuccess }) => {
    fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/departments/${departmentData.id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            departmentName: departmentData.departmentName,
            description: departmentData.description,
            managedBy: departmentData.managedBy,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if(res.ok){
            setError(null);
            return res.json();
        }else{
            return res.json().then((data) => {
            let errorMessage = 'Uploading failed!';
            if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
            });
        }
    })
    .then((data) => { // if successful
        // history.push('/')
        setError(null);
        setIsSubmitting(false);
        setSuccess("Updated successfully");
    })
    .catch((err) => {
        setIsSubmitting(false);
        setError(err.message || 'Something went wrong!');
        setSuccess(null);
    });
}

// takes department name from listed departments, searches by department name,
// and returns the whole data
export const searchDepartment = async (departmentName) => {
    let loadedDepartment = {}; // to store the returned data
    try {
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/departments.json?orderBy="departmentName"&equalTo="${departmentName}"&print=pretty`, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error('Request failed!');
        }
        const data = await response.json();
            for(const key in data){
                loadedDepartment = {
                    id: key,
                    ...data[key]
                };
            }
            return loadedDepartment;
        } catch (err) {
            console.log(err);
        }
    
    return loadedDepartment;
}

// searches data just like searchDepartment() but also finds the
// departments that are managed by this department
export const getChildren = async (departmentName) => {
    let loadedDepartments = [];
    try {
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/departments.json?orderBy="managedBy"&equalTo="${departmentName}"&print=pretty`, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error('Request failed!');
        }
        const data = await response.json();
            for(const key in data){
                loadedDepartments.push({
                    id: key,
                    ...data[key]
                });
            }
            console.log(loadedDepartments);
            return loadedDepartments;
        } catch (err) {
            // setError(err.message || 'Something went wrong!');
        }
    
    return loadedDepartments;
}


export const getTreeData = async ({setError}) => {
    try {
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/departments.json`, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error('Request failed!');
        }
        const data = await response.json();
            let loadedDepartments = []; // to store all departments (objects)
            for(const key in data){
                loadedDepartments.push({
                    id: key,
                    value: data[key].departmentName,
                    title: data[key].description,
                    parent: data[key].managedBy ? data[key].managedBy : null,
                    parentId: null,
                    children: []
                });
            }

            // assign parentId to each node to identify its parent
            loadedDepartments.forEach(department => {
                loadedDepartments.forEach(innerDepartment => {
                    if(department.value === innerDepartment.parent){
                        innerDepartment.parentId = department.id;
                    }
                })
            })

            // call flatListToTree (a custom function found in ./extra-functions.js) to
            // convert the array of departments (objects) into a parent-child hierarchy (tree)
            const result = flatListToTree(loadedDepartments, "id", "parentId", "children", node => node.parentId === null);

        return result;
    }catch (err) {
        setError(err.message || 'Something went wrong!');
    }
}
