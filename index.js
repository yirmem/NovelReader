// 引入electron模块  
const electron = require('electron');
var http = require('http');
var url = require('url');
var util = require('util');
var cheerio = require('cheerio');
var querystring = require('querystring');
var fs = require('fs');

var urlStr = 'http://www.baidu.com/s?wd='+'放开那个女巫'+'&pn=30&rsv_spt=1&rsv_iqid=0xdd2c31de0003d13c&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=19&rsv_sug1=16&rsv_sug7=100&prefixsug='+'放开那个女巫'+'&rsp=8&inputT=6040&rsv_sug4=7275'

var $ = cheerio.load(fs.readFileSync('index.html'))

$(".content").text('134134342')

var data = {    
    wd:'放开那个女巫', 
    pn:30,
    rsv_spt:1,
    rsv_iqid:'0xdd2c31de0003d13c&issp=1'
};//这是需要提交的数据    
    
    
var content = querystring.stringify(data);    
    
var options = {    
    hostname: 'http://www.baidu.com',    
    port: 80,
    path: '/s?' + content,    
    method: 'GET'    
};    
    
var req = http.request(options, function (res) {    
    console.log('STATUS: ' + res.statusCode);    
    console.log('HEADERS: ' + JSON.stringify(res.headers));    
    res.setEncoding('utf8');    
    res.on('data', function (chunk) {    
        //console.log('BODY: ' + chunk);    
        $('.content').text(chunk)
    });    
});    
    
req.on('error', function (e) {    
    console.log('problem with request: ' + e.message);    
});    
    
req.end(); 

// 用来控制应用的生命周期  
const app = electron.app;

// 用来创建浏览器窗口  
const BrowserWindow = electron.BrowserWindow;

// 创建一个全局变量，名字任意，相当于普通网页的window对象  
let mainWindow;

// 创建浏览器窗口函数
function createWindow() {
   // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width:1200,
    height:800
  })
//加载项目目录下的index.html
mainWindow.loadURL('file://' + __dirname + '/index.html');
// 当窗口被关闭时调用
mainWindow.on('closed', function () {
  // 取消引用window对象，如果你的应用支持多窗口的话，通常
  //  会把多个window对象存放在一个数组里面，与此同时，你应该删除相应的元素。
   mainWindow = null
 })
}
// 当应用触发 ready 事件后，创建浏览器窗口
app.on('ready',function(){
 createWindow();
})

// 当点击关闭时，在dock中保留electron
  app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 点击dock中的electron图标的时候，再次创建窗口
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
