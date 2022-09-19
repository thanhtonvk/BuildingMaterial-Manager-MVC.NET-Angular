var app = angular.module("Product", ['angularUtils.directives.dirPagination']);
app.controller("ProductController", function ($scope, $rootScope, $http) {
    debugger;
    $scope.GetAllProduct = function (searchString) {
        searchString = document.getElementById("txtSearch").value.toString();
        $http({
            method: "get",
            url: "/Admin/Product/GetAllProduct/?searchString=" + searchString,
        }).then(function (response) {
            $scope.ProductList = response.data;
        }, function () {
            alert("Lỗi lấy dữ liệu");
        })
    }
    $scope.GetAllBranch = function(){
        $http({
            method:"get",
            url:"/Admin/Product/GetAllBranch/",
        }).then(function(response){
            $scope.BranchList = response.data;
        })
    }
    $scope.GetAllCategory = function(){
        $http({
            method:"get",
            url:"/Admin/Product/GetAllCategory/",
        }).then(function(response){
            $scope.CategoryList = response.data;
        })
    }
    $rootScope.Product = {};
    $scope.LoadProduct = function () {
        $rootScope.Product.Description = localStorage.getItem("Description");
        $scope._Name = localStorage.getItem("Name");
        $scope._MetaName = localStorage.getItem("MetaName");
        $scope._Cost = localStorage.getItem("Cost");
        $scope._Image = localStorage.getItem("Image");
        $scope._Description = localStorage.getItem("Description");
        $scope._Details = localStorage.getItem("Details");
        $scope._HotDeal = localStorage.getItem("HotDeal");
        $scope._IsTopSeller = localStorage.getItem("IsTopSeller");
        $scope._IsOnTop = localStorage.getItem("IsOnTop");
        $scope._IsNew = localStorage.getItem("IsNew");
        $scope._IsStatus = localStorage.getItem("IsStatus");
        $scope._Category = localStorage.getItem("Category");
        $scope._Brand = localStorage.getItem("Brand");
        $http({
            method:"post",
            url:"/Admin/ImageProduct/GetImageProduct/?id="+localStorage.getItem("ID"),
        }).then(function(response){
            $scope.ImageProductList = response.data;
        })
    }


    $scope.GetProduct = function (id) {
        $http({
            method: "post",
            url: "/Admin/Product/GetProduct/?id=" + id,
        }).then(function (response) {
            localStorage.setItem("ID", response.data.ID);
            localStorage.setItem("Name", response.data.Name);
            localStorage.setItem("MetaName", response.data.MetaName);
            localStorage.setItem("Cost", response.data.Cost);
            localStorage.setItem("Image", response.data.Image);
            localStorage.setItem("Description", response.data.Description);
            localStorage.setItem("Details", response.data.Details);
            localStorage.setItem("HotDeal", response.data.HotDeal);
            localStorage.setItem("IsTopSeller", response.data.IsTopSeller);
            localStorage.setItem("IsOnTop", response.data.IsOnTop);
            localStorage.setItem("IsNew", response.data.IsNew);
            localStorage.setItem("IsStatus", response.data.IsStatus);
            localStorage.setItem("Category", response.data.Category);
            localStorage.setItem("Brand", response.data.Brand);
        })
    }


    $scope.InsertProduct = function () {

        $scope.Product = {};
        var image = document.getElementById('txt-Image').value;
        var description = CKEDITOR.instances['txt-Description'].getData().toString();
        var detail = CKEDITOR.instances['txt-Detail'].getData().toString();
        $scope.Product.Name = $scope._Name;
        $scope.Product.MetaName = $scope._MetaName;
        $scope.Product.Cost = $scope._Cost;
        $scope.Product.Image = image;
        $scope.Product.Description = description;
        $scope.Product.Details = detail;
        $scope.Product.HotDeal = $scope._HotDeal;
        $scope.Product.IsTopSeller = $scope._IsTopSeller;
        $scope.Product.IsOnTop = $scope._IsOnTop;
        $scope.Product.IsNew = $scope._IsNew;
        $scope.Product.IsStatus = $scope._IsStatus;
        $scope.Product.Category = $scope._Category;
        $scope.Product.Brand = $scope._Brand;
        $http({
            method: "post",
            url: "/Admin/Product/InsertProduct",
            dataType: "json",
            data: JSON.stringify($scope.Product)
        }).then(function (response) {
            alert(response.data);
        })
    }
    $scope.UpdateProduct = function () {
        $scope.Product = {};
        var image = document.getElementById('txt-Image').value;
        var description = CKEDITOR.instances['txt-Description'].getData().toString();
        var detail = CKEDITOR.instances['txt-Detail'].getData().toString();
        $scope.Product.ID = localStorage.getItem("ID");
        $scope.Product.Name = $scope._Name;
        $scope.Product.MetaName = $scope._MetaName;
        $scope.Product.Cost = $scope._Cost;
        $scope.Product.Image = image;
        $scope.Product.Description = description;
        $scope.Product.Details = detail;
        $scope.Product.HotDeal = $scope._HotDeal;
        $scope.Product.IsTopSeller = $scope._IsTopSeller;
        $scope.Product.IsOnTop = $scope._IsOnTop;
        $scope.Product.IsNew = $scope._IsNew;
        $scope.Product.IsStatus = $scope._IsStatus;
        $scope.Product.Category = $scope._Category;
        $scope.Product.Brand = $scope._Brand;
        $http({
            method: "post",
            url: "/Admin/Product/UpdateProduct",
            dataType: "json",
            data: JSON.stringify($scope.Product)
        }).then(function (response) {
            alert(response.data);
        })
    }
    $scope.DeleteProduct = function (id) {
        $http({
            method: "post",
            url: "/Admin/Product/DeleteProduct/?id=" + id,
            dataType: "json"
        }).then(function (response) {
            alert(response.data);
        })
    }
})