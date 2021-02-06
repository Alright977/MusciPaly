const {series,src,dest,watch} = require('gulp')
const folder = {
    src : 'src/',
    dist : 'dist/'
}
//压缩html的插件
const htmlClearn = require('gulp-htmlclean')
//将less文件转换为css的插件
const less = require('gulp-less')
//将css压缩的插件
const cssClean = require('gulp-clean-css')
//将js压缩的插件
const uglify = require('gulp-uglify')
//将图片压缩的插件
const imageMin = require('gulp-imagemin')
//服务器插件
const connect = require('gulp-connect')
function html(){
    return src(folder.src+'html/*')
    //对html进行压缩
    .pipe(htmlClearn())
    .pipe(dest(folder.dist+'html/'))
    //服务器方法，自动刷新
    .pipe(connect.reload());
}
function css(){
    return src(folder.src+'css/*')
    //将less文件转换css
    .pipe(less())
    //对css文件压缩
    .pipe(cssClean())
    .pipe(dest(folder.dist+'css/'))
    //服务器方法，自动刷新
    .pipe(connect.reload());
}
function js(){
    return src(folder.src+'js/*')
    //将js文件压缩
    .pipe(uglify())
    .pipe(dest(folder.dist+'js/'))
    //服务器方法，自动刷新
    .pipe(connect.reload());
}
function image(){
    return src(folder.src+'image/*')
    //将image文件压缩
    .pipe(imageMin())
    .pipe(dest(folder.dist+'image/'))
    //服务器方法，自动刷新
    .pipe(connect.reload());
}
//给你一个地址和端口，热更新还需要使用watch
function sever(cb){
    //服务器的方法
    connect.server({
        //设置端口
        port : '1573',
        //开启自动刷新
        livereload : true
    })
    cb()
}
//开启任务监听
watch(folder.src + 'html/*',function(cb){
    html()
    cb()
})
watch(folder.src + 'css/*',function(cb){
    css()
    cb()
})
watch(folder.src + 'js/*',function(cb){
    js()
    cb()
})
//把这些任务导出
exports.default = series(html,css,js,image,sever)