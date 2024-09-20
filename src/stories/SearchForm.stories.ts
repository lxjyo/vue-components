import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { SearchForm, SearchFormItem } from '../components'
import { reactive } from 'vue'

const meta = {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  argTypes: {
    gutter: {
      control: {
        type: 'number',
        min: 16
      }
    },
    onSubmit: { action: 'onSubmit' }, // 映射 submit 事件到 actions
    onReset: { action: 'onReset' } // 映射 reset 事件到 actions
  },
  args: {}
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof SearchForm>

const Template = (args: Args) => ({
  components: { SearchForm, SearchFormItem },
  setup() {
    const formData = reactive({
      name: '',
      age: 1,
      value: '',
      long: ''
    })
    const rules = {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        { type: 'number', message: '年龄必须为数字值', trigger: ['blur', 'change'] }
      ]
    }
    return {
      args,
      formData,
      rules
    }
  },
  template: `
    <SearchForm v-bind="args" :model="formData" :rules="rules" @submit="args.onSubmit" @reset="args.onReset">
      <SearchFormItem label="姓名" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </SearchFormItem>
      <SearchFormItem label="年龄" name="age">
        <a-input v-model:value="formData.age" placeholder="请输入年龄" />
      </SearchFormItem>
      <SearchFormItem label="表单项3" name="value">
        <a-input v-model:value="formData.value" />
      </SearchFormItem>
      <SearchFormItem label="表单项4" name="long" :span="2">
        <a-input v-model:value="formData.long" />
      </SearchFormItem>
    </SearchForm>
  `
})

// 各种状态的 Stories
export const SearchFormDefault = Template.bind({}) as Story
SearchFormDefault.args = {}

// 默认的搜索表单示例
export const SearchFormWidth = Template.bind({}) as Story
SearchFormWidth.args = {
  width: 320,
  labelWidth: 80
}

// 没有按钮的搜索表单
export const SearchFormNoButtons = Template.bind({}) as Story
SearchFormNoButtons.args = {
  showBtns: false
}

// 有加载状态的表单
export const SearchFormLoading = Template.bind({}) as Story
SearchFormLoading.args = {
  loading: true
}

// 自定义按钮
export const WithCustomButtonText = Template.bind({}) as Story
WithCustomButtonText.decorators = [
  () => ({
    components: { SearchForm, SearchFormItem },
    template: `
      <SearchForm>
        <SearchFormItem label="表单项1">
          <a-input placeholder="Custom Input" />
        </SearchFormItem>
        <SearchFormItem label="表单项2" :span="2">
          <a-select placeholder="Custom Select">
            <a-select-option value="1">Option 1</a-select-option>
            <a-select-option value="2">Option 2</a-select-option>
          </a-select>
        </SearchFormItem>
        <template #btns>
          <a-button type="primary">Submit</a-button>
          <a-button>Reset</a-button>
        </template>
      </SearchForm>
    `
  })
]

// 额外按钮
export const WithExtraButton = Template.bind({}) as Story
WithExtraButton.decorators = [
  () => ({
    components: { SearchForm, SearchFormItem },
    template: `
      <SearchForm>
        <SearchFormItem label="表单项1">
          <a-input placeholder="Custom Input" />
        </SearchFormItem>
        <SearchFormItem label="表单项2" :span="2">
          <a-select placeholder="Custom Select">
            <a-select-option value="1">Option 1</a-select-option>
            <a-select-option value="2">Option 2</a-select-option>
          </a-select>
        </SearchFormItem>
        <template #extra>
          <a-button type="primary">新建</a-button>
        </template>
      </SearchForm>
    `
  })
]
