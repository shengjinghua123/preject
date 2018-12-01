function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, false)[attr];
    }
    return ele.currentStyle[attr];
}

function move($ele, targetObj, time = 200, callback) {
    if (typeof $ele === 'string') {
        $ele = document.querySelector($ele);
    }
    // 确保是dom对象以后, 在清除定时器
    // debugger
    console.log($ele);
    clearInterval($ele.timer);
    // 获取每个属性的速度
    var speedObj = {};
    for (var attr in targetObj) {
        // 获取初始值
        var attrVal = getStyle($ele, attr);
        if (attr == 'opacity') {
            attrVal *= 100;
        }
        attrVal = parseFloat(attrVal);

        var speed = (targetObj[attr] - attrVal) / (time / 10);
        speedObj[attr] = speed.toFixed(2) - 0;
    }
    console.log(speedObj);

    $ele.timer = setInterval(_ => {

        var flag = true;

        for (var attr in targetObj) {
            // 根据不同属性获取初始值
            var attrVal = getStyle($ele, attr);
            if (attr == 'opacity') {
                attrVal *= 100;
            }
            attrVal = parseFloat(attrVal);
            var speed = speedObj[attr];
            var target = targetObj[attr];
            attrVal += speed;

            if ((speed >= 0 && attrVal >= target) || (speed <= 0 && attrVal <= target)) {
                attrVal = target;
            } else {
                flag = false
            }
            if (attr == 'opacity') {
                $ele.style[attr] = attrVal / 100;
            } else {
                $ele.style[attr] = attrVal + 'px';
            }
        }
        if (flag) {
            clearInterval($ele.timer);
            // 目标已到达指定位置, 请指示
            console.log('目标已到达指定位置, 请指示');
            if (typeof callback == 'function') {
                callback($ele);
            }
        }

    }, 10)
}