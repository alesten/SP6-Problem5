var app = angular.module('DemoApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/list", {
                templateUrl: "views/user/list.html",
                controller: "UserController"
            })
            .when("/details/:id", {
                templateUrl: "views/user/details.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/list"
            });
});


var users = [];
app.controller("UserController", function ($http, $routeParams, $scope) {
    var self = this;
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            $scope.users = users;
        })
    }
    else { //We used the cache property on the http request instead
        $scope.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.id)
        $scope.user = users[$routeParams.id];
    }
});
