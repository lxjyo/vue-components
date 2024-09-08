import ModalForm from './ModalForm/index.js';
import SearchFormWithInstall, { SearchFormItem } from './SearchForm/index.js';
import { createPlugin } from './helpers.js';

var components = [ModalForm, SearchFormWithInstall, SearchFormItem];
var Plugin = createPlugin(components);

export { ModalForm, Plugin, SearchFormWithInstall as SearchForm, SearchFormItem };
