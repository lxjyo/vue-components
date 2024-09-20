import './matchMedia.mock'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchForm from '../SearchForm/index.vue'
import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { Button, Input } from 'ant-design-vue'
import { h } from 'vue'
type SearchFormInstance = InstanceType<typeof SearchForm>

describe('SearchForm', () => {
  let wrapper: VueWrapper<SearchFormInstance>
  const submitSpy = vi.fn()

  beforeEach(() => {
    wrapper = mount(SearchForm, {
      props: {
        model: {},
        gutter: 16,
        width: 300,
        labelWidth: 100,
        showBtns: true,
        onSubmit: submitSpy
      },
      slots: {
        default: () => [
          h(
            SearchForm.Item,
            { label: 'Name' },
            {
              default: () => h(Input, { vModel: 'name' })
            }
          ),
          h(
            SearchForm.Item,
            { label: 'Age', span: 2 },
            {
              default: () => h(Input, { vModel: 'age' })
            }
          )
        ],
        extra: () => [h(Button, { type: 'primary' }, () => '新增')]
      }
    })
  })

  it('正确渲染', () => {
    expect(wrapper.find('.search-form-container').exists()).toBe(true)
    expect(wrapper.find('.search-form-item').exists()).toBe(true)
  })

  it('验证子节点类型', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Test with invalid children
    mount(SearchForm, {
      props: {
        model: {}
      },
      slots: {
        default: '<div>Invalid Child</div>'
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalledWith('children should be SearchFormItem')

    consoleWarnSpy.mockRestore()
  })

  it('当点击查询按钮时，触发submit事件', async () => {
    // 触发按钮的点击事件
    await wrapper.findComponent(Button).trigger('click')

    // 等待所有异步完成
    await flushPromises()

    // 检查 submitSpy 是否被调用
    expect(wrapper.emitted()).toHaveProperty('submit')
  })

  it('当点击重置按钮时，触发reset事件', async () => {
    await wrapper.findAllComponents(Button)[1].trigger('click')
    // 等待所有异步完成
    await flushPromises()
    // 检查 resetSpy 是否被调用
    expect(wrapper.emitted()).toHaveProperty('reset')
  })

  it('测试隐藏按钮', async () => {
    wrapper.setProps({
      showBtns: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Button).exists()).toBe(false)
  })

  it('测试额外按钮正常渲染', () => {
    expect(wrapper.findAllComponents(Button).length).toBe(3)
  })

  it('测试loading', async () => {
    wrapper.setProps({ loading: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Button).props('loading')).toBe(true)
  })
})
