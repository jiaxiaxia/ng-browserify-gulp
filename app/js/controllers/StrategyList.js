module.exports = function ($scope, $location, $timeout, server, localStorageService) {

    $scope.shares = [];
    // 请求策略列表
    function getStrategyList() {
        var params = {url: '/bittle', data: {'type': 2}};
        server.get(params).then(function (result) {
            if ($scope.shares.length !== 0) {
                $scope.shares.map(function (value) {
                    for (var i = 0; i < result.data.data.length; i++) {
                         if (value.strategy === result.data.data[i].strategy) {
                            value.usage = result.data.data[i].usage;
                            value.id = result.data.data[i].id;
                            value.description = result.data.data[i].description;
                            value.name = result.data.data[i].name.indexOf('(') !== -1 ? result.data.data[i].name.split('(')[0] : result.name;
                            value.type = result.data.data[i].name.indexOf('(') !== -1 ? result.data.data[i].name.split('(')[1].split(')')[0] : ''
                         }
                    }
                })
            } else {
                result.data.data.map(function (value) {
                    $scope.shares.push({
                        id: value.id,
                        usage: value.usage,
                        strategy: value.strategy,
                        name: value.name.indexOf('(') !== -1 ? value.name.split('(')[0] : value.name,
                        type: value.name.indexOf('(') !== -1 ? value.name.split('(')[1].split(')')[0] : '',
                        description: value.description
                    })
                })
            }
            //_.orderBy($scope.shares,['numbers'],['desc']);
        }, function (err) {
            console.log("Error!");
        });
    }

    getStrategyList();

    // 请求涨跌幅
    function getStrategyListYield() {
        var params = {url: '/screen/stock/yield', data: null};
        server.get(params).then(function (result) {
            if ($scope.shares.length !== 0) {
                $scope.shares.map(function (value) {
                    for(var i=0;i<result.data.data.length;i++){
                        if (value.strategy === result.data.data[i].strategy) {
                            value.numbers = result.data.data[i].yield;
                            break;
                        }
                    }
                })
            } else {
                result.data.data.map(function (key) {
                    $scope.shares.push({
                        'strategy': key.strategy,
                        'numbers': key.yield,
                        'id':key.id
                    });
                })
            }
            //_.orderBy($scope.shares,['numbers'],['desc']);
            console.log($scope.shares);
        }, function (err) {
            console.log("Error!");
        });
    }

    getStrategyListYield();

    //页面跳转
    $scope.jump = function (id) {
        $scope.opct = id;
        $scope.shares.map(function(obj,index){
        	if(obj.id==id){
        		localStorageService.setStrategy('strategy',$scope.shares[index]);
        	}
        });
        var url = "/strategyDetail";
        $timeout(function () {
            $location.path(url);
            $scope.opct = " ";
        }, 300);
    };

    //返回功能
    $scope.return = function () {
        $scope.style = true;
        $timeout(function () {
            window.history.back(-1);
            $scope.style = false;
        }, 300);
    };
};
