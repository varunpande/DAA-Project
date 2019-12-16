//global variable array_length
var array_length;

exports.heapsorting = function (arr,order) {
    let order_of_sort = order == 1 ? 1 : 0; //default to ascending order
    // record start time of algorithm
    let hrstart = process.hrtime();
    if(order_of_sort == 0){
        array_length = arr.length;
        //create a max heap for ascending order
        for (let i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
            max_heap_root(arr, i);
        }
        for (i = arr.length - 1; i > 0; i--) {
            swap(arr, 0, i);
            array_length--;      
            max_heap_root(arr, 0);
        }
    }
    else{
        array_length = arr.length;
        //create a min heap for descending order
        for (let i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
            min_heap_root(arr, i);
        }
        for (i = arr.length - 1; i > 0; i--) {
            swap(arr, 0, i);
            array_length--;      
            min_heap_root(arr, 0);
        }
    }
    let hrend = process.hrtime(hrstart);
    let heapsort_data = {};
    heapsort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
    heapsort_data.sortedData = arr;
    heapsort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
    return heapsort_data;
}
  
function max_heap_root(input, i) {
    //Storing heap in BFS style
    //left child
    var left = 2 * i + 1;
    //right child
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]){
        //left node minimum
        max = left;
    }

    if (right < array_length && input[right] > input[max]){
        //right node minimum
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        max_heap_root(input, max);
    }
}

/* to create MAX  array */  
function min_heap_root(input, i) {
    //Storing heap in BFS style
    //left child
    var left = 2 * i + 1;
    //right child
    var right = 2 * i + 2;
    var min = i;

    if (left < array_length && input[left] < input[min]){
        //left node minimum
        min = left;
    }

    if (right < array_length && input[right] < input[min]){
        //right node minimum
        min = right;
    }

    if (min != i) {
        swap(input, i, min);
        min_heap_root(input, min);
    }
}

function swap(input, val1, val2) {
    var temp = input[val1];
    input[val1] = input[val2];
    input[val2] = temp;
}

module.exports