(function(root){
    function AudioManage(){
        //创建一个audio实例
        this.audio = new Audio(),
        //歌曲的默认状态暂停
        this.status = 'play'
    }
    AudioManage.prototype = {
        //加载音乐
        load(src){
            this.audio.src = src
            //音乐实例上的方法加载音乐
            this.audio.load()
        },

        //播放音乐
        play(){
            //播放音乐实例
            this.audio.play()
            //播放音乐后状态为播放
            this.status = 'play'
        },

        //暂停音乐
        pause(){
            this.audio.pause()
            this.status = 'pause'
        },

        //音乐播放完事件
        end(fn){
            this.audio.onended = fn
        },

        //跳到音乐的某个时间点
        playTo(time){
            this.audio.currentTime = time
        },
    }
    //把这些实例暴露出去
    root.music = new AudioManage()
})(window.player || (window.player = {}))