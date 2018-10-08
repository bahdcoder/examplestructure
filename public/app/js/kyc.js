var app = new Vue({
    el: '#adongular-app',
    data: {
        kycInfo: {
            _csrf: $('input[name=_csrf]').val(),
            jwt: $('input[name=jwt]').val(),
            KycPic: null,
            KycPassport1: null,
            KycPassport2: null,
            KycGovtID: null,
            KycAddressProof: null,
            KycDoc1: null,
        },
        is_submitting: false,
        alert_msg: '',
        show_alert: false,
        alert_class: '',

    },
    methods: {
        onSubmitKYC: function () {
            // alert(this.kycInfo._csrf)
            this.is_submitting = true;
            this.show_alert = true;
            this.alert_class = 'alert-info';
            this.alert_msg = 'Processing Please wait...';
            var formData = new FormData();
            formData.append('_csrf', this.kycInfo._csrf);
            formData.append('jwt', this.kycInfo.jwt);
            if (!this.kycInfo.KycPic) {
                this.alert_class = 'alert-danger';
                this.alert_msg = 'Your Picture is Mandatory';
            } else {
                formData.append('KycPic', this.kycInfo.KycPic, this.kycInfo.KycPic.name);                
            }
            if (this.kycInfo.KycPassport1) {
                formData.append('KycPassport1', this.kycInfo.KycPassport1, this.kycInfo.KycPassport1.name);
                if (this.kycInfo.KycPassport2) {
                    formData.append('KycPassport2', this.kycInfo.KycPassport2, this.kycInfo.KycPassport2.name);
                } else {
                    this.alert_class = 'alert-danger';
                    this.alert_msg = 'Passport Front and Data page is Mandatory';
                }
            }
            if (this.kycInfo.KycGovtID) {
                formData.append('KycGovtID', this.kycInfo.KycGovtID, this.kycInfo.KycGovtID.name);
                if (this.kycInfo.KycAddressProof) {
                    formData.append('KycAddressProof', this.kycInfo.KycAddressProof, this.kycInfo.KycAddressProof.name);
                } else {
                    this.alert_class = 'alert-danger';
                    this.alert_msg = 'At least two proof is Mandatory';
                }
            }
            if (!this.kycInfo.KycPassport1 && !this.kycInfo.KycGovtID) {
                this.alert_class = 'alert-danger';
                this.alert_msg = 'Passport or Govt. Issued Id is Mandatory';
            }
            if (this.kycInfo.KycDoc1) {
                formData.append('KycDoc1', this.kycInfo.KycDoc1, this.kycInfo.KycDoc1.name);
            }
            if (this.alert_class != 'alert-danger') {
                jwt = this.kycInfo.jwt;
                var ajaxResponse;
                var jqXHR = $.ajax({
                    url: '/submitkyc',
                    data: formData,
                    processData: false,
                    contentType: false,
                    async: false,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer " + jwt);
                        xhr.setRequestHeader ("enctype", "multipart/form-data");
                        
                    },
                    success: function (data) {
                        ajaxResponse = data;
                    },
                    error: function (data) {
                        ajaxResponse = data;
                    }
                });
                if(ajaxResponse.status=='success'){
                    this.alert_class = 'alert-success';
                    this.alert_msg = 'KYC Submitted Successfully';
                    location.reload();
                }else{
                    this.alert_class = 'alert-danger';
                    this.alert_msg = ajaxResponse.message;
                }
            }

        },
        onKycPicChanged(files) {
            this.kycInfo.KycPic = files[0]
        },
        onKycPassport1Changed(files) {
            this.kycInfo.KycPassport1 = files[0]
        },
        onKycPassport2Changed(files) {
            this.kycInfo.KycPassport2 = files[0]
        },
        onKycKycGovtIDChanged(files) {
            this.kycInfo.KycGovtID = files[0]
        },
        onKycAddressProofChanged(files) {
            this.kycInfo.KycAddressProof = files[0]
        },
        onKycDoc1Changed(files) {
            this.kycInfo.KycDoc1 = files[0]
        },


    }
})