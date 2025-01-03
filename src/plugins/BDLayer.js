import L from 'leaflet'
import '@/plugins/proj4'
import '@/plugins/proj4leaflet'

//请引入 proj4.js 和 proj4leaflet.js
L.CRS.Baidu = new L.Proj.CRS(
  'EPSG:900913',
  '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  {
    resolutions: (function () {
      const level = 19
      const res = []
      res[0] = 2 ** 18
      for (let i = 1; i < level; i++) {
        res[i] = 2 ** (18 - i)
      }

      return res
    })(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
  }
)
