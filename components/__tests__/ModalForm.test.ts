import './matchMedia.mock'
import ModalForm from '../ModalForm/index.vue'
import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { Form, FormItem, Input, Modal } from 'ant-design-vue'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { h } from 'vue'
import type { IModalFormOkContext } from '../ModalForm/types'

type ModalFormInstance = InstanceType<typeof ModalForm>
describe('ModalForm', () => {
  let wrapper: VueWrapper<ModalFormInstance>
  beforeEach(() => {
    wrapper = mount(ModalForm, {
      props: {
        open: true,
        model: {
          name: ''
        }
      },
      data() {
        return {
          formRef: {
            validate: vi.fn().mockResolvedValueOnce(true)
          }
        }
      },
      slots: {
        default: () =>
          h(
            FormItem,
            {
              name: 'name'
            },
            () => h(Input)
          )
      }
    })
  })
  it('验证open为true', async () => {
    const modal = wrapper.findComponent(Modal)
    expect(modal.props('open')).toBe(true)
  })
  it('验证open为false', async () => {
    await wrapper.setProps({
      open: false
    })
    const modal = wrapper.findComponent(Modal)
    expect(modal.props('open')).toBe(false)
  })

  it('点击确认时，验证表单通过时触发ok事件', async () => {
    await wrapper.findComponent(Modal).vm.$emit('ok')
    const formWrapper = wrapper.findComponent(Form)
    vi.spyOn(formWrapper.vm, 'onValidate').mockResolvedValueOnce()
    // 等待所有异步完成
    await flushPromises()
    expect(wrapper.emitted()).toHaveProperty('ok')
  })

  it('点击确认时，触发ok事件后，resolve可关闭弹框', async () => {
    await wrapper.findComponent(Modal).vm.$emit('ok')
    const formWrapper = wrapper.findComponent(Form)
    vi.spyOn(formWrapper.vm, 'onValidate').mockResolvedValueOnce()
    await flushPromises()
    await (wrapper.emitted('ok')?.[0]?.[0] as IModalFormOkContext)?.resolve()
    expect(wrapper.emitted()).toHaveProperty('update:open')
  })

  it('点击确认时，触发ok事件后，reject可阻止弹框关闭', async () => {
    await wrapper.findComponent(Modal).vm.$emit('ok')
    const formWrapper = wrapper.findComponent(Form)
    vi.spyOn(formWrapper.vm, 'onValidate').mockResolvedValueOnce()
    await flushPromises()
    await (wrapper.emitted('ok')?.[0]?.[0] as IModalFormOkContext)?.reject()
    expect(wrapper.emitted()).not.toHaveProperty('update:open')
  })

  it('点击取消时，触发cancel事件', async () => {
    await wrapper.findComponent(Modal).vm.$emit('cancel')
    expect(wrapper.emitted()).toHaveProperty('cancel')
  })
})
