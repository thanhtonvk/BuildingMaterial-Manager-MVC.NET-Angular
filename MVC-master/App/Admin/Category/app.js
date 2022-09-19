var app = angular.module("Category", ['angularUtils.directives.dirPagination']);
app.controller("CategoryController", function ($scope, $http) {
    debugger;
    $scope.GetAllCategory = function (searchString) {
        searchString = document.getElementById("txtSearch").value.toString();
        $http({
            method: "get",
            url: "/Admin/Category/GetAllCategory/?searchString=" + searchString,
        }).then(function (response) {
            $scope.CategoryList = response.data;
        }, function () {
            alert("Lỗi lấy dữ liệu");
        })
    }

    $scope.InsertCategory = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Thêm") {
            $scope.Category = {};
            $scope.Category.Name = $scope._Name;
            $scope.Category.MetaName = $scope._MetaName;
            $http({
                method: "post",
                url: "/Admin/Category/InsertCategory",
                dataType: "json",
                data: JSON.stringify($scope.Category)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllCategory('');
                $scope._Name = "";
                $scope._MetaName = "";
            })
        } else {
            $scope.Category = {};
            $scope.Category.Name = $scope._Name;
            $scope.Category.MetaName = $scope._MetaName;
            $scope.Category.ID = document.getElementById("ID_").value;
            $http({
                method: "post",
                url: "/Admin/Category/UpdateCategory",
                dataType: "json",
                data: JSON.stringify($scope.Category)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllCategory('');
                $scope._Name = "";
                $scope._MetaName = "";
                document.getElementById("btnSave").setAttribute("value", "Thêm");
            })
        }
    }
    $scope.UpdateCategory = function (Category) {
        document.getElementById("ID_").value = Category.ID;
        $scope._Name = Category.Name;
        $scope._MetaName = Category.MetaName;
        document.getElementById("btnSave").setAttribute("value", "Cập nhật");
    }
    $scope.DeleteCategory = function (Category) {
        $http({
            method: "post",
            url: "/Admin/Category/DeleteCategory",
            dataType: "json",
            data: JSON.stringify(Category)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllCategory('');
        })
    }
})