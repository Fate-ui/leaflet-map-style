!(function (t) {
  let o, e
  if ('function' == typeof define && define.amd) define(['leaflet', 'proj4'], t)
  else if ('object' == typeof module && 'object' == typeof module.exports) (o = require('leaflet')), (e = require('proj4')), (module.exports = t(o, e))
  else {
    if ('undefined' == typeof window.L || 'undefined' == typeof window.proj4) throw 'Leaflet and proj4 must be loaded first'
    t(window.L, window.proj4)
  }
})((t, o) => {
  return (
    (t.Proj = {}),
    (t.Proj._isProj4Obj = function (t) {
      return 'undefined' != typeof t.inverse && 'undefined' != typeof t.forward
    }),
    (t.Proj.Projection = t.Class.extend({
      initialize(o, e, i) {
        const n = t.Proj._isProj4Obj(o)
        ;(this._proj = n ? o : this._projFromCodeDef(o, e)), (this.bounds = n ? e : i)
      },
      project(o) {
        const e = this._proj.forward([o.lng, o.lat])
        return new t.Point(e[0], e[1])
      },
      unproject(o, e) {
        const i = this._proj.inverse([o.x, o.y])
        return new t.LatLng(i[1], i[0], e)
      },
      _projFromCodeDef(t, e) {
        if (e) o.defs(t, e)
        else if (void 0 === o.defs[t]) {
          const i = t.split(':')
          if ((i.length > 3 && (t = `${i[i.length - 3]}:${i[i.length - 1]}`), void 0 === o.defs[t])) throw `No projection definition for code ${t}`
        }

        return o(t)
      },
    })),
    (t.Proj.CRS = t.Class.extend({
      includes: t.CRS,
      options: { transformation: new t.Transformation(1, 0, -1, 0) },
      initialize(o, e, i) {
        let n, s, r, a
        if (
          (t.Proj._isProj4Obj(o)
            ? ((s = o), (n = s.srsCode), (a = e || {}), (this.projection = new t.Proj.Projection(s, a.bounds)))
            : ((n = o), (r = e), (a = i || {}), (this.projection = new t.Proj.Projection(n, r, a.bounds))),
          t.Util.setOptions(this, a),
          (this.code = n),
          (this.transformation = this.options.transformation),
          this.options.origin && (this.transformation = new t.Transformation(1, -this.options.origin[0], -1, this.options.origin[1])),
          this.options.scales)
        )
          this._scales = this.options.scales
        else if (this.options.resolutions) {
          this._scales = []
          for (let l = this.options.resolutions.length - 1; l >= 0; l--) this.options.resolutions[l] && (this._scales[l] = 1 / this.options.resolutions[l])
        }

        this.infinite = !this.options.bounds
      },
      scale(t) {
        let o,
          e,
          i,
          n,
          s = Math.floor(t)
        return t === s ? this._scales[t] : ((o = this._scales[s]), (e = this._scales[s + 1]), (i = e - o), (n = t - s), o + i * n)
      },
      zoom(t) {
        let o,
          e,
          i,
          n = this._closestElement(this._scales, t),
          s = this._scales.indexOf(n)
        return t === n ? s : ((e = s + 1), (o = this._scales[e]), void 0 === o ? 1 / 0 : ((i = o - n), (t - n) / i + s))
      },
      distance: t.CRS.Earth.distance,
      R: t.CRS.Earth.R,
      _closestElement(t, o) {
        for (var e, i = t.length; i--; ) t[i] <= o && (void 0 === e || e < t[i]) && (e = t[i])
        return e
      },
    })),
    (t.Proj.GeoJSON = t.GeoJSON.extend({
      initialize(o, e) {
        ;(this._callLevel = 0), t.GeoJSON.prototype.initialize.call(this, o, e)
      },
      addData(o) {
        let e
        o &&
          (o.crs && 'name' === o.crs.type
            ? (e = new t.Proj.CRS(o.crs.properties.name))
            : o.crs && o.crs.type && (e = new t.Proj.CRS(`${o.crs.type}:${o.crs.properties.code}`)),
          void 0 !== e &&
            (this.options.coordsToLatLng = function (o) {
              const i = t.point(o[0], o[1])
              return e.projection.unproject(i)
            })),
          this._callLevel++
        try {
          t.GeoJSON.prototype.addData.call(this, o)
        } finally {
          this._callLevel--, 0 === this._callLevel && delete this.options.coordsToLatLng
        }
      },
    })),
    (t.Proj.geoJson = function (o, e) {
      return new t.Proj.GeoJSON(o, e)
    }),
    (t.Proj.ImageOverlay = t.ImageOverlay.extend({
      initialize(o, e, i) {
        t.ImageOverlay.prototype.initialize.call(this, o, null, i), (this._projectedBounds = e)
      },
      _animateZoom(o) {
        const e = this._map.getZoomScale(o.zoom),
          i = t.point(this._projectedBounds.min.x, this._projectedBounds.max.y),
          n = this._projectedToNewLayerPoint(i, o.zoom, o.center)
        t.DomUtil.setTransform(this._image, n, e)
      },
      _reset() {
        const o = this._map.getZoom(),
          e = this._map.getPixelOrigin(),
          i = t.bounds(this._transform(this._projectedBounds.min, o)._subtract(e), this._transform(this._projectedBounds.max, o)._subtract(e)),
          n = i.getSize()
        t.DomUtil.setPosition(this._image, i.min), (this._image.style.width = `${n.x}px`), (this._image.style.height = `${n.y}px`)
      },
      _projectedToNewLayerPoint(t, o, e) {
        const i = this._map.getSize()._divideBy(2),
          n = this._map.project(e, o)._subtract(i)._round(),
          s = n.add(this._map._getMapPanePos())
        return this._transform(t, o)._subtract(s)
      },
      _transform(t, o) {
        const e = this._map.options.crs,
          i = e.transformation,
          n = e.scale(o)
        return i.transform(t, n)
      },
    })),
    (t.Proj.imageOverlay = function (o, e, i) {
      return new t.Proj.ImageOverlay(o, e, i)
    }),
    t.Proj
  )
})
//# sourceMappingURL=proj4leaflet.min.js.map
