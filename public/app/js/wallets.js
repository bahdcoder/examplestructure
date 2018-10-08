var app = new Vue({
    el: '#adongular-app',
    data: {
        jwt: $('input[name=jwt]').val(),
        wallet_info: {
            _csrf: $('input[name=_csrf]').val(),
            symbol: $('input[name=symbol]').val(),
            address: $('input[name=address]').val(),
        },
        wallet_is_submitting: false,
        wallet_alert_msg: '',
        wallet_show_alert: false,
        wallet_alert_class: '',
        Transactions: []
    },
    methods: {
        synchronizeWallet: function () {
            // alert(this.wallet_info.symbol)
            this.wallet_is_submitting = true;
            this.wallet_show_alert = true;
            this.wallet_alert_class = 'alert-info';
            this.wallet_alert_msg = 'Wallet Synchronizing Please wait...';
            location.reload();
            // $.post('/syncwallet', this.wallet_info).then((response) => {
            //     console.log(response)
            //     this.wallet_alert_class = 'alert-success';
            //     this.wallet_alert_msg = 'Wallet Synchronized Successfully';
            //     this.wallet_show_alert = false;
            //     location.reload();
            //     // this.fetchTransactions();
            // });
        },
        

    },
    mounted: function () {
        // var self = this;
        // self.wallet_is_submitting = true;
        // self.wallet_show_alert = true;
        // self.wallet_alert_class = 'alert-info';
        // self.wallet_alert_msg = 'Wallet Synchronizing Please wait...';

        // $.ajax({
        //     url: '/fetchtransactions',
        //     method: 'GET',
        //     data: self.wallet_info,
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
        //         xhr.setRequestHeader("enctype", "multipart/form-data");
        //     },
        //     success: function (data) {
        //         console.log(data)
        //         self.Transactions = data.Transactions;
        //         console.log(self.Transactions)
        //         self.wallet_alert_class = 'alert-success';
        //         self.wallet_alert_msg = 'Wallet Synchronized Successfully';
        //         self.wallet_show_alert = false;
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });
    },
})