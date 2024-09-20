import { createPlugin } from './helpers'
import * as components from './components'
export * from './components'

export const install = createPlugin(Object.values(components))
