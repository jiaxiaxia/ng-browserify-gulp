module.exports=function(){
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            config.timeout = 20000;
            return config;
        },
        'responseError': function (errorResponse) {
            console.log(errorResponse.status);
            switch (errorResponse.status) {
                case 403:
                    break;
            }
            return $q.reject(errorResponse);
        }
    };
};