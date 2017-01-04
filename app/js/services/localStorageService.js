module.exports=function ($window) {
	return {
		setStrategy:function(key,value){
                $window.localStorage[key]=JSON.stringify(value);
		},
		getStrategy:function(key){
			return JSON.parse($window.localStorage[key] || '{}');
		}
	};
};
