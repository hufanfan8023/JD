/**
 * Created by hff on 2017/6/15.
 */
    //��װtap����¼�
var itcast = {
    tap: function (dom, callback) {
        if(!dom || typeof dom!="object"){
            return;
        }
        var startX, startY, startTime;
        dom.addEventListener("touchstart", function (e) {
            //�ж���ָ����
            if (e.targetTouches.length > 1) {
                return;
            }
            //��¼��ʼ��ʱ��
            startTime = Date.now();
            //��¼��ָ����ʱ������
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        })
        dom.addEventListener("touchend", function (e) {
            //�ж���ָ����
            if (e.changedTouches.length > 1) {
                return;
            }
            //�жϴ���ʱ��
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