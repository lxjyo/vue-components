import './index.vue.js';
import { withInstall } from '../helpers.js';
import script from './index.vue2.js';

var index = withInstall(script);

export { index as default };
