import { defineComponent, toRefs, ref, provide, watch, h, inject, useCssVars } from 'vue';
import { Button, Space, Form, Row, Col, FormItem } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';

const COL_GAP = 16;
/**
 * 验证 children 类型
 * @param {*} children
 */
const validateChildrenType = (children) => {
    let flag = true;
    for (let child of children) {
        if (child.type !== SearchFormItem && child.children !== 'v-if') {
            if (Array.isArray(child.children)) {
                flag = validateChildrenType(child.children);
            }
            else {
                flag = false;
                console.warn('children should be SearchFormItem');
            }
        }
        if (!flag) {
            break;
        }
    }
    return flag;
};
const SearchFormContext = Symbol();
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
            type: Function
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
        const propsRefs = toRefs(props);
        const formRef = ref();
        const containerRef = ref();
        provide(SearchFormContext, {
            width: propsRefs.width,
            labelWidth: propsRefs.labelWidth,
            gutter: propsRefs.gutter
        });
        // 暴露实例
        expose({
            getFormInstance: () => formRef.value
        });
        watch(formRef, val => props.formRef && props.formRef(val));
        return () => {
            const children = (slots.default ? slots.default() : []);
            validateChildrenType(children);
            const renderSlots = slots.btns
                ? slots.btns
                : () => [
                    h(Button, {
                        type: 'primary',
                        loading: props.loading,
                        onClick: async () => {
                            try {
                                await formRef.value?.validateFields();
                                emit('submit');
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }, {
                        icon: () => h(SearchOutlined),
                        default: () => '查询'
                    }),
                    h(Button, {
                        onClick: () => {
                            formRef.value?.resetFields();
                            emit('reset');
                        }
                    }, () => '重置')
                ];
            if (props.showBtns) {
                const inlineBtns = h(SearchFormItem, {
                    flex: 1
                }, () => h(Space, {
                    style: {
                        width: '100%',
                        align: 'center'
                    }
                }, () => [renderSlots(), slots.extra ? slots.extra() : null]));
                children.push(inlineBtns);
            }
            return h('div', {
                ref: containerRef,
                class: 'search-form-container'
            }, h(Form, {
                ...attrs,
                ref: formRef,
                layout: 'horizontal'
            }, () => h(Row, {
                gutter: [COL_GAP, 0],
                wrap: true
            }, () => children)));
        };
    }
});
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
        const { width, labelWidth, gutter } = inject(SearchFormContext);
        return () => {
            const { flex, style = {}, ...otherAttrs } = attrs;
            const itemWidth = (width.value + COL_GAP) * (props.span || 1);
            return h(Col, {
                flex: flex ? flex : `0 0 ${itemWidth}px`,
                style: {
                    overflow: 'hidden',
                    ...style
                }
            }, () => h(FormItem, {
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
            }, slots));
        };
    }
});
SearchForm.Item = SearchFormItem;
const __default__ = SearchForm;
const __injectCSSVars__ = () => {
    useCssVars(_ctx => ({
        "30461d6a-gutter\+\'px\'": (_ctx.gutter + 'px')
    }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__
    ? (props, ctx) => { __injectCSSVars__(); return __setup__(props, ctx); }
    : __injectCSSVars__;

export { __default__ as default };
