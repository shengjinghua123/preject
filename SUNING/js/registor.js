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
//开始以为逻辑挺简单的，后来越做越觉得自己把逻辑想得太简单了！所有就一直再补BUG~
var registor = (function () {
    var $form = document.querySelector('.register form')
    console.log($form)
    var bool = 0;
    var flag = false;
    return {
        init() {
            this.$inp1 = $form.querySelectorAll('input');
            this.$lable = $form.querySelectorAll('.placeholder');
            this.$success = $form.querySelector('.success');
            this.$button = $form.querySelector('.btn1')
            this.$p = $form.querySelector('#error')
            this.$btn2 = $form.querySelector('.send-register')
            this.$tip = document.querySelector('.tip')
            this.$div = document.querySelector('.setPsw_rank');
            this.$span = this.$div.querySelectorAll('span');
            this.$mask = document.querySelector('.mask');
            this.$maskBtn = document.querySelector('.mask-btn');
            this.event()
        },
        event() {
            var _this = this;
            var telVal = 0;
            var num = 0;
            this.$maskBtn.onclick = function () {
                _this.$mask.style.display = 'none'
            }
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
                this.$inp1[0].onblur = function () {
                    var str = 'register' + i
                    for (var i in chickInput) {
                        var bool = chickInput[i](this.value);
                        console.log(bool)
                        if (bool === true && i == 'tel') {
                            telVal = this.value;
                            // _this.$success.style.display = 'block';
                            _this.$p.innerHTML = '';
                            if (this.value.length == 11) {
                                sendAjax('PHP/a.php', {
                                    method: 'POST',
                                    data: this.value
                                }).then(res => {
                                    if (res == 1) {
                                        _this.$success.style.display = 'none';
                                        _this.$p.style.visibility = 'visible';
                                        _this.$p.innerHTML = `该手机号已存在，您可以用此手机号直接<a href="login.html" class="login" style="font-size: 14px;color: red">登录</a>`;
                                    } else if (res == 0) {
                                        _this.$success.style.display = 'block';
                                        _this.$p.style.visibility = 'hidden';
                                        _this.$p.innerHTML = '';
                                    }
                                })
                            } else {
                                _this.$success.style.display = 'none';
                            }
                        }
                        if (bool === false && i == 'tel') {
                            _this.$p.style.visibility = 'visible';
                            _this.$p.innerHTML = '请输入正确的手机号！';
                            _this.$success.style.display = 'none';
                        }
                    }

                }

            }
            this.$inp1[0].onfocus = function () {
                _this.$p.innerHTML = ''
            }
            this.$button.onclick = function (e) {
                _this.$p.innerHTML = '';
                _this.$inp1[0].addEventListener('blur', function () {
                    var bool = chickInput['tel'](this.value);
                    if (bool === true) {
                        telVal = this.value;
                        _this.$success.style.display = 'block';
                        _this.$p.innerHTML = '';
                    }
                    if (bool === false) {
                        _this.$p.style.visibility = 'visible';
                        _this.$p.innerHTML = '请输入正确的手机号！';
                        _this.$success.style.display = 'none';
                    }
                })
                if (_this.$success.style.display == 'block') {
                    console.log('开始ajax验证');
                    console.log(telVal);
                    sendAjax('PHP/a.php', {
                        method: 'POST',
                        data: telVal
                    }).then(res => {
                        console.log(res);
                        if (res == 0) {
                            var $inp1 = document.querySelectorAll('input');
                            var $lable = document.querySelectorAll('.placeholder');
                            var $send = document.querySelector('.send-ipone')
                            // $send.style.visibility = 'hiddden';
                            // $send.innerHTML = ''
                            flag = true;
                            $lable[1].style.display = 'none';
                            $inp1[1].value = 6666;
                            var $send = document.querySelector('.send-ipone')
                            $send.style.visibility = 'visible';
                            $send.innerHTML = '手机验证码发送成功,8小时内有效';
                            $send.style.color = '#999'
                            var sum = 60;
                            this.disabled = 'disabled';
                            // this.disabled = '';
                            var timer = setInterval(function () {
                                sum--;
                                console.log(sum)
                                _this.$button.innerHTML = `${sum}秒后重新获取`;
                                if (sum <= 0) {
                                    clearInterval(timer);
                                    $send.style.visibility = 'hidden';
                                    $send.innerHTML = '';
                                    _this.$button.innerHTML = '获取短信验证码';
                                    _this.$button.disabled = '';
                                }
                            }, 1000)
                        } else if (res == 1) {
                            console.log(11)
                            _this.$p.innerHTML = `该手机号已存在，您可以用此手机号直接<a href="login.html" class="login" style="font-size: 14px;color: red">登录</a>`;
                            _this.$p.style.visibility = 'visible';
                            _this.$inp1[0].addEventListener('blur', function () {
                                var str = 'register' + i
                                for (var i in chickInput) {
                                    var bool = chickInput[i](this.value);
                                    console.log(bool)
                                    if (bool === true && i == 'tel') {
                                        telVal = this.value;
                                        _this.$success.style.display = 'block';
                                    } else if (bool === false && i == 'tel') {
                                        _this.$success.style.display = 'none';
                                        _this.$p.innerHTML = '请输入正确的手机号！'
                                        return;
                                    }
                                }
                            }, false)
                        }
                    })
                } else {
                    _this.$p.style.visibility = 'visible';
                    if (_this.$inp1[0].value == '') {
                        _this.$p.innerHTML = '请输入注册手机！';
                    } else if (_this.$success.style.display == 'none' && _this.$p.innerHTML != '') {
                        _this.$p.innerHTML = '请输入正确的手机号！'
                    } else {
                        _this.$p.innerHTML = `该手机号已存在，您可以用此手机号直接<a href="login.html" class="login" style="font-size: 14px;color: red">登录</a>`;
                    }
                    _this.$p.style.color = 'red';
                    _this.$inp1[0].addEventListener('focus', function () {
                        _this.$p.innerHTML = ''
                    }, false)

                }
            }

            this.$inp1[2].onfocus = function () {
                _this.$tip.style.visibility = 'visible'
            }
            this.$inp1[2].oninput = function () {
                var bool = chickInput['password'](this.value);
                console.log(bool)
                var reg = /\w+[`~./=?&*！@#￥%……^()+";:/.,|{}]{1}/;
                console.log(this.value)
                console.log(reg.test(this.value))
                var um = reg.test(this.value)
                if (bool == true) {
                    _this.$div.style.visibility = 'visible';
                    _this.$span[1].style.backgroundColor = '#fa0';
                    _this.$span[2].style.backgroundColor = '#fa0';
                    _this.$span[3].style.backgroundColor = '#cacaca';
                    num = 2;
                }
                if (bool == true && um == true) {
                    num = 3;
                    _this.$div.style.visibility = 'visible'
                    _this.$span[3].style.backgroundColor = '#fa0';
                    _this.$span[2].style.backgroundColor = '#fa0';
                    _this.$span[1].style.backgroundColor = '#fa0';
                }
                if (bool == false && this.value.length >= 6) {
                    num = 1;
                    _this.$div.style.visibility = 'visible'
                    _this.$span[1].style.backgroundColor = '#fa0';
                    _this.$span[3].style.backgroundColor = '#cacaca';
                    _this.$span[2].style.backgroundColor = '#cacaca';
                } else if (bool == false) {
                    _this.$div.style.visibility = 'hidden';
                    _this.$span[3].style.backgroundColor = '#cacaca';
                    _this.$span[2].style.backgroundColor = '#cacaca';
                    _this.$span[1].style.backgroundColor = '#cacaca';
                }
                console.log(num)
            }
            _this.$inp1[2].onfocus = function () {
                _this.$tip.style.visibility = 'visible';
                _this.$tip.innerHTML = `6-20个字符，由字母，数字和符号的两种以上组合。`;
                _this.$tip.style.color = '#999';
            }
            this.$inp1[0].oninput = function () {
                if (this.value.length == 11) {
                    sendAjax('PHP/a.php', {
                        method: 'POST',
                        data: this.value
                    }).then(res => {
                        if (res == 1) {
                            _this.$success.style.display = 'none';
                            _this.$p.style.visibility = 'visible';
                            _this.$p.innerHTML = `该手机号已存在，您可以用此手机号直接<a href="login.html" class="login" style="font-size: 14px;color: red">登录</a>`;
                            e.preventDefault();
                        } else if (res == 0) {
                            _this.$success.style.display = 'block';
                            _this.$p.style.visibility = 'hidden';
                            _this.$p.innerHTML = '';
                        }
                    })
                } else {
                    _this.$success.style.display = 'none';
                }

            }
            this.$btn2.onclick = function (e) {
                e = e || window.event;
                _this.$inp1[0].addEventListener('blur', function () {
                    var bool = chickInput['tel'](this.value);
                    if (bool === true) {
                        telVal = this.value;
                        _this.$success.style.display = 'block';
                        _this.$p.innerHTML = '';
                    }
                    if (bool === false) {
                        _this.$p.style.visibility = 'visible';
                        _this.$p.innerHTML = '请输入正确的手机号！';
                        _this.$success.style.display = 'none';
                        e.preventDefault();
                        return false;
                    }

                })
                if (_this.$inp1[0].value == '') {
                    _this.$p.style.visibility = 'visible';
                    _this.$p.innerHTML = '请输入手机号！';
                    _this.$success.style.display = 'none';
                    _this.$p.style.color = 'red';
                    e.preventDefault();
                    return;
                }
                if (_this.$inp1[1].value == '') {
                    var $send = document.querySelector('.send-ipone')
                    $send.style.visibility = 'visible';
                    $send.innerHTML = '请输入短信验证码！'
                    $send.style.color = 'red'
                    e.preventDefault();
                    return;
                }
                if (_this.$inp1[2].value == '') {
                    _this.$tip.style.visibility = 'visible';
                    _this.$tip.innerHTML = '请输入密码!'
                    _this.$tip.style.color = 'red';
                    e.preventDefault();
                    return;
                }
                if (_this.$success.style.display == 'block' && flag == true && num == 1) {
                    _this.$tip.style.visibility = 'visible';
                    _this.$tip.innerHTML = '不能为纯数字或纯字母！请使用字母或数字或符号两种以上组合!';
                    _this.$tip.style.color = 'red';
                    e.preventDefault();
                    return;
                }
                if (_this.$success.style.display == 'block' && flag == true && num >= 2) {
                    console.log(num)
                    sendAjax('PHP/enroll.php', {
                        method: 'POST',
                        data: {
                            tel: _this.$inp1[0].value,
                            password: _this.$inp1[2].value
                        }
                    })
                    alert('成功')
                    location.href = 'http://localhost:8887/preject/SUNING/login.html'
                    return;
                } else {
                    alert('您的账号已经注册！请直接登录！');
                    e.preventDefault();
                    return;
                }
            }


        }
    }
}())