exports.bubblesorting = function(arr, order){
    let order_of_sort = order == 1 ? 1 : 0; //default to ascending order
    let inputArray = arr;
    let temp = 0;
    let number_of_swaps_per_stage = [];
    let swap_flag = true;
    
    // record start time of algorithm
    let hrstart = process.hrtime();
    while (swap_flag == true){
        let number_of_swaps = 0;
        for(i=0; i<( inputArray.length - 1 ) ; i++){
            if(order_of_sort == 0){
                if(inputArray[i] > inputArray[i+1]){ // ascending order
                    temp = inputArray[i];
                    inputArray[i] = inputArray[i+1];
                    inputArray[i+1] = temp;
                    number_of_swaps += 1;
                }
            }
            else {
                if(inputArray[i] < inputArray[i+1]){ // descending order
                    temp = inputArray[i];
                    inputArray[i] = inputArray[i+1];
                    inputArray[i+1] = temp;
                    number_of_swaps += 1; 
                }
            }
        }
        if(number_of_swaps > 0){
            swap_flag = true;
        }
        else{
            swap_flag = false;
        }
        number_of_swaps_per_stage.push(number_of_swaps);
    }
    // record end time of algorithm
    let hrend = process.hrtime(hrstart);
    let bubblesort_data = {};
    bubblesort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
    bubblesort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
    bubblesort_data.sortedData = inputArray;
    bubblesort_data.swaps = number_of_swaps_per_stage;
    return bubblesort_data;
}

module.exports