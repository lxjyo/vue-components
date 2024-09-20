declare const SearchFormWithInstall: import("../helpers").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    gutter: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    labelWidth: {
        type: NumberConstructor;
        default: number;
    };
    formRef: {
        type: import("vue").PropType<(form?: import("ant-design-vue").FormInstance | undefined) => void>;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBtns: {
        type: BooleanConstructor;
        default: () => boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("submit" | "reset")[], "submit" | "reset", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    gutter: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    labelWidth: {
        type: NumberConstructor;
        default: number;
    };
    formRef: {
        type: import("vue").PropType<(form?: import("ant-design-vue").FormInstance | undefined) => void>;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBtns: {
        type: BooleanConstructor;
        default: () => boolean;
    };
}>> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
}>, {
    gutter: number;
    width: number;
    labelWidth: number;
    loading: boolean;
    showBtns: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export declare const SearchFormItem: any;
export default SearchFormWithInstall;
