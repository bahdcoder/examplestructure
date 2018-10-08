var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        wallet: '',
        walletType: '',
        walletName: '',
        Amount: '',
        WalletAddress: '',
        accountno: '',
        accountname: '',
        bankname: '',
        swiftcode: '',
        show_currency: false,
        show_crypto: false
    },
    methods: {
        setWallet() {
            if (this.wallet == '') {
                this.walletName = '';
                this.walletType = '';
                this.show_currency = false;
                this.show_crypto = false;
            } else {
                var v = this.wallet;
                v = v.replace(/^\[\'|\'\]$/g, '').split(",");
                this.walletName = v[0];
                this.walletType = v[1];
                // alert(typeof(this.walletType))
                if (this.walletType.toString().trim().toUpperCase() == 'CURRENCY') {
                    this.show_currency = true;
                    this.show_crypto = false;
                } else {
                    this.show_currency = false;
                    this.show_crypto = true;
                }
            }

        },
        submitRequest() {
            if (this.walletType.toString().trim() == '') {
                swal("Error!", "Select Wallet", "error");
            } else if (this.Amount.toString().trim() == '' || this.Amount <= 0) {
                swal("Error!", "Invalid Amount", "error");
            } else {
                if (this.walletType.toString().trim().toUpperCase() == 'CURRENCY'
                    && this.accountno == ''
                    && this.accountname == ''
                    && this.bankname == ''
                    && this.swiftcode == ''
                ) {
                    swal("Error!", "Incomplete Details", "error");
                } else if (this.walletType.toString().trim().toUpperCase() == 'CRYPTO' && this.WalletAddress == '') {
                    swal("Error!", "Invalid Address", "error");
                } else {
                    var self = this;
                    var postData = {
                        _csrf: this.csrf,
                        wallet: this.wallet,
                        walletType: this.walletType,
                        walletName: this.walletName,
                        Amount: this.Amount,
                        WalletAddress: this.WalletAddress,
                        accountno: this.accountno,
                        accountname: this.accountname,
                        bankname: this.bankname,
                        swiftcode: this.swiftcode,
                    }
                    $.ajax({
                        url: '/withdrawfunds',
                        method: 'POST',
                        async: false,
                        data: postData,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                        },
                        success: function (data) {
                            if (data.status == 'OK') {
                                swal("Success!", data.msg, "success");
                            } else {
                                swal("Error!", data.msg, "error");
                            }
                        },
                        error: function (error) {
                            swal("Error!", error.msg, "error");
                        }
                    });
                }

            }
        },


    },
    // mounted: function () {

    // }
});


