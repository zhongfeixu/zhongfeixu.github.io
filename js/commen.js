/**
 * ��ȡԪ�صĴ��ı�����
 * @param id   ����Ϊ��ȡ�õı�ǩ
 * @returns {string}    ���ػ�ȡ���ı�����
 */
function getText(tag) {
    if (tag.innerText == undefined) {
        return tag.textContent;
    } else {
        return tag.innerText;
    }
}

/**
 * ��ȡԪ����ʽ�ĺ���,������е�λ��
 * @param tag     ����Ϊ��ȡ�õı�ǩ
 * @param attr    ��Ҫ��ȡ������
 * @returns {*}   ���ػ�ȡ������ֵ
 */
function getAttr(tag, attr) {
    if (tag.currentStyle == undefined) {      //�ж�tag�Ƿ��������currentStyle������ԣ�����У��Ϳ�����������ж�
        return getComputedStyle(tag, null)[attr];
    } else {
        return tag.currentStyle[attr];       //�˴���attr��Ҫ��[]��ȡ����������ʱ�������������� . ��ȡ��
    }
}

/**
 * ��ȡԪ�أ�ͨ��className��ʽ��
 * @param cls    className����
 * @param tarEle     �ѻ�ȡ����Ԫ��
 * @returns {*}      ����Ŀ��Ԫ�أ����������ʽ
 */
function getTagsByClassName(cls, tarEle) {
    if (typeof document.getElementsByClassName == "function") {
        var tags = document.getElementsByClassName(cls);
        return tags;
    }
    else {
        tarEle = tarEle || document.body;
        var tags = tarEle.getElementsByTagName("*");     //��ȡbody�����б�ǩ,����box0��
        var resultArr = [];                                      //����һ������(���飩���ڴ�����������ı�ǩ
        for (var i = 0; i < tags.length; i++) {             //��α������ÿһ����м��
            var temparr = tags[i].className.split(" ");    //����һ����ǩ�����ж���������ָ��󣬵õ�������һ��α����
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
 * �ö��Ԫ���˶���ָ��λ�ã�400-800-400���ҵ�step���ܱ�target����ʱ�����鴤��
 * @param tag   ��ȡ��Ԫ��
 * @param target    ��Ҫ�ƶ�����Ŀ����롣
 */
function animate1(tag, target) {
    clearInterval(tag.timer);    //ÿ�ε��ǰ�������ǰһ����ʱ������Ȼ��������١�
    var leader = tag.offsetLeft;    //���ó�ʼλ��
    var step;                          //��������
    tag.timer = setInterval(function () {   //�����Զ������ԣ���ÿ�������������˶��Ķ�ʱ����id�����������timer������
        step = 30;
        //���ݵ�ǰλ�ú�Ŀ��λ��֮��Ĵ�С��ϵ������step��������
        step = tag.offsetLeft > target ? -step : step;

        //���step���ܱ�target��������ֹ�鴤������
        if (Math.abs(tag.offsetLeft - target) > Math.abs(step)) {        //�鴤���ж�����
            leader = leader + step;  //�ƶ���ʽ
            tag.style.left = leader + "px";   //������õ�leader��box
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);       //������400ʱ�������ʱ��������ʱ�䲻�����ӡ�
        }
    }, 20)
}

/**
 * �޸���������  (+ �ö��Ԫ���˶���ָ��λ�ã�400-800-400���ҵ�step���ܱ�target����ʱ�����鴤)
 * @param tag
 * @param target
 */
function animate2(tag, attr, target) {
    clearInterval(tag.timer);    //ÿ�ε��ǰ�������ǰһ����ʱ������Ȼ��������١�
    tag.timer = setInterval(function () {   //�����Զ������ԣ���ÿ�������������˶��Ķ�ʱ����id�����������timer������
        //���ó�ʼλ�ã�parseInt��ȡ��ֵ�ģ���ΪgetAttrȡ�õ���ʽֵ���е�λ�� //��������Ͱ汾����ie������У���ȡ��ʽֵʱ�����û�����ó�ʼֵ�����ȡ��"auto"
        var leader = parseInt(getAttr(tag, attr)) || 0;
        //���ü��٣�step�����ɸ�
        var step = (target - leader) / 10;
        //��stepȡ�������⵽�ﲻ��Ŀ��λ��������⡣
        step = step > 0 ? Math.ceil(step) : Math.floor(step);//����Ԫ����Ľ����ֵ��step;
        //�ƶ���ʽ
        leader = leader + step;
        //���ø�tag
        tag.style[attr] = leader + "px";

        //���������Ŀ�ĵأ��������ʱ����
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, 20)         //����ÿ��20ms�����������һ����
}

/**
 * ͬʱ�޸Ķ��������ʽ�Ļ���
 * @param tag ��ȡ�ı�ǩ
 * @param obj ��Ҫ���õĶ�ӦԪ�ص���Ķ�Ӧλ�ã�����obj������
 */
function animate3(tag, obj) {     //����Ҫͬʱ�޸ĵ����ԣ��Լ�ֵ�Եķ�ʽ����obj�����С�
    clearInterval(tag.timer);    //ÿ�ε��ǰ�������ǰһ����ʱ������Ȼ��������١�
    tag.timer = setInterval(function () {   //�����Զ������ԣ���ÿ�������������˶��Ķ�ʱ����id�����������timer������
        //��flag��ǣ����豾�ζ�ʱ��ִ��ʱ��������ʽ��������ָ��λ��
        var flag = true;
        //���ڴ���Ĳ�����һ��������Ҫ�Զ��������е����Խ��в�������һ������
        // k -- ������ -- ��һ������������ attr
        //obj[k] -- ����ֵ --��һ������������ target
        for (var k in obj) {
            var leader = parseInt(getAttr(tag, k)) || 0;   //��ȡ��ʼλ��
            var step = (obj[k] - leader) / 10;    //���ò���
            step = step > 0 ? Math.ceil(step) : Math.floor(step);  //ȡ��step,���⵽�ﲻ��Ŀ��λ��
            leader = leader + step;   //�ƶ���ʽ
            tag.style[k] = leader + "px";  //��tag������ʽ

            //ĳһ����ʽ�˶���ָ��λ�ã�����ζ����������ʽҲ������ָ��λ��
            //��ʱ�������ᵼ������Ԫ�ؿ���û���˶����
            //ʲôʱ����Ҫ��ֹ��������κ�һ������û�е���ָ��λ�ã���ֹ���
            if (leader != obj[k]) {
                flag = false;
            }
        }
        //��ÿ����ʽ�˶���󣬽�����֤����һ���Ƿ��˶�����ָ��λ��.����ǣ��������ʱ����
        if (flag) {
            clearInterval(tag.timer);
        }
    }, 20)
}         //����ÿ��20ms���������ͬʱ��һ����

/**
 * ͬʱ�޸Ķ��������ʽ�Ļ���,�������ֵ�����޸ģ�zIndex/opacity)
 * @param tag ��ȡ�ı�ǩ
 * @param obj ��Ҫ���õĶ�ӦԪ�ص���Ķ�Ӧλ�ã�����obj������
 */
function animate4(tag, obj, fn) {     //����Ҫͬʱ�޸ĵ����ԣ��Լ�ֵ�Եķ�ʽ����obj�����С�
    clearInterval(tag.timer);    //ÿ�ε��ǰ�������ǰһ����ʱ������Ȼ��������١�
    tag.timer = setInterval(function () {   //�����Զ������ԣ���ÿ�������������˶��Ķ�ʱ����id�����������timer������
        //��flag��ǣ����豾�ζ�ʱ��ִ��ʱ��������ʽ��������ָ��λ��
        var flag = true;
        //���ڴ���Ĳ�����һ��������Ҫ�Զ��������е����Խ��в�������һ������
        // k -- ������ -- ��һ������������ attr
        //obj[k] -- ����ֵ --��һ������������ target
        for (var k in obj) {
            if (k == "zIndex") {
                tag.style[k] = obj[k];  //ֱ�����ò㼶������Ҫ����

            } else if (k == "opacity") {

                var target = obj[k] * 100;
                var leader = getAttr(tag, k) * 100 || 0;   //��ȡ��ʼλ��.С��. ��10������С�����㾫������
                var step = (target - leader) / 10;    //���ò���
                step = step > 0 ? Math.ceil(step) : Math.floor(step);  //ȡ��step,���⵽�ﲻ��Ŀ��λ��
                leader = leader + step;   //�ƶ���ʽ
                tag.style[k] = leader / 100;  //��tag������ʽ

            } else {

                var target = obj[k];
                var leader = parseInt(getAttr(tag, k)) || 0;   //��ȡ��ʼλ��
                var step = (target - leader) / 10;    //���ò���
                step = step > 0 ? Math.ceil(step) : Math.floor(step);  //ȡ��step,���⵽�ﲻ��Ŀ��λ��
                leader = leader + step;   //�ƶ���ʽ
                tag.style[k] = leader + "px";  //��tag������ʽ

            }

            //ĳһ����ʽ�˶���ָ��λ�ã�����ζ����������ʽҲ������ָ��λ��
            //��ʱ�������ᵼ������Ԫ�ؿ���û���˶����
            //ʲôʱ����Ҫ��ֹ��������κ�һ������û�е���ָ��λ�ã���ֹ���
            if (leader != target) {
                flag = false;
            }
        }
        //��ÿ����ʽ�˶���󣬽�����֤����һ���Ƿ��˶�����ָ��λ��.����ǣ��������ʱ����
        if (flag) {
            clearInterval(tag.timer);

            //���Ƿ��֣�����ʱ������󣬴˴��˶�ִ����ϡ�
            //���������˶�������ִ��һ���µ��˶�������˶���ȷ��������һ�������������ڴ˴�����
            if (typeof fn == "function") {
                fn(); //����һ������ִ����Ϻ�ִ��fn�����еĴ���
            }
        }
    }, 20)
}         //����ÿ��20ms���������ͬʱ��һ����

/**
 * ��ȡҳ������߶Ⱥ;�����ȵļ����Ժ���
 * @returns {{}}����һ�����󡣵���ʱ����ʱ����ֱ�ӣ�myScroll().scrollTop �õ������߶�
 */
function getScroll() {
    var obj = {};
    obj.scrTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    obj.scrLeft = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
    return obj;
    //һ�㲻��||0Ҳ���ԡ�
}

/**
 * ����¼�����
 * @param tag ��ȡ��Ԫ��
 * @param eventName  �¼����ͣ�����дon)
 * @param fn (����������Ҫִ�е��´��룩
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
 * ��ȡҳ���������Ŀ�Ⱥ͸߶�
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/**
 * ��ȡҳ��������
 * @param e
 * @returns {*}ҳ�������꣬�޵�λ
 */
function getPageY(e) {
    if (e.pageY) {
        return e.pageY;
    } else {
        return e.clientY + getScroll().scrTop;   //ҳ��������������� + ҳ������߶�
    }
}

/**
 * ��ȡҳ�������
 * @param e
 * @returns {*}ҳ������꣬�޵�λ
 */
function getPageY(e) {
    if (e.pageX) {
        return e.pageX;
    } else {
        return e.clientX + getScroll().scrLeft;   //ҳ��������������� + ҳ������߶�
    }
}