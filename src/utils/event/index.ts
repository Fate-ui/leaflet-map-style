import mitt from 'mitt'
import type { Emitter } from 'mitt'

type Events = {}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
