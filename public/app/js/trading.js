Number.prototype.noExponents = function () {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '', sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}

var app = new Vue({
    el: '#adongular-app',
    data: {
        uid: $('input[name=uid]').val() + "",
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        assetPrice: 0,
        usdPrice: 0,
        symbol: $('#baseAsset').val() + '' + $('#tradeAsset').val(),
        baseAsset: $('#baseAsset').val(),
        tradeAsset: $('#tradeAsset').val(),
        baseBalance: $('#baseBalance').val(),
        tradeBalance: $('#tradeBalance').val(),
        selectedBuyPrice: '',
        selectedSellPrice: '',
        txtSellTotalPrice: '',
        buyAmount: '',
        sellAmount: '',
        feeBuy: '',
        feeSell: '',
        totalBuy: '',
        totalSell: '',
        tnws: null,
        tnotifications: null,
        buyOrders: [],
        sellOrders: [],
        OwnbuyOrders: [],
        OwnsellOrders: [],

    },
    methods: {
        fetchPrice() {
            const url = '/price/' + this.baseAsset + '/' + this.tradeAsset
            $.get(url).then((response) => {
                // console.log(response)
                this.assetPrice = response['' + this.tradeAsset];
            });
        },
        fetchOrders() {
            var postData = { _csrf: this.csrf }
            const orders_url = '/ordersdata/' + this.baseAsset + '/' + this.tradeAsset

            let self = this
            $.ajax({
                url: orders_url,
                method: 'POST',
                data: postData,
                async: false,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    self.buyOrders = data.buyOrders;
                    self.sellOrders = data.sellOrders;
                    self.OwnbuyOrders = data.OwnbuyOrders;
                    self.OwnsellOrders = data.OwnsellOrders;
                },
                error: function (error) {
                    console.log(error);
                }
            });

            this.buyOrders = self.buyOrders
            this.sellOrders = self.sellOrders
            this.OwnbuyOrders = self.OwnbuyOrders
            this.OwnsellOrders = self.OwnsellOrders

        },
        setPrice() {
            this.selectedBuyPrice = this.assetPrice;
            this.selectedSellPrice = this.assetPrice;
            this.calcBuyFee();
            this.calcSellFee();
        },
        calcBuyFee() {
            this.feeBuy = Number(parseFloat((this.selectedBuyPrice * this.buyAmount) * 1 / 100).toFixed(10)).noExponents();
            this.totalBuy = Number(parseFloat(((this.selectedBuyPrice * this.buyAmount) + Number(this.feeBuy))).toFixed(10)).noExponents();
        },
        calcSellFee() {
            this.feeSell = Number(parseFloat((this.sellAmount) * 1 / 100).toFixed(10)).noExponents();
            this.totalSell = Number(parseFloat(((this.sellAmount * 1) + Number(this.feeSell * 1))).toFixed(10)).noExponents();
            this.txtSellTotalPrice = Number(parseFloat((this.selectedSellPrice * this.sellAmount)).toFixed(10)).noExponents();
            // this.feeSell = Number(parseFloat((this.selectedSellPrice * this.sellAmount) * 1 / 100).toFixed(10)).noExponents();
            // this.totalSell = Number(parseFloat(((this.selectedSellPrice * this.sellAmount) + Number(this.feeSell))).toFixed(10)).noExponents();
        },
        changeSymbol() {
            location.href = '/trade/' + this.baseAsset + '/' + this.tradeAsset;
        },
        processBUY() {
            if (this.totalBuy <= 0) {
                swal("Error!", "Amount must be greater then zero!", "error");
            } else {
                if (parseFloat(this.totalBuy) <= parseFloat(this.tradeBalance)) {
                    var self = this;
                    const symbol = this.baseAsset + "" + this.tradeAsset;
                    var postData = { _csrf: this.csrf, orderType: 'BUY', baseAsset: this.baseAsset, tradeAsset: this.tradeAsset, amount: this.buyAmount, price: this.selectedBuyPrice, symbol: symbol }
                    $.ajax({
                        url: '/placeorder',
                        method: 'POST',
                        data: postData,
                        async: false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                        },
                        success: function (data) {
                            console.log(data)
                            if (data.status == 'OK') {
                                $("#baseBalance2").html(data.newBalances.baseAsset);
                                $("#baseBalance1").html(data.newBalances.baseAsset);
                                $("#tradeBalance2").html(data.newBalances.tradeAsset);
                                $("#tradeBalance1").html(data.newBalances.tradeAsset);
                                this.baseBalance = data.newBalances.baseAsset;
                                this.tradeBalance = data.newBalances.tradeAsset;
                                swal("Success!", "Order Placed!", "success");
                            } else {
                                swal("Error!", data.message, "error");
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });

                } else {
                    swal("Error!", "Insufficient Funds!", "error");
                }
            }

        },
        processSELL() {
            if (this.totalSell <= 0) {
                swal("Error!", "Amount must be greater then zero!", "error");
            } else {
                if (parseFloat(this.totalSell) <= parseFloat(this.baseBalance)) {
                    var self = this;
                    const symbol = this.baseAsset + "" + this.tradeAsset;
                    var postData = { _csrf: this.csrf, orderType: 'SELL', baseAsset: this.baseAsset, tradeAsset: this.tradeAsset, amount: this.sellAmount, price: this.selectedSellPrice, symbol: symbol }
                    $.ajax({
                        url: '/placeorder',
                        method: 'POST',
                        data: postData,
                        async: false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                        },
                        success: function (data) {
                            console.log(data)
                            if (data.status == 'OK') {
                                $("#baseBalance2").html(data.newBalances.baseAsset);
                                $("#baseBalance1").html(data.newBalances.baseAsset);
                                $("#tradeBalance2").html(data.newBalances.tradeAsset);
                                $("#tradeBalance1").html(data.newBalances.tradeAsset);
                                this.baseBalance = data.newBalances.baseAsset;
                                this.tradeBalance = data.newBalances.tradeAsset;
                                swal("Success!", "Order Placed!", "success");
                            } else {
                                swal("Error!", data.message, "error");
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });

                } else {
                    swal("Error!", "Insufficient Funds!", "error");
                }
            }
        },
        setSellOrder(order) {
            this.buyAmount = order.amount;
            this.selectedBuyPrice = order.price;
            this.calcBuyFee();
            $('.nav-tabs a[href="#buy"]').tab('show')
        },
        setBuyOrder(order) {
            this.sellAmount = order.amount;
            this.selectedSellPrice = order.price;
            this.calcSellFee();
            $('.nav-tabs a[href="#sell"]').tab('show')
        },
        cancelOrder(id) {
            var self = this;
            const symbol = this.baseAsset + "" + this.tradeAsset;
            var postData = { _csrf: this.csrf, orderID: id, symbol: symbol }
            $.ajax({
                url: '/cancelorder',
                method: 'POST',
                data: postData,
                async: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    console.log(data)
                    if (data.status == 'OK') {
                        $("#baseBalance2").html(data.newBalances.baseAsset);
                        $("#baseBalance1").html(data.newBalances.baseAsset);
                        $("#tradeBalance2").html(data.newBalances.tradeAsset);
                        $("#tradeBalance1").html(data.newBalances.tradeAsset);
                        this.baseBalance = data.newBalances.baseAsset;
                        this.tradeBalance = data.newBalances.tradeAsset;
                        swal("Canceled!", "Order Canceled!", "info");
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        subscribeToTradeNotifications() {
            // console.log('Socket ID : '+SocketID)
            const symbol = this.baseAsset + "" + this.tradeAsset;
            this.tnotifications = this.tnws.subscribe('trade:' + symbol)

            this.tnotifications.on('error', (error) => {
                console.log('Error in Not : ')
                console.log(error)
            })

            this.tnotifications.on('message', (message) => {
                console.log(message)

                const nData = JSON.parse(message);
                if (nData.notification_type == 'order') {
                    if (nData.status == 'Pending') {
                        if (nData.ordertype == 'BUY') {
                            this.buyOrders.unshift(nData)
                        }
                        if (nData.ordertype == 'SELL') {
                            this.sellOrders.unshift(nData)
                        }
                        console.log(this.uid)

                        if (this.uid == nData.uid) {
                            if (nData.ordertype == 'BUY') {
                                this.OwnbuyOrders.unshift(nData)
                            }
                            if (nData.ordertype == 'SELL') {
                                this.OwnsellOrders.unshift(nData)
                            }
                        }
                    } else {
                        if (nData.ordertype == 'BUY') {
                            const myArray = this.buyOrders.filter(function (obj) {
                                return obj.orderid !== nData.orderid;
                            });
                            this.buyOrders = myArray;
                        }
                        if (nData.ordertype == 'SELL') {
                            const myArray = this.sellOrders.filter(function (obj) {
                                return obj.orderid !== nData.orderid;
                            });
                            this.sellOrders = myArray;
                        }
                        if (this.uid == nData.uid) {
                            if (nData.ordertype == 'BUY') {
                                const myArray = this.OwnbuyOrders.filter(function (obj) {
                                    return obj.orderid !== nData.orderid;
                                });
                                this.OwnbuyOrders = myArray;
                            }
                            if (nData.ordertype == 'SELL') {
                                const myArray = this.OwnsellOrders.filter(function (obj) {
                                    return obj.orderid !== nData.orderid;
                                });
                                this.OwnsellOrders = myArray;
                                console.log(this.OwnsellOrders)
                            }
                        }
                    }
                } else if (nData.notification_type == 'price') {
                    this.assetPrice = nData.price;
                }


            })
        }

    },
    mounted: function () {
        // this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        // this.synchronizeWallet();
        this.fetchPrice();
        this.fetchOrders();
        // setInterval(this.fetchPrice, 15000);
        this.tnws = adonis.Ws().withJwtToken(JWToken).connect()
        this.tnws.on('open', () => {
            this.subscribeToTradeNotifications()
        })

        this.tnws.on('error', (error) => {
            console.log('Error in WS : ' + error)
        })
        // })
    },
});



/*
let tnws = null
tnws = adonis.Ws().withJwtToken($('input[name=jwt]').val()).connect()
// nws = adonis.Ws().connect()

tnws.on('open', () => {
    console.log('WS Connected')
    subscribeToTradeNotifications()
})

tnws.on('error', (error) => {
    console.log('Error in WS : ' + error)
})

let baseAsset = $('#baseAsset').val();
let tradeAsset = $('#tradeAsset').val();
const symbol = baseAsset+''+tradeAsset;

function subscribeToTradeNotifications() {
    // console.log('Socket ID : '+SocketID)
    const tnotifications = tnws.subscribe('trade:' + symbol)

    tnotifications.on('error', (error) => {
        console.log('Error in Not : ')
        console.log(error)
    })

    tnotifications.on('message', (message) => {
        console.log(message)
    })
}
*/