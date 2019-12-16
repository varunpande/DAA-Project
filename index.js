var expressInstance = require('express');
var app = expressInstance();

var bodyParser = require('body-parser'); // Need body parsing
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var bubblesort_module = require('./src/bubblesort');
var heapsort_module = require('./src/heapsort');
var insertionsort_module = require('./src/insertionsort');
var mergesort_module = require('./src/mergesort');
var quicksort_module = require('./src/quicksort');
var rng_module = require('./src/rng');

//homepage loading
app.get('/', function(req, res){
    res.sendFile('./public/homepage.html', {root: __dirname});
});

//sort algorithm
app.get('/public/:sort_select', function(req, res){
    res.sendFile('./public/' + req.params.sort_select, {root: __dirname});
});

// get for images
app.get('/img/:img_path', function(req, res){
    res.sendFile('./img/' + req.params.img_path, {root: __dirname});
});

// get for css
app.get('/css/:css_path', function(req, res){
    res.sendFile('./css/' + req.params.css_path, {root: __dirname});
});

app.post('/sortsummary', urlencodedParser, function(req, res) {
    let incoming_arr = req.body.arrayData.split(',');
    arr_to_be_sorted = [];
    for(i = 0; i < incoming_arr.length; i++){
        arr_to_be_sorted.push(Number(incoming_arr[i]));
    }
    arr_for_bubble = arr_to_be_sorted.slice(0);
    bubblesort_data_to_send = bubblesort_module.bubblesorting(arr_for_bubble);
    arr_for_heap = arr_to_be_sorted.slice(0);
    heapsort_data_to_send = heapsort_module.heapsorting(arr_for_heap);
    arr_for_insert = arr_to_be_sorted.slice(0);
    insertionsort_data_to_send = insertionsort_module.insertionsorting(arr_for_insert);
    arr_for_merge = arr_to_be_sorted.slice(0);
    mergesort_data_to_send = mergesort_module.mergesorting(arr_for_merge);
    arr_for_quick = arr_to_be_sorted.slice(0);
    quicksort_data_to_send = quicksort_module.quicksorting(arr_for_quick);
    var responsePage = "<html><title>Project</title><link rel='stylesheet' type='text/css' href='http://sorting-demo.herokuapp.com/css/defaultstyle.css'><body><div class='main'><p> original array:["+ arr_to_be_sorted +"]</p>";
    //bubblesort data
    responsePage += "<p><b>Bubblesort data:</b></p>";
    var key = Object.keys(bubblesort_data_to_send);
    var value = Object.values(bubblesort_data_to_send);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    //heapsort data
    responsePage += "<p><b>heapsort data:</b></p>";
    var key = Object.keys(heapsort_data_to_send);
    var value = Object.values(heapsort_data_to_send);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    //insertionsort data
    responsePage += "<p><b>insertionsort data:</b></p>";
    var key = Object.keys(insertionsort_data_to_send);
    var value = Object.values(insertionsort_data_to_send);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    //mergesort data
    responsePage += "<p><b>mergesort data:</b></p>";
    var key = Object.keys(mergesort_data_to_send);
    var value = Object.values(mergesort_data_to_send);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    //quicksort data
    responsePage += "<p><b>quicksort data:</b></p>";
    var key = Object.keys(quicksort_data_to_send);
    var value = Object.values(quicksort_data_to_send);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    let sorting_time = [bubblesort_data_to_send.rawTime,heapsort_data_to_send.rawTime,insertionsort_data_to_send.rawTime,mergesort_data_to_send.rawTime,quicksort_data_to_send.rawTime];
    let sorting_tech_labels = ['"bubblesort"','"heapsort"','"insertionsort"','"mergesort"','"quicksort"'];
    responsePage += "</div><div id='canvasdiv'><canvas id='myChart'></canvas></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js'></script><script>var ctx = document.getElementById('myChart');\nvar myChart = new Chart(ctx,{type: 'line',data: {labels: [" + sorting_tech_labels + "],datasets: [{label: 'Sorting time taken in milliseconds',data:[" + sorting_time + "],}]},});</script></body></html>"
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(responsePage);
});

// post for bubblesort
app.post('/sort/:sorting_technique', urlencodedParser, function(req, res) {
    let incoming_arr = req.body.arrayData.split(',');
    let arr_to_be_sorted = []; 
    let data_to_send_asc = {error:"some issue with server"};
    let data_to_send_desc = {error:"some issue with server"};
    for(i = 0; i < incoming_arr.length; i++){
        arr_to_be_sorted.push(Number(incoming_arr[i]));
    }
    let desc_arr = arr_to_be_sorted.slice(0);
    var responsePage = "<html><title>Project</title><link rel='stylesheet' type='text/css' href='http://sorting-demo.herokuapp.com/css/defaultstyle.css'><body><div class='main'><p> original array:["+ arr_to_be_sorted +"]</p>";
    if(req.params.sorting_technique == 'bubblesort'){
        data_to_send_asc = bubblesort_module.bubblesorting(arr_to_be_sorted);
        data_to_send_desc = bubblesort_module.bubblesorting(desc_arr,1);
    }
    else if(req.params.sorting_technique == 'heapsort'){
        data_to_send_asc = heapsort_module.heapsorting(arr_to_be_sorted);
        data_to_send_desc = heapsort_module.heapsorting(desc_arr,1);
    }
    else if(req.params.sorting_technique == 'insertionsort'){
        data_to_send_asc = insertionsort_module.insertionsorting(arr_to_be_sorted);
        data_to_send_desc = insertionsort_module.insertionsorting(desc_arr,1);
    }
    else if(req.params.sorting_technique == 'mergesort'){
        data_to_send_asc = mergesort_module.mergesorting(arr_to_be_sorted);
        data_to_send_desc = mergesort_module.mergesorting(desc_arr,1);
    }
    else if(req.params.sorting_technique == 'quicksort'){
        data_to_send_asc = quicksort_module.quicksorting(arr_to_be_sorted);
        data_to_send_desc = quicksort_module.quicksorting(desc_arr,1);
    }
    responsePage += '<p> Ascending Sorting Data: </p>';
    var key = Object.keys(data_to_send_asc);
    var value = Object.values(data_to_send_asc);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    responsePage += '<p> Descending Sorting Data: </p>';
    key = Object.keys(data_to_send_desc);
    value = Object.values(data_to_send_desc);
    for( i in key ) {
        responsePage += '<p>' + String(key[i]) + ':' + String(value[i]) + '</p>';
    }
    let sorting_time = [data_to_send_asc.rawTime,data_to_send_desc.rawTime];
    let sorting_tech_labels = ['"Ascending"','"Descending"'];
    responsePage += "</div><div id='canvasdiv'><canvas id='myChart'></canvas></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js'></script><script>var ctx = document.getElementById('myChart');\nvar myChart = new Chart(ctx,{type: 'line',data: {labels: [" + sorting_tech_labels + "],datasets: [{label: 'Sorting time taken in milliseconds',data:[" + sorting_time + "],}]},});</script></body></html>"
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(responsePage);
});

app.post('/rng/:rng_type', urlencodedParser, function(req, res) {
    let upper_range = req.body.upRange;
    let lower_range = req.body.lowRange;
    let number_limit = req.body.numlimit;
    if(req.params.rng_type == "int"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end('<p>' + rng_module.getRandomInt(lower_range,upper_range,number_limit) + '</p>');
    }
    else{
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end('<p>' + rng_module.getRandomFloat(lower_range,upper_range,number_limit) + '</p>');
    }
});

app.listen(process.env.PORT || 4000);
