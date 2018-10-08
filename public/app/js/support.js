var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        type: $('input[name=type]').val(),
        transLoading: false,
        TicketID:'',
        subject: '',
        message:'',
    },
    methods: {
        CreateTicket() {
            this.transLoading = true;
            var self = this;
            var postData = {
                _csrf: this.csrf,
                subject: this.subject,
                message: this.message,
            }
            $.ajax({
                url: '/createticket',
                method: 'POST',
                async:false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    console.log(data)
                    if (data.status == 'OK') {
                        this.TicketID = data.ticketid
                        location.href = '/ticket/'+data.ticketid;
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
            this.transLoading = false;
        },
        ShowCreateTicket() {
            this.transLoading = true;
            this.TicketID = '';
            this.subject = '';
            this.message = '';
            this.transLoading = false;
        }
    }
})
