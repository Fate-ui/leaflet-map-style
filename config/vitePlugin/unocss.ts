import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export function unocssPlugin() {
  return Unocss({
    presets: [
      presetAttributify({
        /* preset options */
      }),
      presetUno(),
      presetIcons(),
      presetRemToPx({ baseFontSize: 4 }),
    ],
    transformers: [transformerVariantGroup()],
  })
}
