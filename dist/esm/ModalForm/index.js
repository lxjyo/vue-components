import './index.vue.js';
import { withInstall } from '../helpers.js';
import script from './index.vue2.js';

var ModalForm = withInstall(script);

export { ModalForm as default };
