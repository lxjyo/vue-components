# SearchForm 组件
搜索表单组件，自动布局渲染表单，点击搜索按钮时自动校验表单，校验通过后触发搜索事件，点击重置按钮时重置表单，重置后触发重置事件。

## Props
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| gutter | number | 16 | 垂直方向间(表单有验证提示推荐>=24) |
| width | number | 300 | 表单项的基础宽度 |
| labelWidth | number | 100 | 表单项label文本宽度 |
| loading | boolean | false | 是否显示loading |
| showBtns| boolean | true | 是否显示搜索和重置按钮 |
| formRef | (form?: FormInstance) => void | - | 用于获取formref |

除layout外其他属性同[Form组件](https://www.antdv.com/components/form-cn/#api)

## Events
| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| submit| - | 点击搜索按钮时触发(已验证表单) |
| reset| - | 点击重置按钮时触发(已重置表单数据) |

## Slots
| 名称 | 说明 |
| --- | --- |
| extra | 额外的内容，会放到查询、重置按钮右侧 (仅在showBtns为true时生效) |
| btns | 自定义查询和重置按钮 |

## SeachFormItem 子组件
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| span | number | 1 | 所占表单项宽度倍数，宽度：span * width  |

其他属性同[FormItem组件](https://www.antdv.com/components/form-cn/#form-item)