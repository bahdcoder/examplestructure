var app = new Vue({
    el: '#adongular-app',
    data: {
        user_login: {
            _csrf: $('input[name=_csrf]').val(),
            username: '',
            password: ''
        },
        login_is_submitting: false,
        login_show_alert: false,
        login_alert_class: '',
        login_alert_msg: '',
        user_forgot: {
            _csrf: $('input[name=_csrf]').val(),
            username: '',
        },
        forgot_is_submitting: false,
        forgot_show_alert: false,
        forgot_alert_class: '',
        forgot_alert_msg: '',
        user_reg: {
            _csrf: $('input[name=_csrf]').val(),
            fullname: '',
            email: '',
            password: '',
            re_password: '',
            referral_code: ''
        },
        reg_is_submitting: false,
        reg_show_alert: false,
        reg_alert_class: '',
        reg_alert_msg: '',

        user_tok: {
            _csrf: $('input[name=_csrf]').val(),
            fullname:'',
            companyname:'',
            email:'',
            contactnumber:'',
            tokenname:'',
            tokenwebsite:'',
            contractaddress:''
        },
        tok_is_submitting: false,
        tok_show_alert: false,
        tok_alert_class: '',
        tok_alert_msg: '',
    },
    methods: {
        login: function () {
            this.login_is_submitting = true;
            this.login_show_alert = true;
            this.login_alert_class = 'alert-info';
            this.login_alert_msg = 'Please wait!';

            $.post('/login', this.user_login).then((response) => {
                console.log(response)
                if (response.status === 2) {
                    this.login_alert_class = 'alert-success';
                    this.login_alert_msg = 'Login Successful! You are now being redirected!';
                    location.href = '/dashboard';
                }else if (response.status === 3) {
                    this.login_alert_class = 'alert-success';
                    this.login_alert_msg = 'Login Successful! You are now being redirected!';
                    location.href = '/dashboard';
                }else if (response.status === 404) {
                    this.login_is_submitting = false;
                    this.login_alert_class = 'alert-danger';
                    this.login_alert_msg = 'Account Disabled, Please contact administrator!';
                } else {
                    this.login_is_submitting = false;
                    this.login_alert_class = 'alert-danger';
                    this.login_alert_msg = 'Invalid Email / Password!';
                }
            });
        },
        forgot: function () {
            this.forgot_is_submitting = true;
            this.forgot_show_alert = true;
            this.forgot_alert_class = 'alert-info';
            this.forgot_alert_msg = 'Please wait!';

            $.post('/forgotpassword', this.user_forgot).then((response) => {
                console.log(response)
                if (response.status === 2) {
                    this.forgot_alert_class = 'alert-success';
                    this.forgot_alert_msg = 'Password Reset link sent on your email !';
                }else if (response.status === 404) {
                    this.forgot_is_submitting = false;
                    this.forgot_alert_class = 'alert-danger';
                    this.forgot_alert_msg = 'Invalid Email !';
                } else {
                    this.forgot_is_submitting = false;
                    this.forgot_alert_class = 'alert-danger';
                    this.forgot_alert_msg = 'Invalid Email !';
                }
            });
        },
        register: function () {
            this.reg_is_submitting = true;
            this.reg_show_alert = true;
            this.reg_alert_class = 'alert-info';
            this.reg_alert_msg = 'Please wait!';

            $.post('/register', this.user_reg).then((response) => {
                console.log(response)
                if (response.status === 2) {
                    this.reg_alert_class = 'alert-success';
                    this.reg_alert_msg = 'Registration Successful! You are now being redirected!';
                    location.href = '/dashboard';
                } else {
                    this.reg_is_submitting = false;
                    this.reg_alert_class = 'alert-danger';
                    this.reg_alert_msg = response.messages;
                }
            });
        },
        submitToken: function () {
            this.tok_is_submitting = true;
            this.tok_show_alert = true;
            this.tok_alert_class = 'alert-info';
            this.tok_alert_msg = 'Please wait!';

            $.post('/submittoken', this.user_tok).then((response) => {
                console.log(response)
                if (response.status === 2) {
                    this.tok_alert_class = 'alert-success';
                    this.tok_alert_msg = 'Submisstion Successful! Our Representatives will contact you soon!';
                    this.user_tok = {
                        _csrf: $('input[name=_csrf]').val(),
                        fullname:'',
                        companyname:'',
                        email:'',
                        contactnumber:'',
                        tokenname:'',
                        tokenwebsite:'',
                        contractaddress:''
                    }
                    this.tok_is_submitting = false;
                } else {
                    this.tok_is_submitting = false;
                    this.tok_alert_class = 'alert-danger';
                    this.tok_alert_msg = response.messages;
                }
            });
        }
    }
})