angular.module("myapp")
.controller("checkoutCtrl", function ($scope, cart, remoteCallSvc, $location) {



    function getEvtDate(date) {
        var today = new Date(date);
        var todayDate = today.getDate()
        var todayMonth = today.getMonth() + 1;
        var todayYear = today.getFullYear();
        var todayHour = today.getHours();
        var todayMinutes = today.getMinutes();
        if (todayHour < 10) {
            todayHour = '0' + todayHour;
        }
        if (todayMinutes < 10) {
            todayMinutes = '0' + todayMinutes;
        }

        if (todayDate < 10) {
            todayDate = '0' + todayDate;
        }
        if (todayMonth < 10) {
            todayMonth = '0' + todayMonth;
        }

        return today = todayYear + '-' + todayMonth + '-' + todayDate;
    }
    var today = new Date();
    var todayDate = today.getDate()
    var todayMonth = today.getMonth() + 1;
    var todayYear = today.getFullYear();
    var todayHour = today.getHours();
    var todayMinutes = today.getMinutes();
    if (todayHour < 10) {
        todayHour = '0' + todayHour;
    }
    if (todayMinutes < 10) {
        todayMinutes = '0' + todayMinutes;
    }

    if (todayDate < 10) {
        todayDate = '0' + todayDate;
    }
    if (todayMonth < 10) {
        todayMonth = '0' + todayMonth;
    }

    today = todayYear + '-' + todayMonth + '-' + todayDate;
        //+ 'T' + todayHour + ':' + todayMinutes;
    $scope.placeOrder = function () {
        console.log($scope.client.shippingDetail.CustomerName);
        $("#paymentModal").modal('show');
      
        $scope.orders =[];
        //$scope.orders.push( {

        //    BookingDate: new Date(),
        //    CustomerName: $scope.shippingDetail.CustomerName,
        //    Address: $scope.shippingDetail.ShippingAddress,
        //    ContactNo: $scope.shippingDetail.Phone,
        //    Email: $scope.shippingDetail.Email
        //});
        
       

       
    }


    //Pay in Credit Card
    $scope.pay = function () {

        var expiration = $scope.card.exp_month.toString() + $scope.card.exp_year.toString();
        var r = {
            "createTransactionRequest": {
                "merchantAuthentication": {
                    "name": "3rE4dG86",
                    "transactionKey": "728wbUM9Dg335PcU"
                },
                "refId": "123456",
                "transactionRequest": {
                    "transactionType": "authOnlyTransaction",
                    // "amount": Math.ceil($scope.total * 100 / $scope.rate) / 100,
                    "amount": 100,

                    "payment": {
                        "creditCard": {
                            "cardNumber": $scope.card.number,
                            "expirationDate": expiration,
                            "cardCode": $scope.card.cvc
                        }
                    },
                    "lineItems": {
                        "lineItem": []

                    },
                    "tax": {
                        "amount": "4.26",
                        "name": "level2 tax name",
                        "description": "level2 tax"
                    },
                    "duty": {
                        "amount": "8.55",
                        "name": "duty name",
                        "description": "duty description"
                    },
                    "shipping": {
                        "amount": "4.26",
                        "name": "level2 tax name",
                        "description": "level2 tax"
                    },
                    "poNumber": "456654",
                    "customer": {
                        "id": "99999456654"
                    },
                    "billTo": {
                        "firstName": "",
                        "lastName": "",
                        "company": "",
                        "address": "",
                        "city": "",
                        "state": "",
                        "zip": "",
                        "country": ""
                    },
                    "shipTo": {
                        "firstName": "",
                        "lastName": "",
                        "company": "",
                        "address": "",
                        "city": "Pecan Springs",
                        "state": "TX",
                        "zip": "44628",
                        "country": "USA"
                    },
                    "customerIP": "192.168.1.1",
                    "transactionSettings": {
                        "setting": {
                            "settingName": "testRequest",
                            "settingValue": "false"
                        }
                    },
                    "userFields": {
                        "userField": [
                            {
                                "name": "MerchantDefinedFieldName1",
                                "value": "MerchantDefinedFieldValue1"
                            },
                            {
                                "name": "favorite_color",
                                "value": "blue"
                            }
                        ]
                    }
                }
            }
        };
        //console.log($scope.card.number);"unitPrice": Math.ceil((items[i].price * items[i].qty) * 100 / 80) * 100
        var items = cart.getItems();
        for (var i = 0; i < $scope.orders.length; i++) {
            r.createTransactionRequest.transactionRequest.lineItems.lineItem.push({
                "itemId": 1, "name": $scope.orders[i].ProductName,
                "description": $scope.orders[i].Address,
                "quantity": $scope.orders[i].Quantity,
                "unitPrice":100

            })
        }
        
        console.log(r);
        
     
        remoteCallSvc.post("https://apitest.authorize.net/xml/v1/request.api", null, r)
            .then(function (data) {
                console.log(    data);
                $scope.presentTime = today;
                var items = cart.getItems();
                var ftotal = 0;
               
                for (var i = 0; i < items.length; i++) {

                    if (items[i].Category === "Food") {
                        ftotal += ((items[i].ProductCost * items[i].qty) * (items[i].Guest));
                        //  t = ftotal;
                       
                    }
                    else {
                        ftotal += (items[i].ProductCost * items[i].qty * 1);
                        //  t += total;
                    }

                }
                for (var i = 0; i < items.length; i++) {

                    
               
                $scope.orders.push({

                    CustomerName: $scope.client.shippingDetail.CustomerName,
                    Address: $scope.client.shippingDetail.ShippingAddress,
                    ContactNo: $scope.client.shippingDetail.Phone,
                    Email: $scope.client.shippingDetail.Email,
                    TotalCost:ftotal,
                    BookingDate: $scope.presentTime,
                    TransactionId: data.data.transactionResponse.transId,
                    ProductCost: items[i].ProductCost,
                    ProductId: items[i].ProductId.toString(),
                    Quantity: items[i].qty,
                    EventDate: getEvtDate(items[i].EDate),
                    EventId: items[i].EventID,
                    GuestNo: items[i].Guest,
                    Catagory: items[i].Category,
                 
                    ProductName: items[i].ProductName,
                    //};
                }
                )
                }
                
                console.log($scope.orders);
                remoteCallSvc.post("http://localhost:7117/odata/BookingDetails/EventBookings", null, { "evts": $scope.orders })
                    .then(function (result) {
                        console.log(result);
                        //cart.clear();
                        $scope.orderCreated = result.data.OrderId;
                        $("#paymentModal").modal('hide');
                        $location.path("/thanks");
                    }, function (response) {
                        console.log(response);
                    });

            }, function (res) {
                console.log(res);
            });

    };

});