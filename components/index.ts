import ModalForm from './ModalForm'
import SearchForm, { SearchFormItem } from './SearchForm'
import { createPlugin } from './helpers'
const components = [ModalForm, SearchForm, SearchFormItem]

export const Plugin = createPlugin(components)

export { ModalForm, SearchForm, SearchFormItem }
