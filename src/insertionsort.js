exports.insertionsorting = function(arr,order){
    order_of_sort = order == 1 ? 1 : 0; //default to ascending
    sorted_array = [];
    if(order_of_sort == 0){
        // record start time of algorithm
        let hrstart = process.hrtime();
        for(let i = 0; i < arr.length; i++){
            for (let j = 0; j < i; j++){
                // we are always putting the maximum number in the end.
                if(arr[j] > arr[i]){
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp; 
                }
            }  
        }
        let hrend = process.hrtime(hrstart);
        let insertionsort_data = {};
        insertionsort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
        insertionsort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
        insertionsort_data.sortedData = arr;
        return insertionsort_data;
    }
    else{
        // record start time of algorithm
        let hrstart = process.hrtime();
        for(let i = 0; i < arr.length; i++){
            for (let j = 0; j < i; j++){
                // we are always moving the least number at the end.
                if(arr[j] < arr[i]){
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp; 
                }
            }  
        }
        let hrend = process.hrtime(hrstart);
        let insertionsort_data = {};
        insertionsort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
        insertionsort_data.sortedData = arr;
        insertionsort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
        return insertionsort_data;
    }
}

module.exports