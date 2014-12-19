(function(){
    "use strict";

    angular.module('Bookmarks',[
        
    ])
    .controller('MainController',function($scope){
        $scope.name = 'puto amo';
        $scope.categories = ['HTML5','JavaScript','CSS','Games'];
        $scope.bookmarks = [
            {id:1,name:'Quizzpot.com',url:'https://quizzpot.com',category:'JavaScript'},
            {id:2,name:'Html5 Game Devs',url:'https://html5gamedevs.com',category:'Games'},
            {id:3,name:'CSS Tricks',url:'http://css-tricks.com',category:'CSS'},
            {id:4,name:'Bootstrap',url:'http://getbootstrap.com',category:'CSS'},
            {id:5,name:'Card',url:'http://jessepollak.github.io/card/',category:'JavaScript'}
        ];

        $scope.currentCategory = 'JavaScript';

        $scope.setCurrentCategory = function(category){
            $scope.currentCategory = category;
        }

        $scope.isCurrentCategory = function(category){
            return $scope.currentCategory === category;
        }
        $scope.save = function(bookmark){
            console.log(bookmark);
        }
    });
})();