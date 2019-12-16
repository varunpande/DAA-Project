exports.getRandomInt = function(min, max, number) {
    array = [];
    while (number > 0){
        min = Math.ceil(min);
        max = Math.floor(max);
        array.push(Math.floor(Math.random() * (max - min)) + min); //The maximum is exclusive and the minimum is inclusive
        number--;
    }
    return array;
}

exports.getRandomFloat = function(min, max,number) {
    array = [];
    while (number > 0){
        array.push(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        number--;
    }
    return array;
}

module.exports