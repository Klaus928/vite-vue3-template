# 高家梁辅运系统

- 更改 Logo 可直接替换打包后的 logo.png，要保证文件名一致
- 修改标题，进入源码修改 public/config.json 的 title， 修改之后要重新打包

下面是打包后的目录

```
|-- dist
    |-- config.json
    |-- favicon.ico
    |-- index.html
    |-- logo.png
    |-- static
        |-- element-icons-9c88a535.woff
        |-- element-icons-de5eb258.ttf
        |-- index-00ad5daa.css
        |-- index-9c654afa.css
        |-- index-a9cdc335.css
        |-- red-alarm-4eef65a6.svg
        |-- yellow-alarm-6332fd27.svg
        |-- 交换机-a2015dcc.png
        |-- 交换机@2x-df9bf4ba.png
        |-- 电源箱-85a198ab.png
        |-- 电源箱@2x-8077f964.png
        |-- 设备-65cce613.png
        |-- 设备@2x-58bac150.png
        |-- js
            |-- index.js
            |-- index2.js
            |-- index3.js
            |-- vendor.js

```

打包

```
npm run build
```

查看

```
npm run serve
```
