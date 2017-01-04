module.exports = function ($scope, $location, $timeout, $window, server, localStorageService) {
    $scope.share = [];
    $scope.loading = true;
    $scope.hasMore={
        count:0,
        nextUrl:'',
        show:false
    }
    $scope.shares = localStorageService.getStrategy('strategy');
    $scope.className = false;
    $scope.jump = function (url) {
        $scope.className = true;
        var clickData = localStorageService.getStrategy();
        localStorageService.setStrategy(clickData);
        $timeout(function () {
            $location.path(url);
            $scope.className = false;
        }, 300);
    };
    $scope.loadMore = function () {
        if($scope.hasMore.nextUrl){
            var params = {url: $scope.hasMore.nextUrl, data: null};
            server.get(params).then(function (result) {
                $scope.hasMore.count=result.data.data.count;
                $scope.hasMore.nextUrl=result.data.data.next;
                $scope.hasMore.show=false;
                $scope.share=$scope.share.concat(result.data.data.data);
                $scope.$digest();
            })
        }

    };
    function getStrategyDetail() {
        var params = {url: '/bittle/', data: null};
        params.url += $scope.shares.id + "/screen/stock";
        var data=[];
        server.get(params).then(function (result) {
            console.log(result.data.data.data);
            data=result.data.data.data;
            console.log(result.data.data.count);
            $scope.hasMore.count=result.data.data.count;
            console.log($scope.hasMore.count);
            $scope.hasMore.nextUrl=result.data.data.next;
            $scope.hasMore.show=false;
            $scope.loading = false;
            if (data.length > 0) {
                $scope.share = data;
                var time = new Date(data[0].updated_utc * 1000);
                var month = time.getMonth() + 1;
                $scope.share.updated_utc = time.getFullYear() + "." + (month > 10 ? month : '0' + month ) + "." + time.getDate() + " " + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());

            }
        }, function (error) {
            console.log('error!');
        });
    }

    getStrategyDetail();


    $scope.return = function () {
        $scope.style = true;
        $timeout(function () {
            window.history.back(-1);
            $scope.style = false;
        }, 300);
    };
};
