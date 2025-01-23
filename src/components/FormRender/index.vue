<script lang="ts">
import {
  Form,
  Row,
  Col,
  FormItem,
  Input,
  InputNumber,
  Textarea,
  Checkbox,
  Radio,
  DatePicker,
  Select,
  Switch,
  TimePicker,
  TimeRangePicker,
  type FormProps
} from 'ant-design-vue'
import type { PropType } from 'vue'
import { h, defineComponent, computed } from 'vue'
import type { IBaseSchema, IFormShema, TypeWidget } from '.'
import type { Component } from 'vue'
import { reactive } from 'vue'

const BaseWidgets = [
  Input,
  InputNumber,
  Textarea,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  TimeRangePicker,
  Switch
]

type IBaseWidgetMap = {
  [key in TypeWidget]: Component
}
const BaseWidgetMap: IBaseWidgetMap = BaseWidgets.reduce((prev, comp) => {
  const name = comp.name?.toLowerCase().replace(/^a/, '') as TypeWidget
  return {
    ...prev,
    [name]: comp
  }
}, {})

export default defineComponent({
  name: 'FormRender',
  version: '1.0.0',
  props: {
    model: Object as PropType<FormProps['model']>,
    // 表单配置
    schema: {
      type: Object as PropType<IFormShema>,
      required: true
    },
    // 布局相关配置
    columns: {
      type: Number,
      default: 1
    },
    labelCol: Object as PropType<FormProps['labelCol']>,
    wrapperCol: Object as PropType<FormProps['wrapperCol']>
  },
  setup(props) {
    const formModel = reactive({
      ...props.model
    })
    const colSpan = computed(() => Math.floor(24 / props.columns)) // 列数

    // 生成单个表单项
    const toRenderItem = (name: string, { widget, props, ...formProps }: IBaseSchema) => {
      const Comp = BaseWidgetMap[widget]
      console.log(name, Comp, BaseWidgetMap)
      if (!Comp) {
        return null
      }
      // 生成单个表单项
      return h(
        FormItem,
        {
          label: formProps.title,
          ...formProps,
          name,
          key: name
        },
        () =>
          h(Comp, {
            ...props,
            value: formModel[name],
            checked: formModel[name],
            'onUpdate:checked': (value: any) => {
              formModel[name] = value
            },
            'onUpdate:value': (value: any) => {
              formModel[name] = value
            }
          })
      )
    }

    // 生成整个表单
    const toRenderBySchema = () => {
      return h(Row, { gutter: 24 }, () =>
        Object.keys(props.schema).map(name => {
          const item = props.schema[name] as IBaseSchema
          if (item.visible === false) {
            return null
          }
          return h(Col, { span: colSpan.value }, () => toRenderItem(name, item))
        })
      )
    }

    return () =>
      h(
        Form,
        {
          model: formModel,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        },
        toRenderBySchema
      )
  }
})
</script>
