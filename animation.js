/**
 * @author zhangxinxu(.com)
 * @description 让Tween.js缓动算法更容易理解和使用
                需要先引入Tween.js - https://github.com/zhangxinxu/Tween/blob/master/tween.js
 * @link https://github.com/zhangxinxu/Tween/blob/master/animation.js
 */
// 对运动方法进行封装
Math.animation = function (from, to, duration, easing, callback) {
    var isUndefined = function (obj) {
        return typeof obj == 'undefined';
    };
    var isFunction = function (obj) {
        return typeof obj == 'function';
    };
    var isNumber = function(obj) {
        return typeof obj == 'number';
    };
    var isString = function(obj) {
        return typeof obj == 'string';
    };

    // 转换成毫秒
    var toMillisecond = function(obj) {
        if (isNumber(obj)) {
            return     obj;
        } else if (isString(obj)) {
            if (/\d+m?s$/.test(obj)) {
                if (/ms/.test(obj)) {
                    return 1 * obj.replace('ms', '');
                }
                return 1000 * obj.replace('s', '');
            } else if (/^\d+$/.test(obj)) {
                return +obj;
            }
        }
        return -1;
    };

    if (!isNumber(from) || !isNumber(to)) {
        if (window.console) {
            console.error('from和to两个参数必须且为数值');
        }
        return 0;
    }

    // 缓动算法
    var tween = Math.tween || window.Tween;

    if (!tween) {
        if (window.console) {
            console.error('缓动算法函数缺失');
        }
        return 0;
    }

    // duration, easing, callback均为可选参数
    // 而且顺序可以任意
    var options = {
        duration: 300,
        easing: 'Linear',
        callback: function() {}
    };

    var setOptions = function(obj) {
        if (isFunction(obj)) {
            options.callback = obj;
        } else if (toMillisecond(obj) != -1) {
            options.duration = toMillisecond(obj);
        } else if (isString(obj)) {
            options.easing = obj;
        }
    };
    setOptions(duration);
    setOptions(easing);
    setOptions(callback);

    // requestAnimationFrame的兼容处理
    if (!window.requestAnimationFrame) {
        requestAnimationFrame = function (fn) {
            return setTimeout(fn, 17);
        };
    }
    if (!window.cancelAnimationFrame) {
        cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }

    // 算法需要的几个变量
    var start = 0;
    // during根据设置的总时间计算
    var during = Math.ceil(options.duration / 17);
    // 动画请求帧
    var req = null;

    // 当前动画算法
	// 确保首字母大写
	options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
    var arrKeyTween = options.easing.split('.');
    var fnGetValue;

    if (arrKeyTween.length == 1) {
        fnGetValue = tween[arrKeyTween[0]];
    } else if (arrKeyTween.length == 2) {
        fnGetValue = tween[arrKeyTween[0]] && tween[arrKeyTween[0]][arrKeyTween[1]];
    }
	if (isFunction(fnGetValue) == false) {
		console.error('没有找到名为"'+ options.easing +'"的动画算法');
		return;
	}

    // 运动
    var step = function() {
        // 当前的运动位置
        var value = fnGetValue(start, from, to - from, during);

        // 时间递增
        start++;
        // 如果还没有运动到位，继续
        if (start <= during) {
            options.callback(value);
            req = requestAnimationFrame(step);
        } else {
            // 动画结束，这里可以插入回调...
            options.callback(to, true);
        }
    };
    // 开始执行动画
    step();

    return function () {
        return req;
    };
};