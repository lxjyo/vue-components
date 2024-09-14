import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ModalForm } from 'antd-vue-components'
import { reactive, ref, watch } from 'vue'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/ModalForm',
  component: ModalForm,
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    labelCol: {
      control: { type: 'object' }
    }
  },
  args: {}
} satisfies Meta<typeof ModalForm>

export default meta

type Story = StoryObj<typeof ModalForm>

export const actionsData = {
  onCancel: action('cancel'),
  onUpdateOpen: action('update:open')
}

const Template = (args: Args) => ({
  components: { ModalForm },
  setup() {
    const openModal = ref(args.open)
    watch(
      () => args.open,
      newValue => {
        openModal.value = newValue
      }
    )
    watch(openModal, value => {
      actionsData['onUpdateOpen'](value)
      if (!value) {
        actionsData['onCancel']()
      }
    })
    const formData = reactive({
      name: ''
    })
    const onOk = ({ resolve }: { resolve: Function }) => {
      setTimeout(() => {
        // 模拟提交成功
        resolve('提交成功！')
      }, 1000)
    }

    return {
      args,
      formData,
      openModal,
      onOk,
      ...actionsData
    }
  },
  template: `
    <a-button type="primary" @click="openModal=true">打开模态框</a-button>
    <ModalForm title="表单弹框" v-bind="args" v-model:open="openModal" :model="formData" @ok="onOk">
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </a-form-item>
    </ModalForm>
  `
})

// 各种状态的 Stories
export const ModalFormDefault = Template.bind({}) as Story
ModalFormDefault.args = {
  open: false
}

export const ModalFormWithRules = Template.bind({}) as Story
ModalFormWithRules.args = {
  open: false,
  rules: {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
    ]
  }
}

export const ModalFormWithLayout = Template.bind({}) as Story
ModalFormWithLayout.args = {
  open: false,
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
