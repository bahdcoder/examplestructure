var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        ticketid: $('input[name=ticketid]').val(),
        message: $('input[name=message]').val(),
        
    },
    methods: {
        closeTicket() {
            if (this.message == '') {
                swal("Error!", "Empty Message", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    ticketid: this.ticketid,
                }
                $.ajax({
                    url: '/closeticket',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        if(data.status=='OK'){
                            // swal("Success!", data.message, "success");
                            location.href = '/support';
                        }else{
                            swal("Error!", data.message, "error");
                        }   
                    },
                    error: function (error) {
                        swal("Error!", error.message, "error");
                    }
                });
            }
        },
        updateTicket() {
            if (this.message == '') {
                swal("Error!", "Empty Message", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    ticketid: this.ticketid,
                    message: this.message,
                }
                $.ajax({
                    url: '/updateticket',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        if(data.status=='OK'){
                            location.reload();
                        }else{
                            swal("Error!", data.message, "error");
                        }   
                    },
                    error: function (error) {
                        swal("Error!", error.message, "error");
                    }
                });
            }
        },

    },
    mounted: function () {
        
    }
});


