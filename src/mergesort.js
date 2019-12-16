exports.mergesorting = function(arr, order){
    let order_of_sort = order == 1 ? 1 : 0; //default to ascending order
    // record start time of algorithm
    let hrstart = process.hrtime();
    let sortedArray = mergeSort(arr,order_of_sort);
    let hrend = process.hrtime(hrstart);
    let mergesort_data = {};
    mergesort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
    mergesort_data.sortedData = sortedArray;
    mergesort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
    return mergesort_data;
}

function mergeSort (arr, order_of_sort) {
    if(order_of_sort == 0){
        if (arr.length == 1) {
            return arr;
          }
          let midpoint = Math.floor(arr.length / 2);
          let arr1 = arr.slice(0, midpoint);
          let arr2 = arr.slice(midpoint);
          return mergeAscending(mergeSort(arr1,order_of_sort),mergeSort(arr2,order_of_sort));
    }
    else{
        if (arr.length == 1) {
            return arr;
          }
          let midpoint = Math.floor(arr.length / 2);
          let arr1 = arr.slice(0, midpoint);
          let arr2 = arr.slice(midpoint);
          return mergeDescending(mergeSort(arr1,order_of_sort),mergeSort(arr2,order_of_sort));
    }
  }

  function mergeAscending (arr1, arr2) {
    let result = [];
    let arr1_index = 0;
    let arr2_index = 0;
    while (arr1_index < arr1.length && arr2_index < arr2.length) {
      if (arr1[arr1_index] < arr2[arr2_index]) {
        result.push(arr1[arr1_index]);
        arr1_index += 1;
      } else {
        result.push(arr2[arr2_index]);
        arr2_index += 1;
      }
    }
    let output = result.concat(arr1.slice(arr1_index)).concat(arr2.slice(arr2_index));
    return output;
  }

  function mergeDescending (arr1, arr2) {
    let result = [];
    let arr1_index = 0;
    let arr2_index = 0;
    while (arr1_index < arr1.length && arr2_index < arr2.length) {
      if (arr1[arr1_index] > arr2[arr2_index]) {
        result.push(arr1[arr1_index]);
        arr1_index += 1;
      } else {
        result.push(arr2[arr2_index]);
        arr2_index += 1;
      }
    }
    let output = result.concat(arr1.slice(arr1_index)).concat(arr2.slice(arr2_index));
    return output;
  }

module.exports