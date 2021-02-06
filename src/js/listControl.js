(function(root){
    function listControl(data,wrap){
        //创建dom
        let list = document.createElement('div')
        let dl = document.createElement('dl')
        let dt = document.createElement('dt')
        let colse = document.createElement('div')
        let musiclist = []
        
        //添加样式
        list.className = 'list'
        dt.innerHTML = '歌曲列表'
        colse.className = 'colse'
        colse.innerHTML = '关闭'
        
        dl.appendChild(dt)
        //根据歌曲数据的长度创建dd
        data.forEach(function(item,index){
            let dd = document.createElement('dd')
            //dd列表的名字就是数据里面的名字
            dd.innerHTML = item.name
            dl.appendChild(dd)

            musiclist.push(dd)
        })
        
        //插入元素
        list.appendChild(dl)
        list.appendChild(colse)
        wrap.appendChild(list)

        
        //列表显示
        function listUp(){
            list.style.transition = '.2s'
            list.style.transform = 'translateY(0)'
        }

        //列表不显示
        function listDown(){
            list.style.transition = '.2s'
            list.style.transform = 'translateY('+listHeight+'px)'
        }

        //获取到列表的高度
        let listHeight = list.offsetHeight
        
        //隐藏列表
        colse.addEventListener('touchend',function(){
           listDown()
        })

        //选中切换的歌曲
        function changeDown(index){
            console.log(musiclist)
            for(let i = 0;i < musiclist.length;i++){
                musiclist[i].className = ''
            }
            musiclist[index].className = 'active'
        }
        
        //默认选取第一张
        // changeDown(0)
        //把方法丢出去，index的list下就有这个方法
        return {
            listDown:listDown,
            listUp:listUp,
            changeDown:changeDown,
            musiclist:musiclist
        }
    }


    //暴露对象
    root.listControl = listControl
})(window.player || (window.player = ''))