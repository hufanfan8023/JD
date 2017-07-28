/**
 * Created by hff on 2017/6/13.
 */
$(function () {
    //获取banner
    var banner = $(".jd_banner");
    //获取banner宽度
    var bannerWinth = banner.width();
    //获取图片容器
    var imgBox = $(".jd_bannerImg");
    //获取所有点
    var spots = banner.find("ul:eq(1)").find("li");
    //获取第一个元素
    var first = imgBox.find("li:first-child");
    //获取最后一个元素
    var last = imgBox.find("li:last-child");
    //克隆第一个元素，放入该父节点最后一个子元素后面
    imgBox.append(first.clone());
    //克隆最后一个子元素，放入该父节点的子元素前面
    last.clone().insertBefore(".jd_bannerImg>li:first-child");
    //获取所有li
    var lis = $(".jd_bannerImg>li");
    //所有li的个数
    var count = lis.length;
    //设置所有li标签的宽度 可以用each遍历 或者直接设置都行
    lis.width(bannerWinth);
    //设置图片容器的总宽度与初始偏移值
    imgBox.css({"width":count*bannerWinth,"left":-bannerWinth});
    //设置当前图片的索引
    var index = 1;
    var isOpan = true;
        //这里可以传一个callback 参数 代码就更加严谨，不过加不加无所谓
    function imgAnimate(callback){ //封装进函数里方便随时调用
        imgBox.animate({"left":-index*bannerWinth},400, function () {
            //动画执行完毕后 设置回调函数
            if(index==count-1){
                index=1;
                //将当前图片瞬间移到当前索引
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
    //设置定时器
    function startTime(){
        stopTime = setInterval(function () {
            index++; //每隔一秒自增1
            //设置animate动画函数
            imgAnimate();
        },2000);
    }
    startTime();
    imgBox.on("swipeLeft", function () {//设置手指向左滑动事件
       if(isOpan){
           isOpan = false;
           clearInterval(stopTime); //触摸时清除定时器
           index++; //向左滑动时让索引自增1
           //imgAnimate();
           imgAnimate(function(){
               clearInterval(stopTime);
               startTime();
           }); //开启
       }
    });
    imgBox.on("swipeRight", function () {
       if(isOpan){
           isOpan = false;
           clearInterval(stopTime); //触摸时清除定时器
           index--; //向左滑动时让索引自增1
           //imgAnimate();
           imgAnimate(function(){
               clearInterval(stopTime);
               startTime();
           }); //开启
       }
    })
});