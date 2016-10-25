(function(){
    "use strict";
    
    angular.module('NarrowItDownApp',[])
    
    .controller("NarrowItDownController",["MenuSearchService",function(search){
        var narrow = this;
        narrow.input = "";
        narrow.metoda = function(){
            search.getMatchedMenuItems(narrow.input);
        } 
    }])
    
    .service("MenuSearchService",["$http",function($http){
        this.getMatchedMenuItems = function(searchTerm){
            $http({
                method: "GET",
                url: "davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(result){
                console.log(result);
            })
        }
        
    }])
    

})()
