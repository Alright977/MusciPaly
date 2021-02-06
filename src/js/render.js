//渲染图片，音乐信息，是否喜欢
(function(root){
//渲染图片
    function renderImg(src){
        root.blurImg(src)
        let img = document.querySelector('.songImg img')
        img.src = src
    }
    //渲染音乐信息
    function renderSonger(data){
        let songer = document.querySelector('.songer').children;
        songer[0].innerHTML = data.name
        songer[1].innerHTML = data.singer
        songer[2].innerHTML = data.album
}
    //渲染是否喜欢
    function renderIslike(isLike){
        let isL = document.querySelectorAll('.control li')
        isL[0].className = isLike? 'liking' : ''
    }

    //把这些方法暴露出去
    root.render = function(data){
        renderImg(data.image)
        renderSonger(data)
        renderIslike(data.isLike)
    }
    })(window.player || (window.player = {}))