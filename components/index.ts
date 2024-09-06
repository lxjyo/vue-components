import ModalForm from './ModalForm.vue'
import SearchForm, { SearchFormItem } from './SearchForm.vue'
import { createPlugin } from './helpers'
const components = [ModalForm, SearchForm]

export const Plugin = createPlugin(components)

export { ModalForm, SearchForm, SearchFormItem }
