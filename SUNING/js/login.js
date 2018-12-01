var MOVE = (function () {
    return {
        init() {
            this.$qrcode = document.querySelector('.qrcode');
            this.$phone = document.querySelector('.phone');
            this.$box = document.querySelector('.box');
            this.$log = document.querySelector('.log-tab');
            this.$a = this.$log.querySelectorAll('a');
            this.$leftBox = document.querySelector('.left-box');
            this.$rightBox = document.querySelector('.right-box');
            this.$p = this.$rightBox.querySelectorAll('.error p');
            this.$submit = this.$rightBox.querySelector('.submit');
            this.$error = this.$rightBox.querySelector('.error')
            this.$inp = document.querySelectorAll('input')
            console.log(this.$leftBox, this.$rightBox, this.$p, this.$submit, this.$inp, this.$error)
            this.event();
        },
        event() {
            var _this = this;
            this.$qrcode.onmouseenter = function () {
                move(this, {
                    left: -160
                }, 200, function () {
                    _this.$phone.style.display = 'block';
                })
            }
            this.$box.onmouseleave = function () {
                _this.$phone.style.display = 'none';
                move(_this.$qrcode, {
                    left: 0
                }, 200, function () {
                    console.log(111)
                })
            }
            this.$a[1].onclick = function () {
                this.className = 'tab-on';
                _this.$a[0].className = 'tab';
                _this.$leftBox.style.display = 'none';
                _this.$rightBox.style.display = 'block';
            }
            this.$a[0].onclick = function () {
                this.className = 'tab-on';
                _this.$a[1].className = 'tab';
                _this.$leftBox.style.display = 'block';
                _this.$rightBox.style.display = 'none';
            }
            this.$submit.onclick = function () {
                _this.$error.style.visibility = 'hidden';
                for (var i = 0; i < _this.$p.length; i++) {
                    _this.$p[i].style.display = 'none';
                }
                if (_this.$inp[0].value == '' && _this.$inp[1].value == '') {
                    _this.$error.style.visibility = 'visible';
                    _this.$p[2].style.display = 'block';
                    return;
                }
                if (_this.$inp[0].value != '' && _this.$inp[1].value == '' || _this.$inp[0].value != '' && _this.$inp[1].value.length < 6) {
                    _this.$error.style.visibility = 'visible';
                    _this.$p[3].style.display = 'block';
                    return;
                }
                if (_this.$inp[0].value.length >= 1 && _this.$inp[1].value.length >= 6) {
                    console.log('可以发送阿贾克斯')
                    sendAjax('PHP/login.php', {
                            method: 'POST',
                            data: {
                                username: _this.$inp[0].value,
                                password: _this.$inp[1].value
                            }
                        })
                        .then(res => {
                            if (res == 0) {
                                _this.$error.style.visibility = 'visible';
                                _this.$p[0].style.display = 'block';
                                console.log(_this.$p[0])
                            }
                            if (res == 1) {
                                _this.$error.style.visibility = 'visible';
                                _this.$p[1].style.display = 'block';
                            }
                            if (res == 2) {
                                alert('登录成功！');
                                location.href = 'http://localhost:8887/preject/SUNING/index.1.html'
                            }
                        })
                }
            }
        }
    }
}())