var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap', 'tm.pagination']);

scotchApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'index.html'
    }).when('/orders', {
        templateUrl: 'business/orders/orders.html'
    });
}]);

scotchApp.controller('scotchController', function ($scope, $http, $modal) {
    $http.get("json/menu.json").success(function (data) {
        $scope.menus = data;
    });

    $http.get("json/orders.json").success(function (data) {
        $scope.orders = data;
    });

    $scope.open = function (order) {
        var modalInstance = $modal.open({
            templateUrl: 'business/orders/order_details.html',
            controller: 'modalController',
            resolve : {
                order : function() {return order}
            }
        })
    };

    // 在变更分布的时候，重新获取数据条目
    // var reGetProducts = function(){
    //     // 发送给后台的请求数据
    //     var postData = {
    //         currentPage: $scope.paginationConf.currentPage,
    //         itemsPerPage: $scope.paginationConf.itemsPerPage
    //     };
    //
    //     $http.post('http://demo.miaoyueyue.com/php/demo/1/getProducts.php', postData).success(function(data){
    //         // 变更分页的总数
    //         $scope.paginationConf.totalItems = data.total;
    //         // 变更产品条目
    //         $scope.products = data.items;
    //     });
    // };

    // 配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 15,
        totalItems: 3
    };


    // 通过$watch currentPage和itemperPage 当他们一变化的时候，重新获取数据条目
    // $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);


});

scotchApp.controller('modalController', function ($scope, $modalInstance, order) {
    $scope.modalTitle = "订单详情";
    $scope.data = order;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});

