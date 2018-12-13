angular.module("myapp")
    .directive("cartSummery", function (cart) {
        return {
            restrict: 'E',
            templateUrl: '/app/widgest/templates/cartSummery.html',
            controller: function ($scope) {
                var items = cart.getItems();
                //console.log(items);
                $scope.toatlqty = function () {
                    var q = 0;
                    for(var i=0;i<items.length;i++)
                    {
                        q += items[i].qty;
                        
                       // console.log(items[i].name);
                    }
                   
                    return q;
                }
                $scope.totalAmounts = function () {
                    var t = 0;
                    //for (var i = 0; i < items.length; i++) {
                    //    t += items[i].qty * items[i].ProductCost;
                    //}

                  
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].Category == "Food") {
                            t += ((items[i].ProductCost * items[i].qty) * (items[i].Guest));
                        }
                        else {
                            t += (items[i].ProductCost * items[i].qty);
                        }
                    }
                    return t;

                    return t;
                }
            }

        }
    })