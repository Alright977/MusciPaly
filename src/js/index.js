(function($,player){
    function MusicPlayer(dom){
        this.wrap = dom
        this.dataList = []
        this.rotateTime = null
        this.indexObj = null
        this.list = null
        this.playIndex = 0
    }
    MusicPlayer.prototype = {
        //初始化
        init(){
            this.getDom()
            this.getData('../mock/data.json')
        },
        //获取图片和按钮
        getDom(){
            this.singerImg = document.querySelector('.songImg img')
            this.menuBtn = document.querySelectorAll('.control li')
            console.log(this.singerImg,this.menuBtn)
        },
        //获取数据
        getData(url){
            let This = this
            $.ajax({
                url:url,
                method : 'get',
                success:function(data){
                    //请求来拿出数据
                    This.dataList = data
                    This.listPlay()
                    //new一个索引切歌循环
                    This.indexObj =  new player.indexControl(This.dataList.length)
                    This.loadMusic(This.indexObj.index)
                    This.playMusic()
                    
                },
                error:function(){
                    console.log('数据请求失败')
                }
            })
        },
        //加载音乐
        loadMusic(index){
            //渲染图片和歌曲下信息
            player.render(this.dataList[index])
            player.music.load(this.dataList[index].audioSrc)
            //播放歌曲
            if(player.music.status= 'play'){
                player.music.play()
                this.menuBtn[2].className = 'playing'
                this.rotateImg(0)
            }

            //加载哪个音乐的索引，把样式放在哪个音乐上
            this.list.changeDown(index)

            //当前播放的音乐索引为加载音乐传的索引
            this.playIndex = index
        },

        //控制音乐
        playMusic(){
            //上一首
            let This = this
            this.menuBtn[1].addEventListener('touchend',function(){
                player.music.status = 'play'
                This.loadMusic(This.indexObj.last())
            })
        
            //下一首
            this.menuBtn[3].addEventListener('touchend',function(){
                player.music.status = 'play'
                This.loadMusic(This.indexObj.next())
            })
        

            //播放暂停
            this.menuBtn[2].addEventListener('touchend',function(){
                if(player.music.status == 'play'){
                    player.music.pause()
                    this.className = ''
                    This.rotateStop()
                }
                else{
                    console.log('a')
                    player.music.play()
                    this.className = 'playing'
                    let deg = This.singerImg.dataset.rotate || 0;
                    This.rotateImg(deg)
                }
            })
        },

        //图片旋转
        rotateImg(deg){
            let This = this
            clearInterval(this.rotateTimer)
            
            this.rotateTimer = setInterval(function(){
                deg = +deg + 0.2
                This.singerImg.style.transform = 'rotate('+ deg +'deg)'
                //把已经旋转的角度存储在标签上
                This.singerImg.dataset.rotate = deg
            },1000/60)
        },

        //停止旋转
        rotateStop(){
            clearInterval(this.rotateTimer)
        },

        //菜单切歌
        listPlay(){
            let This =this
            //执行列表菜单模块赋值给this.list
            this.list = player.listControl(this.dataList,this.wrap)
            //给菜单按钮绑定下显示事件
            this.menuBtn[4].addEventListener('touchend',function(){
                This.list.listUp()
            })

            //菜单列表歌曲切换事件
            this.list.musiclist.forEach(function(item,index){
                item.addEventListener('touchend',function(){
                    if(This.playIndex == index){
                        return;
                    }
                    player.music.status == 'play'
                    console.log(This.list)
                    This.playIndex = index
                    This.loadMusic(index)
                    This.list.listDown()
                  })
            })
        }
     }
    let musicPlayer = new MusicPlayer(document.getElementById('wraper'))
    musicPlayer.init()
  
})(window.Zepto,window.player)