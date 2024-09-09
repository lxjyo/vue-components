import type { PropType } from 'vue';
import type { IModalFormOkContext } from './types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * 是否显示 v-model:open
     * @type {boolean}
     */
    open: BooleanConstructor;
    /**
     * 表单数据
     */
    model: {
        type: PropType<{
            [key: string]: any;
        } | undefined>;
        required: true;
    };
    /**
     * 表单验证规则
     */
    rules: PropType<{
        [k: string]: import("ant-design-vue/es/form").RuleObject | import("ant-design-vue/es/form").RuleObject[];
    } | undefined>;
    /**
     * 表单标签布局
     */
    labelCol: {
        type: PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
    /**
     * 表单内容布局
     */
    wrapperCol: {
        type: PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:open': (value: boolean) => boolean;
    /**
     * 确认按钮事件(表单验证后触发)
     * @param param0 modal 确认按钮回调参数
     * @returns
     */
    ok: ({ resolve, reject }: IModalFormOkContext) => boolean;
    /**
     * 取消按钮事件
     */
    cancel: null;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * 是否显示 v-model:open
     * @type {boolean}
     */
    open: BooleanConstructor;
    /**
     * 表单数据
     */
    model: {
        type: PropType<{
            [key: string]: any;
        } | undefined>;
        required: true;
    };
    /**
     * 表单验证规则
     */
    rules: PropType<{
        [k: string]: import("ant-design-vue/es/form").RuleObject | import("ant-design-vue/es/form").RuleObject[];
    } | undefined>;
    /**
     * 表单标签布局
     */
    labelCol: {
        type: PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
    /**
     * 表单内容布局
     */
    wrapperCol: {
        type: PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
}>> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    onOk?: ((args_0: IModalFormOkContext) => any) | undefined;
}>, {
    labelCol: (Partial<import("vue").ExtractPropTypes<{
        span: (StringConstructor | NumberConstructor)[];
        order: (StringConstructor | NumberConstructor)[];
        offset: (StringConstructor | NumberConstructor)[];
        push: (StringConstructor | NumberConstructor)[];
        pull: (StringConstructor | NumberConstructor)[];
        xs: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        sm: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        md: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        lg: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xl: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xxl: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        prefixCls: StringConstructor;
        flex: (StringConstructor | NumberConstructor)[];
    }>> & import("vue").HTMLAttributes) | undefined;
    wrapperCol: (Partial<import("vue").ExtractPropTypes<{
        span: (StringConstructor | NumberConstructor)[];
        order: (StringConstructor | NumberConstructor)[];
        offset: (StringConstructor | NumberConstructor)[];
        push: (StringConstructor | NumberConstructor)[];
        pull: (StringConstructor | NumberConstructor)[];
        xs: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        sm: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        md: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        lg: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xl: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xxl: {
            type: PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        prefixCls: StringConstructor;
        flex: (StringConstructor | NumberConstructor)[];
    }>> & import("vue").HTMLAttributes) | undefined;
    open: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}>;
export default _default;
