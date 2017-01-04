
module.exports=function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/strategyList", {
            templateUrl: "templates/strategyList.html",
            controller: 'StrategyList'
        })
        .when('/strategyDetail', {
            templateUrl: "templates/strategyDetail.html",
            controller: 'StrategyDetail'
        })
        .when('/strategyDetailBrief', {
            templateUrl: "templates/strategyDetailBrief.html",
            controller: 'StrategyDetailBrief'
        })
        .otherwise({
            redirectTo: '/strategyList'
        });
};