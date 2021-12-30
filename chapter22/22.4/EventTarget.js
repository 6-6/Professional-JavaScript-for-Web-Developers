function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
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
    @params {Object} event 例如：{ type: 'message', message: 'Hello world!' }
    */
    fire: function(event){
        console.log(event);
        if(!event.target){
            event.target = this;
        }

        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0, len=handlers.length; i<len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i=0, len=handlers.length; i<len; i++){
                if(handlers[i] === handler){
                    break;
                }
            }

            handlers.splice(i, 1);
        }
    }
}