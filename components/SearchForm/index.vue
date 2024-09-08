<script lang="ts">
import { ref, provide, inject, toRefs, h, watch, defineComponent } from 'vue'
import {
  Form,
  FormItem,
  Row,
  Space,
  Col,
  Button,
  type FormInstance,
  type FormItemProps
} from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import type { PropType, InjectionKey, VNode, CSSProperties } from 'vue'

const COL_GAP = 16
/**
 * 验证 children 类型
 * @param {*} children
 */
const validateChildrenType = (children: VNode[]): boolean => {
  let flag = true
  for (let child of children) {
    if (child.type !== SearchFormItem && child.children !== 'v-if') {
      if (Array.isArray(child.children)) {
        flag = validateChildrenType(child.children as VNode[])
      } else {
        flag = false
        console.warn('children should be SearchFormItem')
      }
    }
    if (!flag) {
      break
    }
  }
  return flag
}
interface SearchFormContextType {
  width: { value: number }
  labelWidth: { value: number }
  gutter: { value: number }
}
const SearchFormContext = Symbol() as InjectionKey<SearchFormContextType>

const SearchForm = defineComponent({
  name: 'SearchForm',
  inheritAttrs: false,
  props: {
    // 垂直方向间距 16 24, 默认间距16；表单有验证提示推荐>=24
    gutter: {
      type: Number,
      default: 16
    },
    // 每一项的宽度
    width: {
      type: Number,
      default: 300
    },
    // label文本宽度
    labelWidth: {
      type: Number,
      default: 100
    },
    // 用于获取 form ref
    formRef: {
      type: Function as PropType<(form?: FormInstance) => void>
    },
    loading: {
      type: Boolean,
      default: false
    },
    showBtns: {
      type: Boolean,
      default: () => true
    }
  },
  emits: ['submit', 'reset'],
  setup(props, { attrs, slots, emit, expose }) {
    const propsRefs = toRefs(props)
    const formRef = ref<FormInstance>()
    const containerRef = ref()
    provide(SearchFormContext, {
      width: propsRefs.width,
      labelWidth: propsRefs.labelWidth,
      gutter: propsRefs.gutter
    })

    // 暴露实例
    expose({
      getFormInstance: () => formRef.value
    })

    watch(formRef, val => props.formRef && props.formRef(val))

    return () => {
      const children = (slots.default ? slots.default() : []) as VNode[]
      validateChildrenType(children)

      const renderSlots = slots.btns
        ? slots.btns
        : () => [
            h(
              Button,
              {
                type: 'primary',
                loading: props.loading,
                onClick: async () => {
                  try {
                    await formRef.value?.validateFields()
                    emit('submit')
                  } catch (err) {
                    console.log(err)
                  }
                }
              },
              {
                icon: () => h(SearchOutlined),
                default: () => '查询'
              }
            ),
            h(
              Button,
              {
                onClick: () => {
                  formRef.value?.resetFields()
                  emit('reset')
                }
              },
              () => '重置'
            )
          ]
      if (props.showBtns) {
        const inlineBtns = h(
          SearchFormItem,
          {
            flex: 1
          },
          () =>
            h(
              Space,
              {
                style: {
                  width: '100%',
                  align: 'center'
                }
              },
              () => [renderSlots(), slots.extra ? slots.extra() : null]
            )
        )
        children.push(inlineBtns)
      }
      return h(
        'div',
        {
          ref: containerRef,
          class: 'search-form-container'
        },
        h(
          Form,
          {
            ...attrs,
            ref: formRef,
            layout: 'horizontal'
          },
          () =>
            h(
              Row,
              {
                gutter: [COL_GAP, 0],
                wrap: true
              },
              () => children
            )
        )
      )
    }
  }
})

type SearchFormItemAttrs = {
  flex?: string | number
  style?: CSSProperties
} & Omit<FormItemProps, 'label' | 'children'>

/**
 * 搜索表单项
 */
const SearchFormItem = defineComponent({
  name: 'SearchFormItem',
  props: {
    // 所占列数
    span: {
      type: Number,
      default: 1
    }
  },
  setup(props, { attrs, slots }) {
    const { width, labelWidth, gutter } = inject(SearchFormContext) as SearchFormContextType
    return () => {
      const { flex, style = {}, ...otherAttrs } = attrs as SearchFormItemAttrs
      const itemWidth = (width.value + COL_GAP) * (props.span || 1)
      return h(
        Col,
        {
          flex: flex ? flex : `0 0 ${itemWidth}px`,
          style: {
            overflow: 'hidden',
            ...style
          }
        },
        () =>
          h(
            FormItem,
            {
              ...otherAttrs,
              class: ['search-form-item', gutter.value < 24 ? 'no-message' : ''],
              labelCol: {
                style: {
                  width: `${labelWidth.value}px`
                }
              },
              wrapperCol: {
                flex: `calc(100% - ${labelWidth.value}px)`
              }
            },
            slots
          )
      )
    }
  }
})

SearchForm.Item = SearchFormItem

export default SearchForm
</script>
<style lang="less" scoped>
.search-form-container {
  :deep(.search-form-item) {
    margin-bottom: v-bind("gutter+'px'");
    &.no-message {
      .ant-form-item-control-input {
        & + div > .ant-form-show-help {
          display: none;
        }
      }
    }
  }
}
</style>
