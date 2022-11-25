import { arrayUnique } from "./extra-functions";

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
    let loadedDepartment = {};
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
            console.log(loadedDepartment);
            return loadedDepartment;
        } catch (err) {
            // setError(err.message || 'Something went wrong!');
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

// get tree data to populate department list
// export const getTreeData = async ({setError}) => {
//     try {
//         const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/departments.json`, {
//             method: 'GET',
//         })
//         if (!response.ok) {
//             throw new Error('Request failed!');
//         }
//         const data = await response.json();
//             let loadedDepartments = [];
//             for(const key in data){
//                 loadedDepartments.push({
//                     departmentName: data[key].departmentName,
//                     parent: data[key].managedBy,
//                 });
//             }
//             console.log(loadedDepartments);
//         let newArr = [];
//         // Step 1. Create a new array and assign each department to their corresponding parent
//         // this list (newArr) will contain each department with their children
//         loadedDepartments.forEach(department => {
//             for (let i = 0; i < loadedDepartments.length; i++) {
//                 if(loadedDepartments[i].parent === department.departmentName){
//                     newArr.push({
//                         parent: department.departmentName,
//                         children: [{
//                             parent: department.departmentName,
//                             children: []
//                         }]
//                     });
//                     console.log(newArr);
//                 }

//             }
//         });
//         console.log(newArr);
//         //--------------
//         // custom function to make an array unqiue
//         Array.prototype.unique = arrayUnique;
//         // 2. Merge the departments in children[] with the same parent
//         newArr.forEach(department => {
//             newArr.forEach(department2 => {
//                 if(department.parent === department2.parent){
//                     console.log(department);
//                     department.children = department.children.concat(department2.children).unique();
//                 }
//             })
//         })
//         newArr.forEach(department => {
//             console.log(department.children);
//             // while(newArr.children.length){
//                 department.children.forEach(children => {
//                     newArr.forEach(parent => {
//                         // console.log(parent.parent + ' ' + children.parent);
//                         if(parent.parent === children.parent){
//                             children.children = parent.children.concat(children.children).unique();
//                             // delete element from array because it is inserted to it's parent
//                             const index = newArr.indexOf(parent);
//                             if (index > -1) { // only splice array when item is found
//                                 newArr.splice(index, 1); // 2nd parameter means remove one item only
//                             }
//                         }
                
//                     })
//                 })
//             // }
//         })
//         // let tempArr = newArr;
//         // newArr.forEach(el => {
//         //     for (let i = 0; i < newArr.children.length; i++) {
//         //         const element = array[i];
                
//         //     }
//         //     console.log(el.parent);
//         // })
//         // final touch... removing duplicates
//         // newArr = newArr.filter((v,i,a)=>a.findLastIndex(v2=>(v2.place === v.place))===i)
// console.log(newArr);
//         return loadedDepartments;
//     }catch (err) {
//         setError(err.message || 'Something went wrong!');
//     }
// }
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
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
            let loadedDepartments = [];
            for(const key in data){
                loadedDepartments.push({
                    departmentName: data[key].departmentName,
                    parent: data[key].managedBy,
                });
            }
        let newArr = [];
        let loadedDepartmentsCopy = [...loadedDepartments];
        let root;
        // find root
        loadedDepartments.forEach(department => {
            if(department.parent === undefined){
                newArr.push({
                    value: department.departmentName,
                    children: [],
                })
                root = department;
                const index = loadedDepartmentsCopy.indexOf(department);
                if (index > -1) { // only splice array when item is found
                    loadedDepartmentsCopy.splice(index, 1); // 2nd parameter means remove one item only
                }
                return;
            }
        })
        function findChildren (departmentName) {
            let returnData = '';
            loadedDepartmentsCopy.forEach(department => {
                if(department.parent === departmentName){
                    returnData = department.departmentName
                    return ;
                }
            })
            return returnData;
        }
        let currentNode = root;
        loadedDepartmentsCopy.forEach(department => {
            console.log(currentNode.children);
            // while(currentNode.children.length){
                if(currentNode.departmentName === department.parent){
                    // currentNode = department.departmentName;
                    newArr.forEach(node => { // node in newArr... doesn't search for every element
                        console.log(node.value);
                        if(node.value === currentNode.departmentName){
                            console.log(department);
                            console.log(newArr);
                            node.children.push(department)
                            currentNode = department;
                            // return;
                        }
                    })
                    return;
                }
            // }
        })
        console.log(newArr);
        return loadedDepartments;
    }catch (err) {
        setError(err.message || 'Something went wrong!');
    }
}