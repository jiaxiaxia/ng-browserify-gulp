module.exports=function($scope,$timeout, localStorageService){
	$scope.shares = localStorageService.getStrategy('strategy');
	$scope.return = function() {
	      $scope.style = true;
	      $timeout(function() {
	             window.history.back(-1);
	             $scope.style = true;
	    }, 300);
	};
};


