我的第一个个人博客系统

1.前端使用VUE+museUi框架搭建的页面（有点简陋）

2.后端使用的是NODE的Express框架 + Mysql数据库搭建

#使用方法 ###1.blog文件夹，在此文件是vue的文件夹

a.在此文件夹下面执行npm install

b.在webpack.config.js文件里面，修改devServer属性里面的代理参数proxy，设置你想要代理的地址以及端口号

c.执行npm run dev

###2.blogServer文件夹，在此文件是后端的文件夹

a.在此文件夹下面执行npm install

b.修改db.js文件是连接数据库的配置，修改成你的数据库连接配置

c.执行npm start
