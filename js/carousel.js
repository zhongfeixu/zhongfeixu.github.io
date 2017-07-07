/**
 * Created by zhongfeixu on 2017/4/6.
 *
 */
window.onload = function () {
    var carouselPic = document.getElementById("carouselPic");
    var contentPic = carouselPic.children[0];
    var ul = contentPic.children[0];
    var ullis = ul.children;
    var smallContent = carouselPic.children[1]
    var ol = smallContent.children[0];
    var ollis = smallContent.children[0].children;
    var arrowUp = smallContent.children[1];
    var arrowDown = smallContent.children[2];
    var timer = null;
    var count = 0;
    var countUpDown = 0;
    var countPic = ullis.length;
    var li = ul.children[0].cloneNode(true);
    ul.appendChild(li);
    automove();
    ollis[count].style.opacity = 1;
    for (var i = 0; i < ollis.length; i++) {
        ollis[i].index = i;
        ollis[i].onclick = function () {
            clearInterval(timer);
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].style.opacity = 0.6;
            }
            this.style.opacity = 1;
            animate(ul, {top: -this.index * contentPic.offsetHeight})
            count = this.index;
        }
        ollis[i].onmouseover = function () {
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].style.opacity = 0.6;
            }
            this.style.opacity = 1;
        }
    }
    contentPic.onmousemove = function () {
        clearInterval(timer)
    }
    contentPic.onmouseout = function () {
        automove();
        for (var i = 0; i < ollis.length; i++) {
            ollis[i].style.opacity = 0.6;
        }
        ollis[count].style.opacity = 1;
    }

    ol.onmousedown = function (e) {
        var e = e || window.event;
        var y = e.clientY - ol.offsetTop;
        document.onmousemove = function (e) {
            var e = e || window.event;
            var height = e.clientY - y;
            height = height < -ol.offsetHeight * 4 / 7 ? -ol.offsetHeight * 4 / 7 : height;
            height = height > ol.offsetHeight * 2 / 7 ? ol.offsetHeight * 2 / 7 : height;
            ol.style.top = height + "px";
        }
        return false;
    }
    document.onmouseup = function () {
        console.log(ol.offsetTop);
        if (ol.offsetTop < -ol.offsetHeight * 3 / 7) {
            animate(ol, {top: -ol.offsetHeight * 3 / 7})
        } else if (ol.offsetTop > 0) {
            animate(ol, {top: 0})
        } else {

        }
        document.onmousemove = null;

    }
    arrowDown.onmousemove = function () {
        this.style.opacity = 1;
    }
    arrowDown.onmouseout = function () {
        this.style.opacity = 0.5;

    }
    arrowUp.onmouseover = function () {
        this.style.opacity = 1;

    }
    arrowUp.onmouseout = function () {
        this.style.opacity = 0.5;

    }
    arrowDown.onclick = function () {
        if (this.isanimate) return;
        countUpDown += 80;
        animate(ol, {top: countUpDown});
        if (countUpDown > 0) {
            animate(ol, {top: 0})
            countUpDown = 0;
        }
    }
    arrowUp.onclick = function () {
        if (this.isanimate) return;
        countUpDown -= 80;
        animate(ol, {top: countUpDown})
        if (countUpDown < -ol.offsetHeight * 3 / 7) {
            animate(ol, {top: -ol.offsetHeight + smallContent.offsetHeight})
            countUpDown = -ol.offsetHeight + smallContent.offsetHeight;
        }
    }
    function automove() {
        clearInterval(timer)
        timer = setInterval(function () {
            if (count >= countPic) {
                count = 0;
                ul.style.top = 0;
            }
            ollis[count].style.opacity = 1;
            count++;
            var length = -count * contentPic.offsetHeight
            animate(ul, {top: length});
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].style.opacity = 0.6;
            }
            if (count > 2&&count!=countPic) {
                var juli=count-2;
                juli = juli >= 3 ? 3 : juli;
                animate(ol, {top: -juli * ollis[0].offsetHeight});
            };
            if(count==countPic){
                animate(ol, {top: 0});
                ollis[0].style.opacity=1;
            }else{
                ollis[count].style.opacity = 1;
            }

        }, 3000);
    }


}

