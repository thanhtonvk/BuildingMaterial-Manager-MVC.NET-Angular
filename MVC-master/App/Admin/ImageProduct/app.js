var app = angular.module("ImageProduct",[]);
app.controller("ImageProductController",function($scope,$http){
    debugger;
    $scope.GetAllImageProduct = function(){
        $http({
            method:"get",
            url:"/Admin/ImageProduct/GetImageProduct/?id="+localStorage.getItem("ID"),
        }).then(function(response){
            $scope.ImageProductList = response.data;
        },function(){
            alert("Lỗi lấy dữ liệu");
        })
    }
    $scope.InsertImageProduct = function(){
        var Action = document.getElementById("btnSave").getAttribute("value");
        if(Action=="Thêm"){
            $scope.ImageProduct = {};
            var image = document.getElementById('txt-Image').value;
            $scope.ImageProduct.Image = image;
            $scope.ImageProduct.Product =localStorage.getItem("ID")
            $http({
                method: "post",
                url: "/Admin/ImageProduct/InsertImageProduct",
                dataType:"json",
                data:JSON.stringify($scope.ImageProduct)
            }).then(function(response){
                alert(response.data);
                $scope.GetAllImageProduct('');
                $scope._Image = "";
            })
        }else{
            $scope.ImageProduct = {};
            var image = document.getElementById('txt-Image').value;
            $scope.ImageProduct.Image = image;
            $scope.ImageProduct.Product =localStorage.getItem("ID")
            $scope.ImageProduct.ID = document.getElementById("ID_").value;
            $http({
                method:"post",
                url: "/Admin/ImageProduct/UpdateImageProduct",
                dataType:"json",
                data:JSON.stringify($scope.ImageProduct)
            }).then(function(response){
                alert(response.data);
                $scope.GetAllImageProduct('');
                $scope._Image = "";
                document.getElementById("btnSave").setAttribute("value","Thêm");
            })
        }
    }
    $scope.UpdateImageProduct = function(ImageProduct){
        document.getElementById("ID_").value = ImageProduct.ID;
        $scope._Image = ImageProduct.Image;
        document.getElementById("btnSave").setAttribute("value","Cập nhật");
    }
    $scope.DeleteImageProduct = function(id){
        $http({
            method:"post",
            url: "/Admin/ImageProduct/DeleteImageProduct/?id="+id,
        }).then(function(response){
            alert(response.data);
            $scope.GetAllImageProduct('');
        })
    }
})