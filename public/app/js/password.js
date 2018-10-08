var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        oldpassword: '',
        newpassword: '',
        newpassword1: '',
    },
    methods: {
        updateProfile() {
            if (this.oldpassword == '' || this.newpassword == '' || this.newpassword1 == '') {
                swal("Error!", "Invalid Password", "error");
            } else if (this.newpassword != this.newpassword1) {
                swal("Error!", "New Password and Confirm Password Mismatched", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    oldpassword: this.oldpassword,
                    newpassword: this.newpassword,
                }
                $.ajax({
                    url: '/updatepassword',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        if(data.status=='OK'){
                            swal("Success!", data.msg, "success");
                            
                        }else{
                            swal("Error!", data.msg, "error");
                        }   
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },

    },
    mounted: function () {
        
    }
});


