var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        enabledtwofactor: $('input[name=twofactor]').val(),
    },
    methods: {
        updateTwofactor() {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                enabledtwofactor: this.enabledtwofactor,
            }
            $.ajax({
                url: '/security',
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

                    // console.log(error);
                }
            });

        }
    },
    mounted: function () {

    }
});


