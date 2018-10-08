var app = new Vue({
    el: '#adongular-app',
    data: {
        csrf: $('input[name=_csrf]').val(),
        jwt: $('input[name=jwt]').val(),
    },
    methods: {
        ApproveKYC(UserId) {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                UserId: UserId,
                status: 'Approved',
            }
            $.ajax({
                url: '/admin/kycprocessing',
                method: 'POST',
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    if (data.status == 'OK') {
                        swal("Success!", "KYC Processed!", "success");
                        var row = document.getElementById('r_' + UserId);
                        row.parentNode.removeChild(row);
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        RejectKYC(UserId) {
            var self = this;
            var postData = {
                _csrf: this.csrf,
                UserId: UserId,
                status: 'Rejected',
            }
            $.ajax({
                url: '/admin/kycprocessing',
                method: 'POST',
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.jwt);
                },
                success: function (data) {
                    console.log(data)
                    if (data.status == 'OK') {
                        swal("Success!", "KYC Processed!", "success");
                        var row = document.getElementById('r_' + UserId);
                        row.parentNode.removeChild(row);
                    } else {
                        swal("Error!", data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
    }
})



function kycModal(UserId) {
    var myNode = document.getElementById("imgDiv1");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var div = document.createElement('div');
    div.className = 'row';
    div.id = 'imgDiv';
    div.innerHTML = '';
    document.getElementById('imgDiv1').appendChild(div);

    var _KycPic = '/uploads/kycDocument/' + UserId + '_KycPic.png';
    imageExists(_KycPic, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycPic + '" target="_blank"><img src="' + _KycPic + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });
    var _KycPassport1 = '/uploads/kycDocument/' + UserId + '_KycPassport1.png';
    imageExists(_KycPassport1, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycPassport1 + '" target="_blank"><img src="' + _KycPassport1 + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });
    var _KycPassport2 = '/uploads/kycDocument/' + UserId + '_KycPassport2.png';
    imageExists(_KycPassport2, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycPassport2 + '" target="_blank"><img src="' + _KycPassport2 + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });
    var _KycGovtID = '/uploads/kycDocument/' + UserId + '_KycGovtID.png';
    imageExists(_KycGovtID, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycGovtID + '" target="_blank"><img src="' + _KycGovtID + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });
    var _KycAddressProof = '/uploads/kycDocument/' + UserId + '_KycAddressProof.png';
    imageExists(_KycAddressProof, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycAddressProof + '" target="_blank"><img src="' + _KycAddressProof + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });
    var _KycDoc1 = '/uploads/kycDocument/' + UserId + '_KycDoc1.png';
    imageExists(_KycDoc1, function (exists) {
        if (exists) {
            var div = document.createElement('div');
            div.className = 'col-md-4';
            div.innerHTML = '<a href="' + _KycDoc1 + '" target="_blank"><img src="' + _KycDoc1 + '" class="img-thumbnail" style="max-width:200px;max-height:200px;" /></a>';
            document.getElementById('imgDiv').appendChild(div);
        }
    });


}
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
}
