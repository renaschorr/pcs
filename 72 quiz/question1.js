
Array.prototype.myMap = function(callback) {
    const newArray = [];
    for(let i = 0; i < this.length; i++) {
      newArray.push(callback(this[i]));
    }
    return newArray;
  }

  const originalArray = [3, 4, 6];
  const newArray = originalArray.myMap(function(value) {
    return value * 2;
  });

  console.log("Original Array:", originalArray);
  console.log("New Array:", newArray);

  // Array.prototype? Used correctly, but we didnt cover that yet in class...
