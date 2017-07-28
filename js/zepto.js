/**
 * Created by hff on 2017/6/13.
 */
$(function () {
    //��ȡbanner
    var banner = $(".jd_banner");
    //��ȡbanner���
    var bannerWinth = banner.width();
    //��ȡͼƬ����
    var imgBox = $(".jd_bannerImg");
    //��ȡ���е�
    var spots = banner.find("ul:eq(1)").find("li");
    //��ȡ��һ��Ԫ��
    var first = imgBox.find("li:first-child");
    //��ȡ���һ��Ԫ��
    var last = imgBox.find("li:last-child");
    //��¡��һ��Ԫ�أ�����ø��ڵ����һ����Ԫ�غ���
    imgBox.append(first.clone());
    //��¡���һ����Ԫ�أ�����ø��ڵ����Ԫ��ǰ��
    last.clone().insertBefore(".jd_bannerImg>li:first-child");
    //��ȡ����li
    var lis = $(".jd_bannerImg>li");
    //����li�ĸ���
    var count = lis.length;
    //��������li��ǩ�Ŀ�� ������each���� ����ֱ�����ö���
    lis.width(bannerWinth);
    //����ͼƬ�������ܿ�����ʼƫ��ֵ
    imgBox.css({"width":count*bannerWinth,"left":-bannerWinth});
    //���õ�ǰͼƬ������
    var index = 1;
    var isOpan = true;
        //������Դ�һ��callback ���� ����͸����Ͻ��������Ӳ�������ν
    function imgAnimate(callback){ //��װ�������﷽����ʱ����
        imgBox.animate({"left":-index*bannerWinth},400, function () {
            //����ִ����Ϻ� ���ûص�����
            if(index==count-1){
                index=1;
                //����ǰͼƬ˲���Ƶ���ǰ����
                imgBox.css("left",-index*bannerWinth)
            }else if(index == 0){
                index = count-2;
                imgBox.css("left",-index*bannerWinth)
            }
            spots.removeClass("spot").eq(index-1).addClass("spot");
           /* clearInterval(stopTime);
            startTime();*/
            if(callback){
                callback();
                setTimeout(function () {
                    isOpan = true;
                },500)
            }
        })
    }
    var stopTime;
    //���ö�ʱ��
    function startTime(){
        stopTime = setInterval(function () {
            index++; //ÿ��һ������1
            //����animate��������
            imgAnimate();
        },2000);
    }
    startTime();
    imgBox.on("swipeLeft", function () {//������ָ���󻬶��¼�
       if(isOpan){
           isOpan = false;
           clearInterval(stopTime); //����ʱ�����ʱ��
           index++; //���󻬶�ʱ����������1
           //imgAnimate();
           imgAnimate(function(){
               clearInterval(stopTime);
               startTime();
           }); //����
       }
    });
    imgBox.on("swipeRight", function () {
       if(isOpan){
           isOpan = false;
           clearInterval(stopTime); //����ʱ�����ʱ��
           index--; //���󻬶�ʱ����������1
           //imgAnimate();
           imgAnimate(function(){
               clearInterval(stopTime);
               startTime();
           }); //����
       }
    })
});