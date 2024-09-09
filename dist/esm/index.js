import ModalForm from './ModalForm/index.js';
import SearchFormWithInstall, { SearchFormItem } from './SearchForm/index.js';
import { createPlugin } from './helpers.js';

var components = [ModalForm, SearchFormWithInstall, SearchFormItem];
var install = createPlugin(components);

export { ModalForm, SearchFormWithInstall as SearchForm, SearchFormItem, install };
