module.exports=function($window,$document,$location){
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            console.log(element[0].scrollTop);
            var html = document.documentElement;
            var fontSize=Number((html.style.fontSize).replace('px',''));
            var titleId=angular.element(document.querySelector('#ht'));
            var now=angular.element(document.querySelector('#now')) ;
            function throttle(fn, wait) {
                var time = Date.now();
                return function() {
                    if ((time + wait - Date.now()) < 0) {
                        fn();
                        time = Date.now();
                    }
                };
            }
            function loadMore(){
                var pageYOffset = $window.pageYOffset;
                var clientHeight = $document[0].documentElement.clientHeight;
                var offsetHeight = $document[0].body.offsetHeight;
                //当滚动到90%的时候去加载
                if(pageYOffset>0&&pageYOffset+clientHeight>=offsetHeight&&clientHeight<offsetHeight)
                {
                    scope.hasMore.show=true;
                    //scope.shopWorkCanLoad是否可加载,controller中定义
                    //scope.shopWorkOnLoad是否正在加载,controller中定义
                    if(scope.hasMore.count>0){
                        //加载数据,controller中定义
                        scope.loadMore();//
                    }
                }
            }
            function callback(){
                if($location.path()!=='/strategyDetail'){
                    return;
                }
                console.log($location.path());
                if(this.scrollLeft!==0){
                    this.scrollLeft = 0;
                }
                var offSet=((this.pageYOffset)/fontSize)-0.33;
                if(((this.pageYOffset)/fontSize)>=0.33){
                    if(offSet<=0.18){
                        titleId[0].style.webkitTransform="translateY("+(0.5-offSet*2.5)+"rem)";
                        titleId[0].style.webkitTransform="translateY("+(0.5-offSet*2.5)+"rem)";
                    }else{
                        titleId[0].style.webkitTransform="translateY(0)";
                    }
                }else{
                    titleId[0].style.webkitTransform="translateY(0.5rem)";
                }
                /*loadmore*/
                loadMore();

            }
            angular.element($window).bind("scroll",callback);
        }
    };
};
