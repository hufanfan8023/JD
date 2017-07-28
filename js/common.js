/**
 * Created by hff on 2017/6/15.
 */
    //封装tap点击事件
var itcast = {
    tap: function (dom, callback) {
        if(!dom || typeof dom!="object"){
            return;
        }
        var startX, startY, startTime;
        dom.addEventListener("touchstart", function (e) {
            //判断手指个数
            if (e.targetTouches.length > 1) {
                return;
            }
            //记录开始的时间
            startTime = Date.now();
            //记录手指触摸时的坐标
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        })
        dom.addEventListener("touchend", function (e) {
            //判断手指个数
            if (e.changedTouches.length > 1) {
                return;
            }
            //判断触摸时间
            if(Date.now()-startTime>150){
                return;
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(Math.abs(endX-startX)>6 && Math.abs(endY-startY)>6){
                return;
            }
            callback && callback(e)
        })
    }
}