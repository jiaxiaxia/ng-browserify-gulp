module.exports=function($window,$document){
    return {
        restrict: 'A',
        template: '<div class="letter-holder">'
        +'<div class="l-1 letter">加</div>'
        +'<div class="l-2 letter">载</div>'
        +'<div class="l-3 letter">中</div>'
        +'<div class="l-4 letter">.</div>'
        +'<div class="l-5 letter">.</div>'
        +'<div class="l-6 letter">.</div>'
        +'</div>',
        restrict: 'E',
        replace:true
    }

}
