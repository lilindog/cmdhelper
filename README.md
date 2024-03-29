# 编写命令行程序辅助工具

见过很多库，但他们都有依赖其他包，说到底就想自己研究下底层实现原理。  
不求万金油，简单稳定能用就成。   

***

## 测试用例
需要事先全局安装好mocha  
运行 ```npm test``` 即可

***

## 使用场景示例

### 1. 打印选项获取结果
```js
const { select } = require("cmdhelper");

//promise写法
!async function () {
    const res = await select("您喜欢的歌手是那个：", [
        {label: "周杰伦"},
        {label: "林俊杰"},
        {label: "by2"},
        {label: "蔡依林"},
        {label: "王蓉"},
    ]);
    console.log("您选择的是：" + res.label);
}();

//回调写法
select("您喜欢的歌手是那个：", [
        {label: "周杰伦"},
        {label: "林俊杰"},
        {label: "by2"},
        {label: "蔡依林"},
        {label: "王蓉"},
], (err, res) =>{
    if (err) {
        console.log(err);
    } else {
        console.log("您选择的是：" + res.label);
    }
});
```
效果示例：   
![](./doc/img/select.gif)

### 2. 打印确定询问
```js
const { confirm } = require("cmdhelper");

//promise写法（仅支持这种写法）
!async function () {
    const is = await confirm("您确定要买这条辣条吗？", {confirmText: "确定", cancelText: "取消"});
    console.log("您选择的是：" + is);
}();
```
效果示例：   
![](./doc/img/confirm.gif)

### 3. 打印加载动画
```js
const { loading } = require("cmdhelper");

const { stop: done, info } = loading("正在下载AV");
setTimeout(() => {
    done("您的AV下载完成");
}, 5000);
```
效果示例：   
![](./doc/img/loading.gif)

### 4. 进度条
```js
const cmdhelper = require("cmdhelper");
const {
    done,
    step
} = cmdhelper.progress(50);
let 
index = 0,
t = setInterval(() => {
    index ++;
    if (index >= 100) {
        //这里用step（）也可以，只要传参大于等于100就会完成进度条并不再受控
        done(["下载完成！"]);
        clearInterval(t);
    } else {
        step(index, [`当前进度：${index}%`]);
    }
}, 200);    
```
效果示例：   
![](./doc/img/progress.gif)

### 5. 多选框
```js
//promise写法
!async function () {
    const res = await cmdhelper.checkbox(
        "多选标题：",
        [
            {label: "选项1"},
            {label: "选项2"}
        ]
    );
    console.log(res);
}();

//回调函数写法
cmdhelper.chekbox(
    "多选标题：",
    [
        {label: "选项1"},
        {label: "选项2"}
    ],
    res => {
        console.log(res);
    }
);
```
效果示例：   
![](../cmdhelper/doc/img/checkbox.gif)

***

## 命令行工具

这里边提供了一个命令行工具，能够声明参数自动校验。  
参数声明模板语法请看[这里](./lib/cmd/README.md)

示例：   
```js
const { cmd } = require("cmdhelper");

cmd([
    "<-n, name> string `输入的名字`"
], params => {
    console.log(params);
})
```
命令行运行：   
```bash
node index.js -n 王德发
```
输出：   
> {name: "王德发"}

