(function(){
    "use strict";

    angular.module('Bookmarks',[
        'ngResource'
    ])

    .service('Category',function($http){
        this.getAll = function(success,failure){
            $http.get('http://bookmarks-angular.herokuapp.com/api/categories')
                .success(success)
                .error(failure);  
        }
    })

    .factory('Bookmark',function($resource){
        return $resource('http://bookmarks-angular.herokuapp.com/api/bookmarks/:id',{
            id: '@id'
        },{
            update: {method:'PUT'}
        });
    })

    .directive('bootstrapSelect',function(){
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                $(element).selectpicker();
                var collection = attrs.bootstrapSelect,
                valueProperty = attrs.selectValue,
                labelProperty = attrs.selectLabel,
                model = attrs.ngModel;

                scope.$watch(collection,function(data){
                    if(data){
                        $(element)
                            .find('option')
                            .remove();
                        var html = [];
                        $.each(data, function(index, object) {
                            html.push('<option value="'+object[valueProperty]+'">');
                            html.push(object[labelProperty]);
                            html.push('</option>');
                        });
                        $(element).append(html.join(''));
                        $(element).selectpicker('refresh');
                    }
                });
            }
        }
    })

    .controller('MainController',function($scope, Category, Bookmark){
        $scope.name = 'puto amo';
        Category.getAll(function(data){
            $scope.categories = data.categories;
            $scope.currentCategory = data.categories[0];
            $scope.bookmarks = Bookmark.query();
        });
        
        $scope.currentCategory = 'JavaScript';

        $scope.setCurrentCategory = function(category){
            $scope.currentCategory = category;
        }

        $scope.isCurrentCategory = function(category){
            return $scope.currentCategory.id === category.id;
        }

        $scope.showWindow = function(bookmark){
            $scope.bookmarkForm.$setPristine();
            $scope.bookmarkForm.$setUntouched();

            bookmark = bookmark || {category:$scope.currentCategory,url:''};
            $scope.bookmark = bookmark;
            $('#bookmarkModal').modal('show');
        }

        $scope.save = function(bookmark){
            if($scope.bookmarkForm.$valid){
                if(!bookmark.id){
                    var record = new Bookmark();
                    record.title = bookmark.title;
                    record.url = bookmark.url;
                    record.category_id = bookmark.category.id;
                    record.$save(function(){
                        $scope.bookmarks.push(record);
                    });
                }else{
                    bookmark.$update();
                }
                $('#bookmarkModal').modal('hide');
            }
        }

        $scope.remove = function(bookmark){
            bookmark.$remove(function(){
                for(var i=0,len=$scope.bookmarks.length;i<len;i++){
                    if($scope.bookmarks[i].id === bookmark.id){
                        $scope.bookmarks.splice(i,1);
                        break;
                    }
                }
            });
        }
    });
})();