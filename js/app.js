(function(){
    "use strict";
    
    angular.module('NarrowItDownApp',[])
    
    .controller("NarrowItDownController",["MenuSearchService","removeItem",function(search,remove){
        var narrow = this;
        narrow.input = "";
        narrow.found = [];
        narrow.loader = false;
        narrow.nothing = false;
        narrow.check = function(){
            if(narrow.input){
                narrow.nothing = false;
                narrow.loader = true;
                search.getMatchedMenuItems(narrow.input).then(function(result) {
                    narrow.found = result.items;
                    narrow.nothing = result.empty;
                    narrow.loader = false;
                });
            }else{
                narrow.nothing = true;
            }
        };
        narrow.removeItem = function(index){
            remove.removeItem(index, narrow.found)
        };
    }])
    .service("MenuSearchService",["$http",function($http){
        this.getMatchedMenuItems = function(searchTerm){
            return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
                .then(getList)
                .catch(function(error){
                    console.log("Something went wrong.");
            });
            function getList(result){
                var foundItems = result.data.menu_items.filter(function(obj){
                    return obj.description.indexOf(searchTerm) != -1
                });
                return {
                    items:foundItems,
                    empty: (foundItems.length)?false:true
                }
            }
        }
    }])
    .service("removeItem",function(){
        this.removeItem = function (itemIndex,array) {
            array.splice(itemIndex, 1);
        };
    })
    .directive("foundItems",function(){
        return {
            templateUrl: 'template/itemsTable.template.html',
            restrict: 'E',
            scope: {
                foundItems: "<",
                onRemove: "&"
            }
        }
    })
    .directive("loader",function(){
        return {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            restrict: "E"
        }
    })
})()
