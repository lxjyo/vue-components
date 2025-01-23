# FormRender 组件

根据传入的schema渲染表单，支持动态增删表单项，支持表单校验，支持表单重置，支持表单提交，支持表单数据双向绑定。

## Props

| 属性       | 类型    | 默认值 | 说明                                                            |
| ---------- | ------- | ------ | --------------------------------------------------------------- |
| schema     | object  | -      | 表单schema                                                      |
| model      | object  | -      | 表单数据                                                        |
| rules      | object  | -      | 表单校验                                                        |
| labelCol   | object  | -      | 表单标签布局                                                    |
| wrapperCol | object  | -      | 表单内容布局                                                    |
| showBtns   | boolean | true   | 是否显示提交和重置按钮                                          |
| loading    | boolean | false  | 是否显示loading                                                 |
| extra      | slot    | -      | 额外的内容，会放到提交、重置按钮右侧 (仅在showBtns为true时生效) |
| btns       | slot    | -      | 自定义提交和重置按钮                                            |

## Events

| 事件名   | 参数     | 说明             |
| -------- | -------- | ---------------- |
| onSubmit | function | 提交事件         |
| onReset  | function | 重置事件         |
| onChange | function | 表单数据变化事件 |

## 支持的自动渲染组件

基于 ant-design-vue

### 基础组件

1. Input(文本输入框)
2. InputNumber(数字输入框)
3. InputPassword(密码输入框)
4. Textarea(多行输入)
5. Select(下拉)
6. Radio(单选)
7. Checkbox(多选)
8. DatePicker(日期选择器)
9. TimePicker(时间选择器)
10. RangePicker(时间范围选择) | TimeRangePicker(时间范围选择)
11. Switch(开关)
12. Cascader(级联选择)
13. Text(纯文本展示情况)

### 嵌套组件

1. 卡片嵌套(Card)
2. 折叠嵌套(Collapse)
3. 标题嵌套(Title)

### 列表组件

1. 普通列表(List)
2. 卡片列表(CardList)
3. 表格列表(TableList)

## Schema

### 如何设计schema?

1. 如何描述表单的数据结构？使用对象结构，通过key为字段名，值为字段配置，组件的配置放到props中
2. 如何描述表单项之间的关系？通过visible控制显示，这样通过响应式的设计，当监听到数据变化时，重新渲染组件
3. 如何描述表单的布局？

```json
// 基础组件， key为字段名，值为字段配置 BaseSchema
{
  "fieldName": {
    "title": "字段名称",
    "widget": "input", // 基础组件类型
    "required": "boolean",
    "rules": "array", // FormItem 的校验规则
    "visible": "boolean", // 是否显示，用于条件切换
    "disabled": "boolean", // 是否禁用，用于禁用
    "props": "object" // 传递给基础组件的props
  }
}
// 嵌套组件
{
  "card": {
    "title": "标题",
    "widget": "card|collapse｜title",
    "visible": "boolean",
    "properties": "object", // 嵌套的组件 {}
  }
}

// 列表组件（暂只考虑增加、删除操作）
{
  "list": {
    "title": "标题",
    "widget": "list|cardList|tableList",
    "visible": "boolean",
    "min": "number", // 最小数量
    "max": "number", // 最大数量
    "items": {
      "title": "每一项的标题", // 仅适用于 cardList
      // "extra": "boolean", // 每一项额外的操作 ?
      "properties": "object", // 列表项的组件 {}
    }
  }
}
```
