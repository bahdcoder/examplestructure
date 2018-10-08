var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        timezone: $('input[name=timezone]').val(),
        fullname: '',
        email: '',
        country: '',
        userlist: [],
        requestedPage: 1,
        currentPage: 1,
        lastPage: 0,
        perPage: 20,
        total: 0,
        Prev: '',
        Next: '',
        listDisplay: false
    },
    methods: {
        updateSettings() {
            var self = this;
            let listData = false;
            var postData = {
                _csrf: this.csrf,
                fullname: this.fullname,
                email: this.email,
                country: this.country,

            }
            $.ajax({
                url: '/admin/usersearch/' + self.requestedPage,
                method: 'POST',
                async: false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    if (data.status == 'OK') {
                        listData = data.listData
                    } else {
                        swal("Error!", data.msg, "error");
                    }
                },
                error: function (error) {
                    swal("Error!", error.msg, "error");

                    // console.log(error);
                }
            });

            if (listData) {
                this.userlist = listData.data;
                this.currentPage = listData.page;
                this.lastPage = listData.lastPage;
                this.perPage = listData.perPage;
                this.total = listData.total;
                this.Prev = listData.Prev;
                this.Next = listData.Next;
                this.listDisplay = true;
            }
        },
        RequestPage(Page) {
            this.requestedPage = Page;
            var self = this;
            let listData = false;
            var postData = {
                _csrf: this.csrf,
                fullname: this.fullname,
                email: this.email,
                country: this.country,
            }
            $.ajax({
                url: '/admin/usersearch/' + self.requestedPage,
                method: 'POST',
                async: false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    if (data.status == 'OK') {
                        listData = data.listData
                    } else {
                        swal("Error!", data.msg, "error");
                    }
                },
                error: function (error) {
                    swal("Error!", error.msg, "error");

                    // console.log(error);
                }
            });

            if (listData) {
                this.userlist = listData.data;
                this.currentPage = listData.page;
                this.lastPage = listData.lastPage;
                this.perPage = listData.perPage;
                this.total = listData.total;
                this.Prev = listData.Prev;
                this.Next = listData.Next;
                this.listDisplay = true;
            }
        },
        ShowUser(uid) {
            window.open('/admin/userdata/' + uid, '_blank', '');
        },
        BackToSearch() {
            this.listDisplay = false;
        },
        doMath: function (index) {
            return index + 1
        },
        format_date: function (date, timezone) {
            return moment(date).tz(timezone).format('YYYY-MM-DD hh:mm:ss A')
        }
    },
    mounted: function () {

    }
});


