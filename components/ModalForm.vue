<script lang="ts">
import type { FormInstance, FormProps } from 'ant-design-vue'
import { Modal, Form, notification } from 'ant-design-vue'
import { defineComponent, ref, h } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'ModalForm',
  props: {
    /**
     * 是否显示 v-model:open
     * @type {boolean}
     */
    open: Boolean,
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<FormProps['model']>,
      required: true
    },
    /**
     * 表单验证规则
     */
    rules: Object as PropType<FormProps['rules']>,
    /**
     * 表单标签布局
     */
    labelCol: {
      type: Object as PropType<FormProps['labelCol']>,
      default: () => ({
        span: 4
      })
    },
    /**
     * 表单内容布局
     */
    wrapperCol: {
      type: Object as PropType<FormProps['wrapperCol']>,
      default: () => ({
        span: 20
      })
    }
  },
  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean',
    /**
     * 确认按钮事件(表单验证后触发)
     * @param param0 modal 确认按钮回调参数
     * @returns
     */
    ok: ({ resolve, reject }: { resolve: Function; reject: Function }) =>
      typeof resolve === 'function' && typeof reject === 'function',
    /**
     * 取消按钮事件
     */
    cancel: null
  },
  setup(props, { slots, emit }) {
    const confirmLoading = ref(false)
    const formRef = ref<FormInstance>()
    const onSubmit = async () => {
      try {
        await formRef.value?.validate()
        confirmLoading.value = true
        const message = await new Promise((resolve, reject) => {
          emit('ok', { resolve, reject })
        })
        if (typeof message === 'string') {
          notification.success({
            message
          })
        }
        onClose()
      } catch (err) {
        console.log(err)
      } finally {
        confirmLoading.value = false
      }
    }
    const onClose = () => {
      formRef.value?.resetFields()
      emit('update:open', false)
      emit('cancel')
    }
    const { default: defaultSlot, ...otherSlots } = slots

    return () =>
      h(
        Modal,
        {
          open: props.open,
          width: 640,
          maskClosable: false,
          confirmLoading: confirmLoading.value,
          onCancel: onClose,
          onOk: onSubmit
        },
        {
          ...otherSlots,
          default: () => [
            h(
              Form,
              {
                ref: formRef,
                ...props
              },
              {
                default: defaultSlot
              }
            )
          ]
        }
      )
  }
})
</script>
