angular.module("myapp")
       .controller("cartcalculation", function ($scope, cart) {
           $scope.cartData = cart.getItems();
          
           $scope.total = function () {

               var total = 0;
               for (var i = 0; i < $scope.cartData.length; i++) {
                   total += ($scope.cartData[i].ProductCost * $scope.cartData[i].qty);
               }
               return total;

           }
           $scope.FoodCost = function () {

               var total = 0;
               var ftotal = 0;
               var t = 0;
            
               for (var i = 0; i < $scope.cartData.length; i++) {
               
                   if ($scope.cartData[i].Category === "Food") {
                       ftotal += (($scope.cartData[i].ProductCost * $scope.cartData[i].qty) * ($scope.cartData[i].Guest));
                     //  t = ftotal;
                   }
                   else {
                       ftotal += ($scope.cartData[i].ProductCost * $scope.cartData[i].qty * 1);
                     //  t += total;
                   }
               }
               console.log("Total : "+t);
               return ftotal;

           }
           $scope.remove = function (ProductId) {
               cart.remove(ProductId)

           }

    
     

       });