import type { FormItemProps } from 'ant-design-vue'

export type TypeWidget =
  | 'input'
  | 'input-number'
  | 'input-password'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date-picker'
  | 'time-picker'
  | 'time-range-picker'
  | 'date-range-picker'
  | 'switch'
// | 'text'

export type TypeUIWidget = 'card' | 'collapse' | 'title'

export type TypeListWidget = 'list' | 'cardList' | 'tableList'

export interface IFormShema {
  [key: string]: IBaseSchema | IUISchema | IListSchema
}

export interface ISchema {
  title: string
  widget: string
  visible?: boolean // 是否显示，用于条件切换
}

export interface IBaseSchema extends ISchema {
  widget: TypeWidget // 基础组件类型
  required?: boolean // 是否必填
  rules?: FormItemProps['rules'] // FormItem 的校验规则
  disabled?: boolean // 是否禁用，用于禁用
  props: Object // 传递给基础组件的props
}

export interface IUISchema extends ISchema {
  widget: TypeUIWidget
  properties: ISchema // 嵌套的组件
}

export interface IListSchema extends ISchema {
  widget: TypeListWidget
  min?: number // 最小数量
  max?: number // 最大数量
  items: {
    title: '每一项的标题' // 仅适用于 cardList
    properties: 'object' // 列表项的组件 {}
  }
}
