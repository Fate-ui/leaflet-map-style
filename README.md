# leaflet 地图样式修改 [在线链接](https://fate-ui.github.io/leaflet-map-style/#/home)

# 项目介绍
- 该项目基于leaflet，集成了多个地图源，包括高德地图、百度地图、谷歌地图，并通过css的filter属性实现修改地图样式。

# 地图服务地址
注：数据收集自网络。
- 谷歌卫星：`//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`
- 高德街道：`//webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`
- 百度夜色：`//api.map.baidu.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20191205&scale=1&ak=5ieMMexWmzB9jivTq6oCRX9j&customid=midnight`

# 示例图片
![示例图片](/public/md/img3.png)
![示例图片](/public/md/img.png)
![示例图片](/public/md/img1.png)
![示例图片](/public/md/img2.png)
![示例图片](/public/md/img4.png)
![示例图片](/public/md/img5.png)
![示例图片](/public/md/img6.png)
![示例图片](/public/md/img7.png)

## 开发环境
- `node.js 20.14.0`

## 项目启动

1. 安装依赖

项目是在pnpm下开发的，如果没有安装pnpm，可以使用npm或者yarn代替。如若报错，请[安装pnpm](https://www.pnpm.cn/installation)
后尝试。

```bash
 pnpm install
```

2. 启动项目

```bash
 pnpm run dev
```

3. 打包项目

```bash
 pnpm run build
```
