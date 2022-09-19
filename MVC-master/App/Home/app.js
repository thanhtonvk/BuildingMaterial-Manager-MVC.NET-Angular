var app = angular.module("Home", ['angularUtils.directives.dirPagination']);
app.controller("HomeController", function ($scope, $http, $rootScope) {
    debugger;

    $scope.GetAllCategory = function () {
        $http({
            method: "get",
            url: "/Home/GetALLCategory/",
        }).then(function (response) {
            $scope.CategoryList = response.data;
        })
    }
    $scope.GetNewProduct = function () {
        $http({
            method: "get",
            url: "/Home/GetNewProduct/",
        }).then(function (response) {
            $scope.ProductList = response.data;
        })
    }
    $scope.GetTopSelling = function () {
        $http({
            method: "get",
            url: "/Home/GetTopSelling/",
        }).then(function (response) {
            $scope.ProductList = response.data;
        })
    }
    $scope.GetProductCarousel =function(){
        $http({
            method: "get",
            url: "/Home/GetTopSelling/",
        }).then(function (response) {
            $scope.ProductSelling = response.data;
        })
        $http({
            method: "get",
            url: "/Home/GetHotDeal/",
        }).then(function (response) {
            $scope.ProductHotDeal = response.data;
        })
        $http({
            method: "get",
            url: "/Home/GetOnTop/",
        }).then(function (response) {
            $scope.ProductOnTop = response.data;
        })
    }
    
    $scope.GetAllProduct = function(){
        $http({
            method: "get",
            url: "/Home/GetAllProduct/",
        }).then(function (response) {
            $scope.ProductList = response.data;
        })
    }
    $scope.GetAllNews = function(){
        $http({
            method: "get",
            url: "/Home/GetAllNews/",
        }).then(function (response) {
            $scope.NewsList = response.data;
        })
    }
    
    
    $scope.GetProductByCategory = function (MetaName) {
        $http({
            method: "get",
            url: "/Home/GetProductByCategory/?MetaName=" + MetaName
        }).then(function (response) {
            $scope.ProductListByCategory = response.data;
        })
    }


    $rootScope.Product = {};
    $scope.LoadProduct = function () {
        $rootScope.Product.Description = localStorage.getItem("Description");
        $scope._ID= localStorage.getItem("ID");
        $scope._Name = localStorage.getItem("Name");
        $scope._MetaName = localStorage.getItem("MetaName");
        $scope._Cost = parseInt(localStorage.getItem("Cost"));
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
            method: "post",
            url: "/Home/GetImageProduct/?id=" + localStorage.getItem("ID"),
        }).then(function (response) {
            $scope.ImageProductList = response.data;
        })
        $http({
            method: "post",
            url: "/Home/GetRelatedProduct/?category=" + localStorage.getItem("Category"),
        }).then(function (response) {
            $scope.ProductList = response.data
        })

    }
    $scope.GetReviewProductList = function () {
        $http({
            method: "post",
            url: "/Home/GetReviewProduct/?product=" + localStorage.getItem("ID"),
        }).then(function (response) {
            $scope.ReviewProductList = response.data;
        })
    }
    $scope.InsertReivewProduct = function () {
        $scope.ReviewProduct = {};
        $scope.ReviewProduct.Product =localStorage.getItem("ID");
        $scope.ReviewProduct.Name = $scope._NamePerson;
        $scope.ReviewProduct.Email = $scope._EmailPerson;
        $scope.ReviewProduct.Content = $scope._ContentPerson;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.ReviewProduct.Date = date + ' ' + time;
        $http({
            method: "post",
            url: "/Home/ReviewProduct/",
            dataType: "json",
            data: JSON.stringify($scope.ReviewProduct)
        }).then(function (response) {
            alert(response.data);
            $scope.GetReviewProductList();
            $scope._NamePerson = "";
            $scope._EmailPerson = "";
            $scope._ContentPerson = "";
        })
    }
    $scope.GetProduct = function (id) {
        $http({
            method: "post",
            url: "/Home/GetProduct/?id=" + id,
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
    $scope.GetListCart = function(){
        $http({
            method:"post",
            url:"/Home/GetYourCarts/",
        }).then(function(response){
            $scope.CartList = response.data
           
        })
       
    }
    $scope.GetSubTotal = function(){
        $http({
            method:"post",
            url:"/Home/SubTotal/",
        }).then(function(res){
            $scope.subTotal = res.data
        })
    }
    $scope.AddCart = function(IDProduct){
        $.ajax({
            url:"/Home/AddCarts/?IDProduct="+IDProduct,
            contentType:'json',
            type:"POST",
            success:function(){
                window.location.reload('@Url.Action("YourCart","Home")')
                $scope.GetListCart();
                $scope.GetSubTotal();
            }
        })
    }
    $scope.DeleteCart = function(index){
        $http({
            method:"post",
            url:"/Home/DeleteCart/?index="+index,
            dataType: "json",
        }).then(function(){
            $scope.GetListCart();
            $scope.GetSubTotal();
        })
    }
    $scope.UpdateCart=function(index,quantity){
        $http({
            method:"post",
            url:"/Home/UpdateCart/?index="+index+"&quantity="+quantity,
            dataType:"json",
        }).then(function(){
            $scope.GetListCart();
            $scope.GetSubTotal();
        })
    }
    $scope.InsertCheckout = function(){
        $scope.CheckOut = {};
        $scope.CheckOut.FirstName = $scope._FirstName;
        $scope.CheckOut.LastName = $scope._LastName;
        $scope.CheckOut.Email = $scope._Email;
        $scope.CheckOut.Address = $scope._Address;
        $scope.CheckOut.PhoneNumber = $scope._PhoneNumber;
        $scope.CheckOut.Note = $scope._Note;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.CheckOut.Date = date + ' ' + time;
        $http({
            method:"post",
            url:"/Home/AddCheckout/",
            dataType:"json",
            data: JSON.stringify($scope.CheckOut)
        }).then(function(res){
            localStorage.setItem("IDCheckout",res.data);
        })
    }
    $scope.GetCartByID = function(IDCheckOut){
        if(IDCheckOut==null){
             IDCheckOut = localStorage.getItem("IDCheckout");
        }
        $http({
            method:"post",
            url:"/Home/GetCartByID/?IDCheckOut="+IDCheckOut,
        }).then(function(res){
            $scope.ListCart= res.data;
            var sum = 0;
            for (let i = 0; i < $scope.ListCart.length; i++) {
                sum +=$scope.ListCart[i].Cost;
            }
            $scope.subTotal = sum;
        })
        $http({
            method:"post",
            url:"/Home/GetCheckOutByID/?IDCheckOut="+IDCheckOut,
        }).then(function(res){
            $scope.CheckOut = res.data;
            $scope._ID = $scope.CheckOut.ID;
            $scope._FirstName = $scope.CheckOut.FirstName;
            $scope._LastName = $scope.CheckOut.LastName;
            $scope._Email = $scope.CheckOut.Email;
            $scope._Address = $scope.CheckOut.Address;
            $scope._PhoneNumber = $scope.CheckOut.PhoneNumber;
            $scope._Note = $scope.CheckOut.Note;
        })
    }

    $rootScope.News = {};
    $scope.LoadNews = function () {
        var Titile = localStorage.getItem("TitileNews");
        $scope._Titile = Titile;
    }


    $scope.GetNews = function (id) {
        $http({
            method: "post",
            url: "/Home/GetNews/?id=" + id,
        }).then(function (response) {
            localStorage.setItem("TitileNews", response.data.Titile);
            localStorage.setItem("ImageNews", response.data.Image);
            localStorage.setItem("ContentNews", response.data.Content);

        })
    }
    
    
})