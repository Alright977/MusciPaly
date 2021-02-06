(function(root){
    //需要接收的一个数据的长度
    function Index(len){
        this.index = 0,
        this.len = len
    }
    Index.prototype = {
        //把得到的上一首歌曲索引返回
        last(){
            return this.get(-1)
        },
        //下一首切换的索引返回
        next(){
            return this.get(1)
        },
        //val传一个-1或者1
        get(val){
            //这个公式可以让切换的索引到最小和最大变换，解决切换循环的问题
            this.index = (this.index + val + this.len) % this.len
            return this.index
        }
    }

    //把这个方法暴露,get对象需要传参数，不使用New
    root.indexControl = Index
})(window.player || (window.player = ''))
//=的优先级没有||的大，()是用来解决优先级的问题