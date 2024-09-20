'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var antDesignVue = require('ant-design-vue');
var iconsVue = require('@ant-design/icons-vue');

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
const SearchForm = vue.defineComponent({
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
        const propsRefs = vue.toRefs(props);
        const formRef = vue.ref();
        const containerRef = vue.ref();
        vue.provide(SearchFormContext, {
            width: propsRefs.width,
            labelWidth: propsRefs.labelWidth,
            gutter: propsRefs.gutter
        });
        // 暴露实例
        expose({
            getFormInstance: () => formRef.value
        });
        vue.watch(formRef, val => props.formRef && props.formRef(val));
        return () => {
            const children = (slots.default ? slots.default() : []);
            validateChildrenType(children);
            const renderSlots = slots.btns
                ? slots.btns
                : () => [
                    vue.h(antDesignVue.Button, {
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
                        icon: () => vue.h(iconsVue.SearchOutlined),
                        default: () => '查询'
                    }),
                    vue.h(antDesignVue.Button, {
                        onClick: () => {
                            formRef.value?.resetFields();
                            emit('reset');
                        }
                    }, () => '重置')
                ];
            if (props.showBtns) {
                const inlineBtns = vue.h(SearchFormItem, {
                    flex: 1
                }, () => vue.h(antDesignVue.Space, {
                    style: {
                        width: '100%',
                        align: 'center'
                    }
                }, () => [renderSlots(), slots.extra ? slots.extra() : null]));
                children.push(inlineBtns);
            }
            return vue.h('div', {
                ref: containerRef,
                class: 'search-form-container'
            }, vue.h(antDesignVue.Form, {
                ...attrs,
                ref: formRef,
                layout: 'horizontal'
            }, () => vue.h(antDesignVue.Row, {
                gutter: [COL_GAP, 0],
                wrap: true
            }, () => children)));
        };
    }
});
/**
 * 搜索表单项
 */
const SearchFormItem = vue.defineComponent({
    name: 'SearchFormItem',
    props: {
        // 所占列数
        span: {
            type: Number,
            default: 1
        }
    },
    setup(props, { attrs, slots }) {
        const { width, labelWidth, gutter } = vue.inject(SearchFormContext);
        return () => {
            const { flex, style = {}, ...otherAttrs } = attrs;
            const itemWidth = width.value * (props.span || 1); // width.value + COL_GAP
            return vue.h(antDesignVue.Col, {
                flex: flex ? flex : `0 0 ${itemWidth}px`,
                style: {
                    overflow: 'hidden',
                    ...style
                }
            }, () => vue.h(antDesignVue.FormItem, {
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
    vue.useCssVars(_ctx => ({
        "3d395f82-gutter\+\'px\'": (_ctx.gutter + 'px')
    }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__
    ? (props, ctx) => { __injectCSSVars__(); return __setup__(props, ctx); }
    : __injectCSSVars__;

exports.default = __default__;
