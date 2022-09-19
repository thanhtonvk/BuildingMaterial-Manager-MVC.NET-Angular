var app = angular.module("News", ['angularUtils.directives.dirPagination']);
app.controller("NewsController", function ($scope, $rootScope, $http) {

    debugger;
    $scope.GetAllNews = function (searchString) {
        searchString = document.getElementById("txtSearch").value.toString();
        $http({
            method: "get",
            url: "/Admin/News/GetAllNews/?searchString=" + searchString,
        }).then(function (response) {
            $scope.NewsList = response.data;
        }, function () {
            alert("Lỗi lấy dữ liệu");
        })
    }
    $rootScope.News = {};
    $scope.LoadNews = function () {
        var ID = localStorage.getItem("IDNews");
        var Titile = localStorage.getItem("TitileNews");
        var Image = localStorage.getItem("ImageNews");
        var Content = localStorage.getItem("ContentNews");
        $rootScope.News.Titile = Titile;
        $rootScope.News.Image = Image;
        $rootScope.News.Content = Content;
        $rootScope.News.ID = ID;
        $scope._Titile = Titile;
        $scope._Content = Content;
        $scope._Image = Image;
    }


    $scope.GetNews = function (id) {
        $http({
            method: "post",
            url: "/Admin/News/GetNews/?id=" + id,
        }).then(function (response) {
            localStorage.setItem("IDNews", response.data.ID);
            localStorage.setItem("TitileNews", response.data.Titile);
            localStorage.setItem("ImageNews", response.data.Image);
            localStorage.setItem("ContentNews", response.data.Content);

        })
    }


    $scope.InsertNews = function () {

        $scope.News = {};
        var image = document.getElementById('txt-Image').value;
        var content = CKEDITOR.instances['txt-editor'].getData().toString();
        $scope.News.Titile = $scope._Titile;
        $scope.News.Image = image;
        $scope.News.Content = content;
        $http({
            method: "post",
            url: "/Admin/News/InsertNews",
            dataType: "json",
            data: JSON.stringify($scope.News)
        }).then(function (response) {
            $scope.GetAllNews('');
            $scope._Titile = "";
            $scope._Image = "";
            $scope._Content = "";
        })


    }
    $scope.UpdateNews = function () {
        var image = document.getElementById('txt-Image').value;
        var content = CKEDITOR.instances['txt-editor'].getData().toString();
        $scope.News = {};
        $scope.News.ID = $rootScope.News.ID;
        $scope.News.Titile = $scope._Titile;
        $scope.News.Image = image;
        $scope.News.Content = content;
        $http({
            method:"post",
            url: "/Admin/News/UpdateNews",
            dataType:"json",
            data:JSON.stringify($scope.News)
        }).then(function(response){
            alert(response.data);
        })
    }
    $scope.DeleteNews = function (id) {
        $http({
            method: "post",
            url: "/Admin/News/DeleteNews/?id=" + id,
            dataType:"json"
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllNews('');
        })
    }
})