# ModalForm 组件
弹框表单组件，支持点击确认时自动验证表单，关闭时自动重置表单。

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| v-model:open | boolean | false | 控制弹框显示与隐藏 |
| model | object | - | 表单数据对象(同Form) |
| rules | object | - | 表单验证规则(同Form) |
| labelCol | object | { span: 4 } | 表单标签布局(同Form) |
| wrapperCol | object | { span: 20 } | 表单内容布局(同Form) |

### Events
| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| ok | {resolve: Function, reject: Function } | 确认按钮事件(表单验证后触发), 调用resolve方法后结束loading弹窗自动关闭，调用reject方法仅结束loading |
| cancel | - | 弹窗关闭事件 |
