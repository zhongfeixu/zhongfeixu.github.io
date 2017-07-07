/**
 * 获取元素的纯文本函数
 * @param id   必须为获取好的标签
 * @returns {string}    返回获取的文本内容
 */
function getText(tag) {
    if (tag.innerText == undefined) {
        return tag.textContent;
    } else {
        return tag.innerText;
    }
}

/**
 * 获取元素样式的函数,结果含有单位。
 * @param tag     必须为获取好的标签
 * @param attr    需要提取的属性
 * @returns {*}   返回获取的属性值
 */
function getAttr(tag, attr) {
    if (tag.currentStyle == undefined) {      //判断tag是否有这个有currentStyle这个属性，如果有，就可以用这个来判断
        return getComputedStyle(tag, null)[attr];
    } else {
        return tag.currentStyle[attr];       //此处的attr需要用[]，取连续的属性时，不能用连续的 . 来取。
    }
}

/**
 * 获取元素（通过className方式）
 * @param cls    className名称
 * @param tarEle     已获取到的元素
 * @returns {*}      返回目标元素，以数组的形式
 */
function getTagsByClassName(cls, tarEle) {
    if (typeof document.getElementsByClassName == "function") {
        var tags = document.getElementsByClassName(cls);
        return tags;
    }
    else {
        tarEle = tarEle || document.body;
        var tags = tarEle.getElementsByTagName("*");     //获取body内所有标签,存入box0中
        var resultArr = [];                                      //声明一个变量(数组）用于存放满足条件的标签
        for (var i = 0; i < tags.length; i++) {             //对伪数组中每一项进行检测
            var temparr = tags[i].className.split(" ");    //由于一个标签可能有多个类名，分隔后，得到类名的一个伪数组
            for (var j = 0; j < temparr.length; j++) {
                if (temparr[j] == cls) {
                    resultArr[resultArr.length] = tags[i]
                }
            }
        }
        return resultArr;
    }
}

/**
 * 让多个元素运动到指定位置，400-800-400，且当step不能被target整除时，不抽搐。
 * @param tag   获取的元素
 * @param target    需要移动的总目标距离。
 */
function animate1(tag, target) {
    clearInterval(tag.timer);    //每次点击前，先清除前一个定时器，不然会产生加速。
    var leader = tag.offsetLeft;    //设置初始位置
    var step;                          //声明变量
    tag.timer = setInterval(function () {   //采用自定义属性，让每个变量将自身运动的定时器的id保存在自身的timer属性上
        step = 30;
        //根据当前位置和目标位置之间的大小关系，设置step的正负。
        step = tag.offsetLeft > target ? -step : step;

        //如果step不能被target整除，防止抽搐的问题
        if (Math.abs(tag.offsetLeft - target) > Math.abs(step)) {        //抽搐的判断条件
            leader = leader + step;  //移动公式
            tag.style.left = leader + "px";   //将计算好的leader给box
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);       //当大于400时，清掉定时器，让其时间不在增加。
        }
    }, 20)
}

/**
 * 修改任意属性  (+ 让多个元素运动到指定位置，400-800-400，且当step不能被target整除时，不抽搐)
 * @param tag
 * @param target
 */
function animate2(tag, attr, target) {
    clearInterval(tag.timer);    //每次点击前，先清除前一个定时器，不然会产生加速。
    tag.timer = setInterval(function () {   //采用自定义属性，让每个变量将自身运动的定时器的id保存在自身的timer属性上
        //设置初始位置（parseInt是取数值的，因为getAttr取得的样式值带有单位； //在浏览器低版本或者ie浏览器中，获取样式值时，如果没有设置初始值，会获取到"auto"
        var leader = parseInt(getAttr(tag, attr)) || 0;
        //设置减速，step可正可负
        var step = (target - leader) / 10;
        //让step取整，避免到达不了目标位置这个问题。
        step = step > 0 ? Math.ceil(step) : Math.floor(step);//将三元运算的结果赋值给step;
        //移动公式
        leader = leader + step;
        //设置给tag
        tag.style[attr] = leader + "px";

        //如果到达了目的地，就清除计时器。
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, 20)         //代表每隔20ms，这个属性走一步。
}

/**
 * 同时修改多个任意样式的缓动
 * @param tag 获取的标签
 * @param obj 需要设置的对应元素到达的对应位置，放入obj对象中
 */
function animate3(tag, obj) {     //将需要同时修改的属性，以键值对的方式放在obj对象中。
    clearInterval(tag.timer);    //每次点击前，先清除前一个定时器，不然会产生加速。
    tag.timer = setInterval(function () {   //采用自定义属性，让每个变量将自身运动的定时器的id保存在自身的timer属性上
        //用flag标记，假设本次定时器执行时，所有样式均到达了指定位置
        var flag = true;
        //由于传入的参数是一个对象，需要对对象中所有的属性进行操作，第一步遍历
        // k -- 属性名 -- 上一个动画函数的 attr
        //obj[k] -- 属性值 --上一个动画函数的 target
        for (var k in obj) {
            var leader = parseInt(getAttr(tag, k)) || 0;   //获取初始位置
            var step = (obj[k] - leader) / 10;    //设置步长
            step = step > 0 ? Math.ceil(step) : Math.floor(step);  //取整step,避免到达不了目的位置
            leader = leader + step;   //移动公式
            tag.style[k] = leader + "px";  //给tag设置样式

            //某一个样式运动到指定位置，不意味这其他的样式也到达了指定位置
            //这时如果清除会导致其他元素可能没有运动完毕
            //什么时候需要阻止清除？有任何一个属性没有到达指定位置，阻止清除
            if (leader != obj[k]) {
                flag = false;
            }
        }
        //当每个样式运动完后，进行验证，看一看是否都运动到达指定位置.如果是，就清除定时器。
        if (flag) {
            clearInterval(tag.timer);
        }
    }, 20)
}         //代表每隔20ms，多个属性同时走一步。

/**
 * 同时修改多个任意样式的缓动,针对特殊值进行修改（zIndex/opacity)
 * @param tag 获取的标签
 * @param obj 需要设置的对应元素到达的对应位置，放入obj对象中
 */
function animate4(tag, obj, fn) {     //将需要同时修改的属性，以键值对的方式放在obj对象中。
    clearInterval(tag.timer);    //每次点击前，先清除前一个定时器，不然会产生加速。
    tag.timer = setInterval(function () {   //采用自定义属性，让每个变量将自身运动的定时器的id保存在自身的timer属性上
        //用flag标记，假设本次定时器执行时，所有样式均到达了指定位置
        var flag = true;
        //由于传入的参数是一个对象，需要对对象中所有的属性进行操作，第一步遍历
        // k -- 属性名 -- 上一个动画函数的 attr
        //obj[k] -- 属性值 --上一个动画函数的 target
        for (var k in obj) {
            if (k == "zIndex") {
                tag.style[k] = obj[k];  //直接设置层级，不需要渐变

            } else if (k == "opacity") {

                var target = obj[k] * 100;
                var leader = getAttr(tag, k) * 100 || 0;   //获取初始位置.小数. ×10，避免小数计算精度问题
                var step = (target - leader) / 10;    //设置步长
                step = step > 0 ? Math.ceil(step) : Math.floor(step);  //取整step,避免到达不了目的位置
                leader = leader + step;   //移动公式
                tag.style[k] = leader / 100;  //给tag设置样式

            } else {

                var target = obj[k];
                var leader = parseInt(getAttr(tag, k)) || 0;   //获取初始位置
                var step = (target - leader) / 10;    //设置步长
                step = step > 0 ? Math.ceil(step) : Math.floor(step);  //取整step,避免到达不了目的位置
                leader = leader + step;   //移动公式
                tag.style[k] = leader + "px";  //给tag设置样式

            }

            //某一个样式运动到指定位置，不意味这其他的样式也到达了指定位置
            //这时如果清除会导致其他元素可能没有运动完毕
            //什么时候需要阻止清除？有任何一个属性没有到达指定位置，阻止清除
            if (leader != target) {
                flag = false;
            }
        }
        //当每个样式运动完后，进行验证，看一看是否都运动到达指定位置.如果是，就清除定时器。
        if (flag) {
            clearInterval(tag.timer);

            //我们发现，当定时器清除后，此次运动执行完毕。
            //我们想在运动结束后执行一个新的运动。这个运动不确定，传入一个函数参数，在此处调用
            if (typeof fn == "function") {
                fn(); //当第一个动画执行完毕后，执行fn函数中的代码
            }
        }
    }, 20)
}         //代表每隔20ms，多个属性同时走一步。

/**
 * 获取页面卷曲高度和卷曲宽度的兼容性函数
 * @returns {{}}返回一个对象。调用时函数时可以直接：myScroll().scrollTop 得到卷曲高度
 */
function getScroll() {
    var obj = {};
    obj.scrTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    obj.scrLeft = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
    return obj;
    //一般不用||0也可以。
}

/**
 * 解决事件覆盖
 * @param tag 获取的元素
 * @param eventName  事件类型（不用写on)
 * @param fn (匿名函数，要执行的新代码）
 */
function addEvent(tag, eventName, fn) {
    var oddEvent = tag["on" + eventName];
    if (typeof oddEvent == "function") {
        tag["on" + eventName] = function () {
            oddEvent();
            fn();
        }
    } else {
        tag["on" + eventName] = function () {
            fn();
        }
    }
}

/**
 * 获取页面可视区域的宽度和高度
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/**
 * 获取页面纵坐标
 * @param e
 * @returns {*}页面纵坐标，无单位
 */
function getPageY(e) {
    if (e.pageY) {
        return e.pageY;
    } else {
        return e.clientY + getScroll().scrTop;   //页面可视区域纵坐标 + 页面卷曲高度
    }
}

/**
 * 获取页面横坐标
 * @param e
 * @returns {*}页面横坐标，无单位
 */
function getPageY(e) {
    if (e.pageX) {
        return e.pageX;
    } else {
        return e.clientX + getScroll().scrLeft;   //页面可视区域纵坐标 + 页面卷曲高度
    }
}