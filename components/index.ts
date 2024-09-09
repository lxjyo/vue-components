import ModalForm from './ModalForm'
import SearchForm, { SearchFormItem } from './SearchForm'
import { createPlugin } from './helpers'
export { default as ModalForm } from './ModalForm'
export { default as SearchForm, SearchFormItem } from './SearchForm'

const components = [ModalForm, SearchForm, SearchFormItem]

export const install = createPlugin(components)
