import SearchForm from './index.vue'
import { withInstall } from '../helpers'
const SearchFormWithInstall = withInstall(SearchForm)
export const SearchFormItem = withInstall(SearchForm.Item)
export default SearchFormWithInstall
