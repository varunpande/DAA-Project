exports.quicksorting = function(arr,order){
    order_of_sorting = order == 1 ? 1 : 0 //default to ascending
    if(order_of_sorting == 0){
        let first_index_ini = 0;
        let last_index_ini = arr.length - 1;
        // record start time of algorithm
        let hrstart = process.hrtime();
        quicksortAscending(arr,first_index_ini,last_index_ini);
        let hrend = process.hrtime(hrstart);
        let mergesort_data = {};
        mergesort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
        mergesort_data.sortedData = arr;
        mergesort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
        return mergesort_data;
    }
    else{
        let first_index_ini = 0;
        let last_index_ini = arr.length - 1;
        // record start time of algorithm
        let hrstart = process.hrtime();
        quicksortDescending(arr,first_index_ini,last_index_ini);
        let hrend = process.hrtime(hrstart);
        let mergesort_data = {};
        mergesort_data.executionTime = 'Execution time: ' + hrend[0] + ' s ' + hrend[1] / 1000000 + ' ms';
        mergesort_data.sortedData = arr;
        mergesort_data.rawTime = hrend[0]*1000 + hrend[1] / 1000000;
        return mergesort_data;
    }
}

function quicksortAscending(arr,first_index,last_index){
    if(last_index - first_index == 1 || first_index >= last_index){
        if(arr[first_index] >= arr[last_index] || arr[last_index] <= arr[first_index]){
            let temp = arr[first_index];
            arr[first_index] = arr[last_index];
            arr[last_index] = temp;
        }
        return ;
    }
    let left = first_index;
    let center = Math.floor((first_index + last_index)/2);
    let right = last_index;
    let temp = 0;
    if(arr[center] < arr[left]) {
        temp = arr[center];
        arr[center] = arr[left];
        arr[left] = temp;
    }
    if(arr[left] > arr[right]){
        temp = arr[right];
        arr[right] = arr[left];
        arr[left] = temp; 
    }
    if(arr[center] > arr[right]){
        temp = arr[right];
        arr[right] = arr[center];
        arr[center] = temp; 
    }
    //keeping the median at the last position
    temp = arr[center];
    arr[center] = arr[right - 1];
    arr[right - 1] = temp;
    //pivot to compare
    let pivot = arr[right - 1];
    //swapping the small elements to left and bigger elements to the right
    for(i = left , j = right - 1;;){
        //increment i untill we find a bigger element than the median on the left
        while(arr[++i] < pivot);
        //decrement j untill we find a smaller element than the median on the right
        while(arr[--j] > pivot);
        // if i crosses j stop
        if(i >= j){
            break;
        }
        // swap if the loop does'nt break and a number is found in wrong place.
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; 
    }

    //finally put the median at the center
    temp = arr[i];
    arr[i] = arr[right - 1];
    arr[right - 1] = temp;
    
    quicksortAscending(arr,left,i - 1);
    quicksortAscending(arr,i + 1,right);
}

function quicksortDescending(arr,first_index,last_index){
    if(last_index - first_index == 1 || first_index >= last_index){
        if(arr[first_index] <= arr[last_index] || arr[last_index] >= arr[first_index]){
            let temp = arr[first_index];
            arr[first_index] = arr[last_index];
            arr[last_index] = temp;
        }
        return;
    }
    let left = first_index;
    let center = Math.floor((first_index + last_index)/2);
    let right = last_index;
    let temp = 0;
    if(arr[center] > arr[left]) {
        temp = arr[left];
        arr[left] = arr[center];
        arr[center] = temp;
    }
    if(arr[left] < arr[right]){
        temp = arr[right];
        arr[right] = arr[left];
        arr[left] = temp; 
    }
    if(arr[center] < arr[right]){
        temp = arr[right];
        arr[right] = arr[center];
        arr[center] = temp; 
    }
    //keeping the median at the last position
    temp = arr[center];
    arr[center] = arr[right - 1];
    arr[right - 1] = temp;
    //pivot to compare
    let pivot = arr[right - 1];
    //swapping the big elements to left and small elements to the right
    for(i = left , j = right - 1;;){
        //increment i untill we find a smaller element than the median on the left
        while(arr[++i] > pivot);
        //decrement j untill we find a bigger element than the median on the right
        while(arr[--j] < pivot);
        // if i crosses j stop
        if(i >= j){
            break;
        }
        // swap if the loop does'nt break and a number is found in wrong place.
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; 
    }

    //finally put the median at the center
    temp = arr[i];
    arr[i] = arr[right - 1];
    arr[right - 1] = temp;
    
    quicksortDescending(arr,left,i - 1);
    quicksortDescending(arr,i + 1,right);
}

module.exports