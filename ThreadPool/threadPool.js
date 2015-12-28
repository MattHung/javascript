/**
 * Created by matt1201 on 2015/12/16.
 */

function ThreadPool(size, script)
{
    this.size=size;
    this.script=script;
    this.pool=[];

    this.tasks=[];

    this.init = function(){
        for(var i=0; i<this.size; i++) {
            var thread=new Thread(this, this.script);
            thread.init();
            this.pool.push(thread);
        }
    }

    this.addTask = function(task){
        this.tasks.push(task);
    }

    this.getTask = function(){

        if(this.tasks.length<=0)
            return null;
        return this.tasks.shift();
    }
}

function Thread(threadPool, script){

    var _this=this;

    _this.threadPool = threadPool;
    _this.script = script;
    _this.worker;

    this.init = function() {
        _this.worker = new Worker(script);
        _this.worker.addEventListener('message', dummyCallback, false);
        _this.worker.postMessage(null);
    };

    function dummyCallback(event) {
        var task = _this.threadPool.getTask();

        if (task != null) {
            console.log("before dummyCallback");
            task.callback(task.startMessage);
            console.log("after dummyCallback");
        }
    }
}


function Task(callback, msg) {
    this.callback = callback;
    this.startMessage = msg;
};