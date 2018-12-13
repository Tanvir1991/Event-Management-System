angular.module("myapp")
        .factory("cart", function () {
            var cartItems = [];
            return {
                add: function (ProductId, ProductName, ProductCost, Category, Guest,EDate,EID) {
                    var ifexist = false;
                    for(var i=0;i<cartItems.length;i++)
                    {
                        if (cartItems[i].ProductId === ProductId)
                        {
                            ifexist = true;
                            cartItems[i].qty ++;
                            break;
                        }
                       

                    }
                    if(!ifexist)
                    {
                        cartItems.push({
                            ProductId: ProductId, ProductName: ProductName, ProductCost: ProductCost,
                            Category: Category,
                            qty: 1, Guest: Guest, EDate:EDate, EventID:EID
                        });
                    }
                },
                remove: function (ProductId)
                {
                    for (var i = 0; i < cartItems.length; i++) {
                        cartItems[i].ProductId == ProductId;
                        cartItems.splice(i, 1);
                        break;

                    }
                },
                clear: function () {
                    cartItems.length = 0;
                },
                getItems:function()
                {
                    return cartItems;
                }
            }
        })