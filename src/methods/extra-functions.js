export function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

export function arrayUnique() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

export const flatListToTree = (flatList, idPath, parentIdPath, childListPath, isParent) => {
    const rootParents = [];
    const map = {};
    for (const item of flatList) {
      if (!item[childListPath]) item[childListPath] = [];
      map[item[idPath]] = item;
    }
    for (const item of flatList) {
      const parentId = item[parentIdPath];
      if (isParent(item)) {
        rootParents.push(item);
      } else {
        const parentItem = map[parentId];
        parentItem[childListPath].push(item);
      }
    }
    return rootParents;
  };
