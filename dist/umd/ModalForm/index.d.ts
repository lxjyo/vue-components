export * from './types';
declare const _default: import("../helpers").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    open: BooleanConstructor;
    model: {
        type: import("vue").PropType<{
            [key: string]: any;
        } | undefined>;
        required: true;
    };
    rules: import("vue").PropType<{
        [k: string]: import("ant-design-vue/es/form").RuleObject | import("ant-design-vue/es/form").RuleObject[];
    } | undefined>;
    labelCol: {
        type: import("vue").PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
    wrapperCol: {
        type: import("vue").PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
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
    ok: ({ resolve, reject }: import("./types").IModalFormOkContext) => boolean;
    cancel: null;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    open: BooleanConstructor;
    model: {
        type: import("vue").PropType<{
            [key: string]: any;
        } | undefined>;
        required: true;
    };
    rules: import("vue").PropType<{
        [k: string]: import("ant-design-vue/es/form").RuleObject | import("ant-design-vue/es/form").RuleObject[];
    } | undefined>;
    labelCol: {
        type: import("vue").PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            prefixCls: StringConstructor;
            flex: (StringConstructor | NumberConstructor)[];
        }>> & import("vue").HTMLAttributes) | undefined>;
        default: () => {
            span: number;
        };
    };
    wrapperCol: {
        type: import("vue").PropType<(Partial<import("vue").ExtractPropTypes<{
            span: (StringConstructor | NumberConstructor)[];
            order: (StringConstructor | NumberConstructor)[];
            offset: (StringConstructor | NumberConstructor)[];
            push: (StringConstructor | NumberConstructor)[];
            pull: (StringConstructor | NumberConstructor)[];
            xs: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            sm: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            md: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            lg: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
                default: string | number | import("ant-design-vue/es/grid").ColSize;
            };
            xxl: {
                type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
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
    onOk?: ((args_0: import("./types").IModalFormOkContext) => any) | undefined;
}>, {
    labelCol: (Partial<import("vue").ExtractPropTypes<{
        span: (StringConstructor | NumberConstructor)[];
        order: (StringConstructor | NumberConstructor)[];
        offset: (StringConstructor | NumberConstructor)[];
        push: (StringConstructor | NumberConstructor)[];
        pull: (StringConstructor | NumberConstructor)[];
        xs: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        sm: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        md: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        lg: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xl: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xxl: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
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
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        sm: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        md: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        lg: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xl: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        xxl: {
            type: import("vue").PropType<string | number | import("ant-design-vue/es/grid").ColSize>;
            default: string | number | import("ant-design-vue/es/grid").ColSize;
        };
        prefixCls: StringConstructor;
        flex: (StringConstructor | NumberConstructor)[];
    }>> & import("vue").HTMLAttributes) | undefined;
    open: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default _default;
