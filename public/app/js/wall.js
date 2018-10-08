var app = new Vue({
    el: '#adongular-app',
    data: {
        jwt: $('input[name=jwt]').val(),
        UserID: $('input[name=UserID]').val(),
        wall_info: {
            _csrf: $('input[name=_csrf]').val(),
            lastid: 0,
            WallUserID: $('input[name=WallUserID]').val()
        },
        wall_is_submitting: false,
        wall_alert_msg: '',
        wall_show_alert: false,
        wall_alert_class: '',
        WallPosts: [],
        txtArticle: '',
        imageData: null,
        txtYoutubeLink: ''
    },
    methods: {
        onPicChanged(files) {
            this.imageData = files[0]
        },
        postPicture() {
            if (!this.imageData) {
                swal("Error!", 'Picture is Mandatory', "error");
            } else {
                var self = this;
                var formData = new FormData();
                formData.append('_csrf', this.wall_info._csrf);
                formData.append('WallUserID', this.wall_info.WallUserID);
                formData.append('jwt', this.jwt);
                formData.append('txtArticle', this.txtArticle);
                formData.append('imageData', this.imageData, this.imageData.name);
                $.ajax({
                    url: '/postpicture',
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    async: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                        xhr.setRequestHeader("enctype", "multipart/form-data");
                    },
                    success: function (data) {
                        self.loadNew()
                        swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        postVideo() {
            if (this.txtYoutubeLink == '') {
                swal("Error!", "Invalid youtube link", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    WallUserID: this.wall_info.WallUserID,
                    txtArticle: this.txtArticle,
                    txtYoutubeLink: this.txtYoutubeLink
                }
                $.ajax({
                    url: '/postvideo',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        self.loadNew()
                        swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        delete_post(id) {
            if (!id || id == '') {
                swal("Error!", "Invalid Input", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    post_id: id
                }
                $.ajax({
                    url: '/deletearticle',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        for (var ii = 0; ii < self.WallPosts.length; ii++) {
                            if (self.WallPosts[ii]['id'] == id) {
                                self.WallPosts.splice(ii, 1);
                            }
                        }
                        swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        postArticle() {
            if (this.txtArticle == '') {
                swal("Error!", "Can not post empty article", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    WallUserID: this.wall_info.WallUserID,
                    txtArticle: this.txtArticle,
                }
                $.ajax({
                    url: '/postarticle',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        self.loadNew()
                        swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        loadNew() {
            var self = this;
            self.wall_is_submitting = true;
            self.wall_show_alert = true;
            self.wall_alert_class = 'alert-info';
            self.wall_alert_msg = 'Loading Posts Please wait...';
            var postData = {
                _csrf: this.csrf,
                WallUserID: this.wall_info.WallUserID,
                lastid: 0,
            }
            $.ajax({
                url: '/fetchposts',
                method: 'POST',
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    for (var i = 0; i < data.WallPosts.data.length; i++) {
                        var exists = false;
                        for (var ii = 0; ii < self.WallPosts.length; ii++) {
                            if (self.WallPosts[ii]['id'] == data.WallPosts.data[i]['id']) {
                                exists = true
                            }
                        }
                        if (!exists) {
                            self.WallPosts.unshift(data.WallPosts.data[i]);
                        }
                    }
                    self.wall_info.lastid = data.WallPosts.page;
                    self.wall_alert_class = 'alert-success';
                    self.wall_alert_msg = 'Wall Synchronized Successfully';
                    self.wall_show_alert = false;
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        loadMore() {
            var self = this;
            self.wall_is_submitting = true;
            self.wall_show_alert = true;
            self.wall_alert_class = 'alert-info';
            self.wall_alert_msg = 'Loading Posts Please wait...';

            $.ajax({
                url: '/fetchposts',
                method: 'POST',
                data: self.wall_info,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    for (var i = 0; i < data.WallPosts.data.length; i++) {
                        var exists = false;
                        for (var ii = 0; ii < self.WallPosts.length; ii++) {
                            if (self.WallPosts[ii]['id'] == data.WallPosts.data[i]['id']) {
                                exists = true
                            }
                        }
                        if (!exists) {
                            self.WallPosts.push(data.WallPosts.data[i]);
                        }
                    }
                    self.wall_info.lastid = data.WallPosts.page;
                    self.wall_alert_class = 'alert-success';
                    self.wall_alert_msg = 'Wall Synchronized Successfully';
                    self.wall_show_alert = false;
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        handleScroll() {
            var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
            var scrolltrigger = 0.95;
            if ((wintop / (docheight - winheight)) > scrolltrigger)
                this.loadMore();
        },
        format_date: function (value) {
            if (value) {
                if (moment(String(value)).isSame(moment(), 'd')) {
                    return moment(String(value)).startOf('hour').fromNow()
                } else {
                    return moment(String(value)).format('LLLL')
                }
            }
        },
        postComment(postID) {
            const n = 'comInput-' + postID;
            var comment = $('input[id=' + n + ']').val();
            if (comment == '') {
                swal("Error!", "Can not post empty comment", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    postID: postID,
                    comment: comment,
                }
                $.ajax({
                    url: '/postcomment',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        for (var ii = 0; ii < self.WallPosts.length; ii++) {
                            if (self.WallPosts[ii]['id'] == postID) {
                                self.WallPosts.splice(ii, 0);
                                self.WallPosts[ii] = data.data[0];
                                $('input[id=' + n + ']').val('')
                            }
                        }
                        // swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        delete_comment(postid,commentid) {
            if (!postid || postid == '' || !commentid || commentid == '') {
                swal("Error!", "Invalid Input", "error");
            } else {
                var self = this;
                var postData = {
                    _csrf: this.csrf,
                    post_id: postid,
                    comment_id: commentid
                }
                $.ajax({
                    url: '/deletecomment',
                    method: 'POST',
                    async: false,
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                    },
                    success: function (data) {
                        for (var ii = 0; ii < self.WallPosts.length; ii++) {
                            if (self.WallPosts[ii]['id'] == postid) {
                                self.WallPosts.splice(ii, 0);
                                self.WallPosts[ii] = data.data[0];
                            }
                        }
                        // swal("Success!", data.msg, "success");
                    },
                    error: function (error) {
                        swal("Error!", error.msg, "error");
                    }
                });
            }
        },
        likePost(postID) {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                postID: postID,
            }
            $.ajax({
                url: '/likepost',
                method: 'POST',
                async: false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    for (var ii = 0; ii < self.WallPosts.length; ii++) {
                        if (self.WallPosts[ii]['id'] == postID) {
                            self.WallPosts.splice(ii, 0);
                            self.WallPosts[ii] = data.data[0];
                        }
                    }
                    // swal("Success!", data.msg, "success");
                },
                error: function (error) {
                    swal("Error!", error.msg, "error");
                }
            });
        },
        dislikePost(postID) {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                postID: postID,
            }
            $.ajax({
                url: '/dislikePost',
                method: 'POST',
                async: false,
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    for (var ii = 0; ii < self.WallPosts.length; ii++) {
                        if (self.WallPosts[ii]['id'] == postID) {
                            self.WallPosts.splice(ii, 0);
                            self.WallPosts[ii] = data.data[0];
                        }
                    }
                    // swal("Success!", data.msg, "success");
                },
                error: function (error) {
                    swal("Error!", error.msg, "error");
                }
            });
        }
    },
    created() {
        document.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.handleScroll);
    },

    mounted: function () {
        this.loadNew()
    },
})