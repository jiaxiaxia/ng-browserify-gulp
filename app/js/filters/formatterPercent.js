module.exports =function () {
    return function (value) {
        if(Number(value)){
            return (Number(value)*100).toFixed(2)+'%';
        }else{
            return value;
        }
    }
};
