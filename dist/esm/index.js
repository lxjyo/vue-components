import { createPlugin } from './helpers.js';
import * as components from './components.js';
export { default as SearchForm, SearchFormItem } from './SearchForm/index.js';
export { default as ModalForm } from './ModalForm/index.js';

var install = createPlugin(Object.values(components));

export { install };
