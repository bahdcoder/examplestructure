var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
        fullname: $('input[name=fullname]').val(),
        dob: $('input[name=dob]').val(),
        gender: $('input[name=gender]').val(),
        mobile: $('input[name=mobile]').val(),
        country: $('input[name=country]').val(),
        state: $('input[name=state]').val(),
        address: $('#address').val(),
        city: $('input[name=city]').val(),
        zipcode: $('input[name=zipcode]').val(),
        timezone: $('input[name=timezone]').val()
    },
    methods: {
        updateProfile() {
            if (this.country == '' || this.state == '' || this.city == '' || this.zipcode == '' || this.address == '') {
                swal("Error!", "Complete Address is required", "error");
            } else if (this.dob == '') {
                swal("Error!", "Date of birth is required", "error");
            } else if (this.gender == '') {
                swal("Error!", "Gender is required", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    fullname: this.fullname,
                    dob: this.dob,
                    gender: this.gender,
                    mobile: this.mobile,
                    country: this.country,
                    state: this.state,
                    city: this.city,
                    zipcode: this.zipcode,
                    address: this.address,
                    timezone: this.timezone,
                }
                $.ajax({
                    url: '/updateprofile',
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
        getStates() {
            $('#selState')
                .find('option')
                .remove()
                .end();
            $("<option value=''>Select State</option>").appendTo('#selState');
            this.state = ''
            if (this.country != '') {
                var self = this;
                $.ajax({
                    url: '/api/getstates/' + self.country,
                    async: false,
                    method: 'POST',
                    data: { _csrf: self.csrf },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        $.each(data, function (i, obj) {
                            var div_data = "<option value=" + obj.id + ">" + obj.name + "</option>";
                            $(div_data).appendTo('#selState');
                        });
                        $('#selState').val(self.state)

                    },
                    error: function (error) {
                        // console.log(error);
                    }
                });
            }

        },
        getCities() {
            $('#selCity')
                .find('option')
                .remove()
                .end();
            $("<option value=''>Select City</option>").appendTo('#selCity');
            this.city = '';
            if (this.state != '') {
                var self = this;
                $.ajax({
                    url: '/api/getcities/' + self.state,
                    method: 'POST',
                    async: false,
                    data: { _csrf: self.csrf },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        $.each(data, function (i, obj) {
                            var div_data = "<option value=" + obj.id + ">" + obj.name + "</option>";
                            $(div_data).appendTo('#selCity');
                        });
                        $('#selCity').val(self.city)
                    },
                    error: function (error) {
                        // console.log(error);
                    }
                });
            }


        }


    },
    mounted: function () {
        this.getStates();
        this.state = $('input[name=state]').val()
        this.getCities();
        this.city = $('input[name=city]').val()
        $("#dob").datepicker(
            {
                format: 'yyyy-mm-dd',
                endDate: '-18y',
                autoclose: true,
            }
        ).on(
            "changeDate", () => { this.dob = $('#dob').val() }
        );
    }
});


