function sendAjax(url, obj) {
    const xhr = new XMLHttpRequest(); //XMLHttpRequest 对象用于在后台与服务器交换数据。
    const _default = {
        method: 'GET',
        data: null,
        success: undefined
    }
    if (obj) {
        for (var key in _default) {
            if (key in obj) {
                _default[key] = obj[key];
            }
        }
    }

    _default.method = _default.method.toUpperCase();
    //在使用XHR对象时，要调用的第一个方法是 open()，它接受 3个参数：要发送的请求的类型（”get”、”post”等）、请求的URL和表示是否异步发送请求的布尔值。

    if (_default.method == 'GET') { //如果传输方式为GET的情况
        //将请求发送到服务器。GET为空
        let flag = url.indexOf('?') == -1 ? "?" : '&';
        url += flag;
        //将传入的数据拼接成url
        for (var i in _default.data) {
            let keyValue = `${i}=${_default.data[i]}`;
            url += keyValue + '&';
        }
        url += `_=${Date.now()}`;
        _default.data = null;
        // console.log(url) //去掉最后一个
    } else if (_default.method == 'POST') { //如果传输方式为POST
        _default.data = JSON.stringify(_default.data);
        // _default.data = "username=" + _default.data.username + '&' + "password=" + _default.data.password + '&' + "tel=" + _default.data.tel + '&' + "age=" + _default.data.age + '&';
        //传入字符串，利用JSON方法将对象转化为字符串
    } else {
        return;
    }

    // 设置请求头, 在发送请求之前
    // 这里设置请求内容为form表单格式
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //  xhr.send("id=10&age=100");
    xhr.open(_default.method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(_default.data);

    xhr.onreadystatechange = function () { //每当 readyState 改变时，就会触发 onreadystatechange 事件。
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            if (typeof _default.success == 'function') {
                let data = xhr.responseText;
                console.log(data);
                data = data.slice(-1);
                _default.success(data);
            }
            if (xhr.responseText == 0) {
                var $h3 = document.querySelector('h3');
                $h3.innerHTML = '用户名正确';
                $h3.style.color = 'greenyellow';
                var $inp = document.querySelector('.inp1');
                $inp.style.borderColor = 'greenyellow'
            } else if (xhr.responseText == 1) {
                var $h3 = document.querySelector('h3');
                var $inp = document.querySelector('.inp1');
                $inp.style.borderColor = 'red'
                $h3.innerHTML = '用户名已存在';
                $h3.style.color = 'red';
            }
            if (xhr.responseText == 2) {
                var $h3 = document.querySelectorAll('h3');
                $h3[1].innerHTML = "手机号正确";
                $h3[1].style.color = 'greenyellow';
                var $inp = document.querySelector('.inp2');
                $inp.style.borderColor = 'greenyellow'
            } else if (xhr.responseText == 3) {
                var $h3 = document.querySelectorAll('h3');
                $h3[1].innerHTML = '手机号已存在';
                $h3[1].style.color = 'red';
                var $inp = document.querySelector('.inp2');
                $inp.style.borderColor = 'red'
            }
            // document.querySelector("h3").innerHTML = xhr.responseText;
            // let data = xhr.responseText;
            // data = JSON.parse(data)
            // console.log(data);


            // const data = JSON.parse(xhr.responseText);//php后台程序返回数据
            // console.log(data); 
        }
    }
}