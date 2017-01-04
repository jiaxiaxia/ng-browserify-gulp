
module.exports=function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/", {
            templateUrl: "templates/page1.html"
        })
        .otherwise({
            redirectTo: '/'
        });
};
