/**
 * Created by MissZhao on 2017/4/9.
 */

//PartOne ҳ����¥Ч����js������
//1 ��ȡԪ��
var jump = document.getElementsByClassName("jump");
var ul = jump[0].children[0];//ul
var ulis = ul.children;//ul�е�li
var ol = jump[0].children[1];//��ȡol
olis = ol.children;//ol�е�li
//2 ���С��ť�ô�ͼ��Ӧ�˶�
for (var i = 0; i < olis.length; i++) {
    olis[i].index = i;//�����Զ������ԣ���¼С��ť������ֵ
    olis[i].onclick = function () {
        //��������С��ť��ɫ
        for (var j = 0; j < olis.length; j++) {
            olis[j].className = ""
        }
        this.className = "colorBlack";
        //��ul��ͼ�˶�
        animate4(ul, {top: -this.index * ulis[this.index].offsetHeight});
    }
}

//PartTwo �������ͼƬ����ʾ���������������������ʾ�����jQuery������
//1 ����ʱ����ÿ��ͼƬ��ʾ������
$(".fullImg").mouseenter(function () {
    //��shareBox�嵽���ͼƬ��ǰ��,��͸���ȱ�ͣ���ʾ������
    $(".shareBox").insertBefore(this).css("opacity", "0.9").children("shareBar").css("display", "bolck");
}).mouseleave(function () {   //������Ƴ�ͼƬʱ���Ƴ�shareBox
    $(this).children("shareBox").remove();
})
//2 �������������е�more�� ��shareBox�е�shareTo��ʾ�ҿ����л�
$(".more").click(function () {
    $(this).parent().parent().siblings().stop().slideToggle(300);
})

//PartThree ��������
//1 ����ٷ�������video���ӣ���videoBox��ʾ
$(".vedio").click(function () {
    $(".videoBox").show()
})
//3 ���blockItem5,����ƵӰ��
$(".blockItem5 .fullImg").click(function () {
    $(".videoBox").hide();
})
//2 videoBox�������Ų���
//var myPlayer = videojs('my-video');
videojs("my-video").ready(function () {
    var myPlayer = this;
    myPlayer.play();
});



