var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        type: $('input[name=type]').val(),
        transLoading: false,
        transID:'',
        network: '',
        Amount: '',
        WalletAddress: '',
        accountno: '',
        accountname: '',
        bankname: '',
        swiftcode: '',
        show_currency: false,
        show_crypto: false,
        TransStatus: '',
        client_notes: '',
        admin_notes: '',
        txid:'',
        isTxReadOnly:true,
        UserId:'',
    },
    methods: {
        UpdateTrans() {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                UserId: this.UserId,
                status: this.TransStatus,
                txid: this.txid,
                client_notes: this.client_notes,
                admin_notes: this.admin_notes,
                transID:this.transID
            }
            $.ajax({
                url: '/admin/updatetransaction',
                method: 'POST',
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    if (data.status == 'OK') {
                        swal("Success!", "Transaction Updated!", "success");
                        if(self.type==1 && self.TransStatus!='Pending'){
                            var row = document.getElementById('r_' + self.transID);
                            row.parentNode.removeChild(row);    
                        }else{
                            if(self.type==2 && self.TransStatus=='Pending'){
                                var row = document.getElementById('r_' + self.transID);
                                row.parentNode.removeChild(row);    
                            } 
                        }
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        ShowTransaction(TransID) {
            // alert(TransID)
            this.transID = '';
            this.transLoading = true;
            var self = this;
            var transLoading = true;
            var postData = {
                _csrf: this.csrf,
                TransID: TransID,
            }
            $.ajax({
                url: '/admin/fetchtransaction',
                method: 'POST',
                async: false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    transLoading = false;
                    if (data.status == 'OK') {
                        console.log(data.transaction)
                        self.transID = data.transaction.id
                        self.UserId = data.transaction.user_id
                        self.network = data.transaction.network
                        self.Amount = data.transaction.amount
                        self.WalletAddress = data.transaction.withdrawal_address
                        self.accountno = data.transaction.accountno
                        self.accountname = data.transaction.accountname
                        self.bankname = data.transaction.bankname
                        self.swiftcode = data.transaction.swiftcode
                        self.TransStatus = data.transaction.status
                        self.client_notes = data.transaction.client_notes
                        self.admin_notes = data.transaction.admin_notes
                        self.txid = data.transaction.txid
                        
                        if (!data.transaction.txid || data.transaction.txid == '' || data.transaction.txid == null) {
                            self.isTxReadOnly = false
                        }else{
                            self.isTxReadOnly = true
                        }
                        if (!data.transaction.withdrawal_address || data.transaction.withdrawal_address == '' || data.transaction.withdrawal_address == null) {
                            self.show_currency = true
                            self.show_crypto = false
                        }else{
                            self.show_currency = false
                            self.show_crypto = true
                        }
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                    transLoading = false;
                }
            });
            this.transLoading = transLoading;

        }
    }
})
