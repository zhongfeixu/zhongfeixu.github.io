/**
 * Created by MissZhao on 2017/4/9.
 */

//PartOne 页面跳楼效果（js方法）
//1 获取元素
var jump = document.getElementsByClassName("jump");
var ul = jump[0].children[0];//ul
var ulis = ul.children;//ul中的li
var ol = jump[0].children[1];//获取ol
olis = ol.children;//ol中的li
//2 点击小按钮让大图对应运动
for (var i = 0; i < olis.length; i++) {
    olis[i].index = i;//设置自定义属性，记录小按钮的索引值
    olis[i].onclick = function () {
        //排他法让小按钮变色
        for (var j = 0; j < olis.length; j++) {
            olis[j].className = ""
        }
        this.className = "colorBlack";
        //让ul大图运动
        animate4(ul, {top: -this.index * ulis[this.index].offsetHeight});
    }
}

//PartTwo 鼠标移入图片，显示分享条；点击分享条，显示分享框（jQuery方法）
//1 移入时，让每个图片显示分享条
$(".fullImg").mouseenter(function () {
    //让shareBox插到这个图片的前面,且透明度变低，显示分享条
    $(".shareBox").insertBefore(this).css("opacity", "0.9").children("shareBar").css("display", "bolck");
}).mouseleave(function () {   //当鼠标移出图片时，移出shareBox
    $(this).children("shareBox").remove();
})
//2 鼠标移入分享条中的more， 让shareBox中的shareTo显示且可以切换
$(".more").click(function () {
    $(this).parent().parent().siblings().stop().slideToggle(300);
})

//PartThree 播放视屏
//1 点击官方视屏的video盒子，让videoBox显示
$(".vedio").click(function () {
    $(".videoBox").show()
})
//3 点击blockItem5,让视频影藏
$(".blockItem5 .fullImg").click(function () {
    $(".videoBox").hide();
})
//2 videoBox视屏播放部分
//var myPlayer = videojs('my-video');
videojs("my-video").ready(function () {
    var myPlayer = this;
    myPlayer.play();
});



