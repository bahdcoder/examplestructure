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
var FullName = $('input[name=fullname]').val();
var res = FullName.split(" ");
if (res[0]) {
    var firstname = res[0]
} else {
    var firstname = ''
}
if (res[1]) {
    var lastname = res[1]
} else {
    var lastname = ''
}
var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        depositAmount: '',
        cardNumber: '',
        firstName: firstname,
        lastName: lastname,
        cardExpiry: '',
        cardCVV: '',
        cardFEE: $('input[name=ccf]').val(),
        totalDeposit: '',
        totalFee: '',
        streetaddress: '',
        city: '',
        zipcode: '',
    },
    methods: {
        calcFee() {
            this.totalFee = Number(parseFloat((this.depositAmount * 1) * (this.cardFEE * 1) / 100).toFixed(4)).noExponents();
            this.totalDeposit = Number(parseFloat(((this.depositAmount * 1) + Number(this.totalFee))).toFixed(4)).noExponents();
        },
        processCard() {
            if (this.totalDeposit <= 15) {
                swal("Error!", "Minimum Deposit Amount is $15 USD", "error");
            } else {
                var self = this;
                const symbol = this.baseAsset + "" + this.tradeAsset;
                var postData = {
                    _csrf: this.csrf,
                    depositAmount: this.depositAmount,
                    cardNumber: this.cardNumber,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    lastName: this.lastName,
                    streetaddress: this.streetaddress,
                    city: this.city,
                    zipcode: this.zipcode,
                    cardExpiry: this.cardExpiry,
                    cardCVV: this.cardCVV,
                    totalFee: this.totalFee,
                    totalDeposit: this.totalDeposit,
                }
                $.ajax({
                    url: '/depositusd',
                    method: 'POST',
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        console.log(data)
                        if (data.status == 'OK') {
                            swal("Success!", "Order Placed!", "success");
                        } if (data.status == 'redirect') {
                            // $('body').prepend(data.message)
                            location.href = '/processingusd/'+data.orderID;
                        } else {
                            swal("Error!", data.message, "error");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });


            }

        },


    },

});


