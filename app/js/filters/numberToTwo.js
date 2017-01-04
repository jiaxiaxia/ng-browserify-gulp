module.exports =function () {
    return function (value) {
        if(Number(value)){
            return Number(value).toFixed(2);
        }else{
            return value;
        }
    }
};
