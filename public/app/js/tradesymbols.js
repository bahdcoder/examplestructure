var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        id: $('input[name=id]').val(),
        symbol: $('input[name=symbol]').val(),
        decimals: $('input[name=decimals]').val(),
        type: $('input[name=type]').val(),
        min_transfer: $('input[name=min_transfer]').val(),
        default_wallet: $('input[name=default_wallet]').val(),
        contract_address: $('input[name=contract_address]').val(),
        contract_abi: $('textarea[name=contract_abi]').val(),
        trade_system: $('input[name=trade_system]').val(),
        enabled: $('input[name=enabled]').val(),
        show_contract:true
    },
    methods: {
        updateOptions(){
            if(this.type=='ERC20'){
                this.show_contract = true;
            }else{
                this.show_contract = false;
            }
        },
        deleteSymbol(){
            let ans = confirm('Delete Symbol ?');
            if(ans){
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    id: this.id,
                }
                $.ajax({
                    url: '/admin/deletetradesymbol',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        swal("Deleted!", "Symbol Deleted", "info");
                        location.href = '/admin/tradesymbol/list';
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");

                        // console.log(error);
                    }
                });
                
            }
        },
        createSymbol() {
            if (this.symbol == '') {
                swal("Error!", "Symbol Name is required", "error");
            }else if (this.decimals == '') {
                swal("Error!", "Decimals is required", "error");
            }else if (this.type == '') {
                swal("Error!", "Type is required", "error");
            } else if (this.min_transfer == '' || this.min_transfer<0) {
                swal("Error!", "Invalid Min Transfer", "error");
            }  else if (this.type == 'ERC20' && this.default_wallet == '') {
                swal("Error!", "Default wallet is required", "error");
            } else if (this.type == 'ERC20' && this.contract_address == '') {
                swal("Error!", "Contract Address is required", "error");
            }else if (this.type == 'ERC20' && this.contract_abi == '') {
                swal("Error!", "Contract ABI is required", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    symbol: this.symbol,
                    decimals: this.decimals,
                    type: this.type,
                    min_transfer: this.min_transfer,
                    default_wallet: this.default_wallet,
                    contract_address: this.contract_address,
                    contract_abi: this.contract_abi,
                    trade_system: this.trade_system,
                    enabled: this.enabled,
                }
                $.ajax({
                    url: '/admin/createtradesymbol',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        console.log(data)
                        swal("Success!", data.msg, "success");
                        location.href = '/admin/tradesymbol/edit/'+data.id;
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");

                        // console.log(error);
                    }
                });
            }
        },
        updateSymbol() {
            if (this.symbol == '') {
                swal("Error!", "Symbol Name is required", "error");
            }else if (this.decimals == '') {
                swal("Error!", "Decimals is required", "error");
            }else if (this.type == '') {
                swal("Error!", "Type is required", "error");
            } else if (this.min_transfer == '' || this.min_transfer<0) {
                swal("Error!", "Invalid Min Transfer", "error");
            }  else if (this.type == 'ERC20' && this.default_wallet == '') {
                swal("Error!", "Default wallet is required", "error");
            } else if (this.type == 'ERC20' && this.contract_address == '') {
                swal("Error!", "Contract Address is required", "error");
            }else if (this.type == 'ERC20' && this.contract_abi == '') {
                swal("Error!", "Contract ABI is required", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    id: this.id,
                    symbol: this.symbol,
                    decimals: this.decimals,
                    type: this.type,
                    min_transfer: this.min_transfer,
                    default_wallet: this.default_wallet,
                    contract_address: this.contract_address,
                    contract_abi: this.contract_abi,
                    trade_system: this.trade_system,
                    enabled: this.enabled,
                }
                $.ajax({
                    url: '/admin/updatetradesymbol',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");

                        // console.log(error);
                    }
                });
            }
        },

    },
    mounted: function () {
        this.updateOptions()
    }
});


