var chickInput = {
    tel(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str)
    },
    register(str) {
        var reg = /^\d{6}$/;
        return reg.test(str)
    },
    password(str) {
        var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
        return reg.test(str)
    }
}

var registor = (function () {
    var $form = document.querySelector('.register form')
    console.log($form)
    return {
        init() {
            this.$inp1 = $form.querySelectorAll('input');
            this.$lable = $form.querySelectorAll('.placeholder');
            this.$success = $form.querySelector('.success');
            this.$button = $form.querySelector('.btn1')
            this.$p = $form.querySelector('#error')
            console.log(this.$inp1, this.$lable, this.$success, this.$button)
            this.event()
        },
        event() {
            var _this = this;
            var telVal = 0;
            for (let i = 0; i < this.$inp1.length; i++) {
                this.$inp1[i].onclick = function (e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    _this.$lable[i].style.display = 'none';
                }
                this.$lable[i].onclick = function (e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    _this.$lable[i].style.display = 'none';
                    _this.$inp1[i].focus();
                }
                this.$inp1[i].onblur = function () {
                    var str = 'register' + i
                    for (var i in chickInput) {
                        var bool = chickInput[i](this.value);
                        if (bool === true && i == 'tel') {
                            telVal = this.value;
                            _this.$success.style.display = 'block';
                        }
                    }

                }

            }

            this.$button.onclick = function () {
                _this.$p.innerHTML = '';
                if (_this.$success.style.display == 'block') {
                    console.log('开始ajax验证');
                    console.log(telVal)
                    sendAjax('PHP/a.php', {
                        method: 'POST',
                        data: telVal
                    }).then(res => {
                        console.log(res);
                        if (res == 0) {
                            var $inp1 = document.querySelectorAll('input');
                            var $lable = document.querySelectorAll('.placeholder');
                            $lable[1].style.display = 'none';
                            $inp1[1].value = 6666;
                        } else if (res == 1) {
                            _this.$p.style.visibility = 'visible';
                            _this.$p.innerHTML = `该手机号已存在，您可以用此手机号直接<a href="" class="login">登录</a>`;

                        }
                    })
                } else {
                    _this.$p.style.visibility = 'visible';
                    _this.$p.innerHTML = '请输入注册手机！';
                    _this.$p.style.color = 'red';

                }
            }

        }
    }
}())