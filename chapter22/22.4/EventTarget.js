function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    /* 
    绑定一个自定义事件，本质意义上是将事件处理程序，形成队列放入handlers对象中type数组
    @params {String} type 自定义事件类型名称
    @params {Function} handler 自定义事件处理方法
    */
    addHandler: function(type, handler){
        if(typeof this.handlers[type] == 'undefined'){
            this.handlers[type] = [];
        }
        
        this.handlers[type].push(handler);
    },
    /* 
    触发事件
    @params {Object} event 事件对象 类似原生的event事件
    > @params {String} type 事件类型，例如原生click事件
    > @params {String} message 事件消息
    */
    fire: function(event){
        //为什么要将this赋值在target属性中？因为这里模拟的是原生事件对象event.target
        if(!event.target){
            event.target = this;
        }

        //通过当前函数传的event.type匹配this.handlers[]，是否存在绑定的事件
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0, len=handlers.length; i<len; i++){
                //调用事件处理函数
                handlers[i](event);
            }
        }
    },
    /* 
    移除事件
    @params {String} type 自定义事件类型名称
    @params {Function} handler 自定义事件处理方法
    */
    removeHandler: function(type, handler){
        //判断是否有要移除的事件
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i=0, len=handlers.length; i<len; i++){
                //存在相等的事件处理函数，break的意义在于保持i的值
                if(handlers[i] === handler){
                    break;
                }
            }

            //移除handlers某个对象
            handlers.splice(i, 1);
        }
    }
}