<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@/plugins/BDLayer'

const mapLayersLight = {
  '谷歌高德杂交/卫星': {
    layer: L.layerGroup([
      L.tileLayer('//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        minZoom: 3,
        attribution: '谷歌提供卫星图，高德提供街道图',
      }),
      L.tileLayer('//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        maxNativeZoom: 18,
        minZoom: 3,
        attribution: '谷歌提供卫星图，高德提供街道图',
        subdomains: '1234',
        opacity: 0.5,
      }),
    ]),
  },
  '高德/卫星': {
    layer: L.layerGroup([
      L.tileLayer('//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        maxNativeZoom: 18,
        minZoom: 3,
        attribution: '高德地图 AutoNavi.com',
        subdomains: '1234',
      }),
      L.tileLayer('//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        maxNativeZoom: 18,
        minZoom: 3,
        attribution: '高德地图 AutoNavi.com',
        subdomains: '1234',
        opacity: 0.5,
      }),
    ]),
  },
  '高德/街道': {
    //wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}
    //webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}
    layer: L.tileLayer('//webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      maxNativeZoom: 18,
      minZoom: 3,
      attribution: '高德地图 AutoNavi.com',
      subdomains: '1234',
    }),
  },
  '谷歌/卫星': {
    layer: L.tileLayer('//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      minZoom: 3,
      attribution: '谷歌 Google.cn',
    }),
  },
  '谷歌/街道': {
    layer: L.tileLayer('//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      minZoom: 3,
      attribution: '谷歌 Google.cn',
    }),
  },
  '百度/黄色': {
    layer: L.tileLayer('http://api0.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20191205&scale=1&ak=5ieMMexWmzB9jivTq6oCRX9j', {
      tileSize: 256,
      maxZoom: 17,
      tms: true,
      minZoom: 3,
    }),
  },

  // '智图/街道': {
  //   layer: L.tileLayer('//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}', {
  //     maxZoom: 20,
  //     maxNativeZoom: 16,
  //     minZoom: 3,
  //     attribution: '智图 GeoQ.cn',
  //   }),
  // },
}

const filter = ref('')
const mapLayersDark = {
  '百度/夜色': {
    layer: L.tileLayer('//api.map.baidu.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20191205&scale=1&ak=5ieMMexWmzB9jivTq6oCRX9j&customid=midnight', {
      tileSize: 256,
      maxZoom: 17,
      tms: true,
      minZoom: 3,
    }),
  },

  '高德/街道-暗色1': {
    layer: L.tileLayer('//wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      maxNativeZoom: 18,
      minZoom: 3,
      attribution: '高德地图 AutoNavi.com',
      subdomains: '1234',
    }),
    filter: 'invert(82%) sepia(100%) hue-rotate(190deg) saturate(400%)',
  },
  '高德/街道-暗色2': {
    layer: L.tileLayer('//wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      maxNativeZoom: 18,
      minZoom: 3,
      attribution: '高德地图 AutoNavi.com',
      subdomains: '1234',
    }),
    filter: 'brightness(0.88) contrast(1.22) grayscale(0) hue-rotate(360deg) opacity(1) saturate(1.1) sepia(0.54) invert(0.9)',
  },
  '高德/街道-暗色3': {
    layer: L.tileLayer('//wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=7&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      maxNativeZoom: 18,
      minZoom: 3,
      attribution: '高德地图 AutoNavi.com',
      subdomains: '1234',
    }),
    filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
  },
}

const type = ref('谷歌高德杂交/卫星')

onMounted(() => {
  changeLayer(type.value, mapLayersLight)
})

const crs = ref(L.CRS.EPSG3857)
let map: L.Map
function init() {
  // 使用 id 为 map 的 div 容器初始化地图，同时指定地图的中心点和缩放级别
  map = L.map('map', {
    center: [30.505399066242695, 103.62545013427736],
    zoom: 13,
    crs: crs.value,
  })
}

const showMap = ref(true)
function changeLayer(name: string, mapLayer: Record<string, { layer: L.Layer; filter?: string }>) {
  filter.value = mapLayer[name].filter || ''
  const isBaidu = name.includes('百度')
  crs.value = isBaidu ? L.CRS.Baidu : L.CRS.EPSG3857
  showMap.value = false
  map?.eachLayer((layer) => {
    map.removeLayer(layer)
  })
  nextTick(() => {
    showMap.value = true
    nextTick(() => {
      init()
      mapLayer[name].layer.addTo(map)
    })
  })
}
</script>

<template>
  <div v-if="showMap" id="map" class="w-screen h-screen" />
  <div class="fixed z-999 right-20 top-20">
    <el-popover width="fit-content" trigger="click" placement="left">
      <template #reference>
        <el-button type="primary">更换地图</el-button>
      </template>
      <section>
        <div>
          <header class="h-40" text="black center 20">浅色</header>
          <el-radio-group v-model="type" @change="changeLayer($event, mapLayersLight)">
            <el-radio v-for="(layer, label) in mapLayersLight" :key="label" :value="label" border>{{ label }}</el-radio>
          </el-radio-group>
        </div>
        <div class="mt-20">
          <header class="h-40" text="black center 20">深色</header>
          <el-radio-group v-model="type" @change="changeLayer($event, mapLayersDark)">
            <el-radio v-for="(layer, label) in mapLayersDark" :key="label" :value="label" border>{{ label }}</el-radio>
          </el-radio-group>
        </div>
      </section>
    </el-popover>
  </div>
</template>

<style lang="scss">
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  //filter: invert(82%) sepia(100%) hue-rotate(190deg) saturate(400%);
  //filter: brightness(0.88) contrast(1.22) grayscale(0) hue-rotate(360deg) opacity(1) saturate(1.1) sepia(0.54) invert(0.9);
  //filter: grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%);
  filter: v-bind(filter);
}
</style>
