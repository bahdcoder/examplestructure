var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        application_name: $('input[name=application_name]').val(),
        WebsiteTitle: $('input[name=WebsiteTitle]').val(),
        MetaDescription: $('input[name=MetaDescription]').val(),
        email: $('input[name=email]').val(),
        country: $('input[name=country]').val(),
        timezone: $('input[name=timezone]').val(),
        buy_commission: $('input[name=buy_commission]').val(),
        sell_commission: $('input[name=sell_commission]').val(),
        cc_commission: $('input[name=cc_commission]').val(),
        enableRegistrations: $('input[name=enableRegistrations]').val(),
        forceKYC: $('input[name=forceKYC]').val(),
    },
    methods: {
        updateSettings() {
            if (this.application_name == '') {
                swal("Error!", "Application Name is required", "error");
            }else if (this.WebsiteTitle == '') {
                swal("Error!", "Website Title is required", "error");
            }else if (this.MetaDescription == '') {
                swal("Error!", "Meta Description is required", "error");
            }else if (this.email == '') {
                swal("Error!", "Email is required", "error");
            } else if (this.buy_commission == '' || this.buy_commission<0) {
                swal("Error!", "Invalid Buy Commission", "error");
            } else if (this.sell_commission == '' || this.sell_commission<0) {
                swal("Error!", "Invalid Sell Commission", "error");
            } else if (this.cc_commission == '' || this.cc_commission<0) {
                swal("Error!", "Invalid Credit Card Commission", "error");
            } else if (this.country == '') {
                swal("Error!", "Country is required", "error");
            } else if (this.timezone == '') {
                swal("Error!", "Time Zone is required", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    application_name: this.application_name,
                    WebsiteTitle: this.WebsiteTitle,
                    MetaDescription: this.MetaDescription,
                    email: this.email,
                    country: this.country,
                    timezone: this.timezone,
                    buy_commission: this.buy_commission,
                    sell_commission: this.sell_commission,
                    cc_commission: this.cc_commission,
                    enableRegistrations: this.enableRegistrations,
                    forceKYC: this.forceKYC,
                }
                $.ajax({
                    url: '/admin/updateapplicationsettings',
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
        
    }
});


