//  解决get请求的缓存问题
function sendAjax(url, obj) {
    const xhr = new XMLHttpRequest();
    const _default = {
        method: 'GET',
        data: null
    }
    if (obj) {
        for (var key in _default) {
            if (key in obj) {
                _default[key] = obj[key];
            }
        }
    }
    _default.method = _default.method.toUpperCase()
    if (_default.method == 'GET') {
        // json/a.json?id=10&name=xixi&age=10&_=19191918
        let flag = url.indexOf('?') == -1 ? "?" : "&";
        url += flag;
        for (var i in _default.data) {
            let keyValue = `${i}=${_default.data[i]}`;
            url += keyValue + '&';
        }
        // 添加一个时间戳, 解决get请求的缓存问题
        url += `_=${Date.now()}`;
        console.log(url);
        _default.data = null;
    } else if (_default.method == 'POST') {

        _default.data = JSON.stringify(_default.data);
    } else {
        console.log('告辞!');
        return;
    }

    xhr.open(_default.method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(_default.data);
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.responseText);
                }
            }
        }
    })
}