var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        code: '',
    },
    methods: {
        processVerification() {
            if (this.code == '') {
                swal("Error!", "Invalid Code", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    code: this.code,
                }
                $.ajax({
                    url: '/validatetwofactor',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        if(data.status=='OK'){
                            swal("Success!", data.msg, "success");
                            location.href = '/dashboard';
                        }else{
                            swal("Error!", data.msg, "error");
                        }
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");

                        // console.log(error);
                    }
                });
            }
        }
    },
    mounted: function () {
        
    }
});


