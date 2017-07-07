/**
 * Created by Kaier on 2017/4/7.
 */

var lbt2_screen = document.getElementById("lbt2_screen");
var ol_list = document.getElementById("lbt2_yd");
var yd_list = ol_list.children;     //圆点list
var ul = document.getElementById("lbt2");
var imgWid = ul.children[0].children[0].offsetWidth;
var timer01 = null;
var count = 0; //计数

for (var i = 0; i < yd_list.length; i++) {
    yd_list[0].id = "touming";
    yd_list[i].index = i;
    yd_list[i].onclick = function (e) {
        var e = e || window.event;
        if (yd_list[3].id == "touming" && e.target == yd_list[0]) {
            ul.style.left = 0;
            count = 0;
            for (var i = 0; i < yd_list.length; i++) {
                yd_list[i].id = "";
            }
            yd_list[0].id = "touming";
        } else {
            for (var i = 0; i < yd_list.length; i++) {
                yd_list[i].id = "";
            }
            this.id = "touming";
            var target = -this.index * imgWid;
            animateE(ul, target);
            count = this.index
        }
    }
}
// 添加最后一张图
var last_li = document.createElement("li");
ul.appendChild(last_li);
last_li.innerHTML = '<img src="../images/1920x450_5zhe_banner_170405.jpg" alt="01"/>';

//定时机
timer01 = setInterval(function () {
    getTimer();
}, 4000)

lbt2_screen.onmouseover = function () {
    clearInterval(timer01);
}
lbt2_screen.onmouseout = function () {
    timer01 = setInterval(function () {
        getTimer();
    }, 4000)
}


//定时器
function getTimer() {
    if (count == 4) {
        ul.style.left = 0 + "px";
        count = 0;
        count++;
        var target = -count * imgWid;
        animateE(ul, target);
        for (var i = 0; i < yd_list.length; i++) {
            yd_list[i].id = "";
        }
        if (count == 4) {
            yd_list[0].id = "touming";
        } else {
            yd_list[count].id = "touming"
        }

    } else {
        count++;
        var target = -count * imgWid;
        animateE(ul, target);
        for (var i = 0; i < yd_list.length; i++) {
            yd_list[i].id = "";
        }
        if (count == 4) {
            yd_list[0].id = "touming";
        } else {
            yd_list[count].id = "touming"
        }
    }
}

