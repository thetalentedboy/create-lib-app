/**
 * 输入框
 */
export type suffixFunction = (event: MouseEvent, type: number) => void;

export type inputType = 'text' | 'password';

export interface IInputProps {
    type: inputType;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    value: string;
    clearable: boolean;
    width: string | number;
    prefix: boolean;
}

export interface IPrefixProps extends Pick<IInputProps, 'prefix'> {}

export interface ISuffixProps extends Pick<IInputProps, 'type'> {
    suffixClick: suffixFunction;
    isCanClear: boolean;
}
