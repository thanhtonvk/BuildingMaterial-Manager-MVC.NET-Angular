var app = angular.module("Branch", ['angularUtils.directives.dirPagination']);
app.controller("BranchController",function($scope,$http){
    debugger;
    $scope.GetAllBranch = function(searchString){
        searchString = document.getElementById("txtSearch").value.toString();
        $http({
            method:"get",
            url:"/Admin/Branch/GetAllBranch/?searchString="+searchString,
        }).then(function(response){
            $scope.BranchList = response.data;
        },function(){
            alert("Lỗi lấy dữ liệu");
        })
    }
    $scope.InsertBranch = function(){
        var Action = document.getElementById("btnSave").getAttribute("value");
        if(Action=="Thêm"){
            $scope.Branch = {};
            $scope.Branch.Name = $scope._Name;
            $scope.Branch.MetaName = $scope._MetaName;
            $http({
                method: "post",
                url: "/Admin/Branch/InsertBranch",
                dataType:"json",
                data:JSON.stringify($scope.Branch)
            }).then(function(response){
                alert(response.data);
                $scope.GetAllBranch('');
                $scope._Name = "";
                $scope._MetaName = "";
            })
        }else{
            $scope.Branch = {};
            $scope.Branch.Name = $scope._Name;
            $scope.Branch.MetaName = $scope._MetaName;
            $scope.Branch.ID = document.getElementById("ID_").value;
            $http({
                method:"post",
                url: "/Admin/Branch/UpdateBranch",
                dataType:"json",
                data:JSON.stringify($scope.Branch)
            }).then(function(response){
                alert(response.data);
                $scope.GetAllBranch('');
                $scope._Name = "";
                $scope._MetaName = "";
                document.getElementById("btnSave").setAttribute("value","Thêm");
            })
        }
    }
    $scope.UpdateBranch = function(Branch){
        document.getElementById("ID_").value = Branch.ID;
        $scope._Name = Branch.Name;
        $scope._MetaName = Branch.MetaName;
        document.getElementById("btnSave").setAttribute("value","Update");
    }
    $scope.DeleteBranch = function(Branch){
        $http({
            method:"post",
            url: "/Admin/Branch/DeleteBranch",
            dataType:"json",
            data:JSON.stringify(Branch)
        }).then(function(response){
            alert(response.data);
            $scope.GetAllBranch('');
        })
    }
})