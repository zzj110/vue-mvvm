var Observer = {}; //定义一个对象 包括三个方法 订阅 发布 退订
(function (_observer) {

    var subListObj = {}, // 回调函数存放的数组
        subId = -1; //订阅者id
    // 发布  传入两个参数 (订阅主题,具体内容)
    _observer.publish = function (subTip, args) {
        if (!subListObj[subTip]) {
            return false;      //判断是否有订阅者
        }

        setTimeout(function () {
            var subscribers = subListObj[subTip],   //定义一个数组用来存储所有订阅者
                len = subscribers ? subscribers.length : 0;

            while (len--) {                          //只要发布者一发布就会遍历所有订阅者，分发信息
                subscribers[len].func(subTip, args);  
            }
        }, 0);

        return true;

    };
    //订阅
    _observer.subscribe = function (subTip, func) {

        if (!subListObj[subTip]) {
            subListObj[subTip] = [];
        }

        var token = (++subId).toString();   //订阅者唯一标识
        subListObj[subTip].push({                //接收信息
            token: token,             
            func: func                      //func不仅是一个动作 数据更新的回调
        });
        // console.log(token)      // => {example1:[0,func]}{example1:[1,func]}
        return token;
    };
    //退订
    _observer.unsubscribe = function (token) {     //退订 传入订阅者的id进行过滤 如果退订就splice删除
        for (var m in subListObj) {
            if (subListObj[m]) {
                for (var i = 0, j = subListObj[m].length; i < j; i++) {
                    if (subListObj[m][i].token === token) {
                        subListObj[m].splice(i, 1);
                        console.log('我' + token + '不吃了')
                        return token;
                    }
                }
            }
        }
        return false;
    };
} (Observer));