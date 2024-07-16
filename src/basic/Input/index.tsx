import './input.scss';
import { useCallback, useState } from 'preact/compat';
import { type FunctionComponent, render } from 'preact';

import type { IInputProps, inputType, IPrefixProps, ISuffixProps } from '@/basic/Input/types';
import { startsWithHash } from '@/utils';
import { ClearSvg, PasswordSvg, SearchSvg } from '@/basic/Icon';

const defaultInputProps: IInputProps = {
    type: 'text',
    placeholder: '请输入',
    disabled: false,
    readonly: false,
    value: '',
    clearable: false,
    width: 210,
    prefix: true,
};

const PASSWORD_TOGGLE: number = 1;
const CLEAR_CONTENT: number = 2;

const Input: FunctionComponent<IInputProps> = (props) => {
    const { type, placeholder, value, width, clearable, disabled, prefix, ...otherProps } = { ...defaultInputProps, ...props };

    const [modelValue, setModelValue] = useState<string>(value);
    const [inputType, setInputType] = useState<inputType>(type);
    const [isCanClear, setCanClear] = useState<boolean>(false);

    const widthValue = typeof width === 'number' ? `${width}px` : width;

    const handleChange = useCallback((e: Event) => {
        const model = (e.target as HTMLInputElement).value.trim();
        setModelValue(model);
        clearable && setCanClear(model.length > 0);
    }, []);

    const handleInputFocus = useCallback(() => {
        clearable && modelValue.length > 0 && setCanClear(true);
    }, [clearable, modelValue]);

    const handleInputBlur = useCallback(() => {
        clearable && modelValue.length > 0 && setCanClear(false);
    }, [clearable, modelValue]);

    const suffixClick = useCallback(
        (event: MouseEvent, data: number) => {
            event.stopPropagation();
            event.preventDefault();
            const typeChangeValue = inputType === 'text' ? 'password' : 'text';
            switch (data) {
                case PASSWORD_TOGGLE:
                    setInputType(typeChangeValue);
                    break;
                case CLEAR_CONTENT:
                    setModelValue('');
                    setCanClear(false);
                    break;
            }
        },
        [inputType],
    );

    // 样式
    const InputClassName = ['Inputinput', disabled ? 'is-disabled ' : '', prefix ? 'Inputinput--prefix' : ''].join(' ');

    return (
        <>
            <div className={InputClassName} style={{ width: widthValue }} onMouseEnter={handleInputFocus}>
                <Prefix prefix={prefix} />
                <input
                    className="Inputinput__inner"
                    autocomplete="off"
                    type={inputType}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={modelValue}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    {...otherProps}
                />
                <Suffix type={inputType} isCanClear={isCanClear} suffixClick={suffixClick} />
            </div>
        </>
    );
};

/**
 * 前缀组件
 */
const Prefix: FunctionComponent<IPrefixProps> = ({ prefix }) => {
    return (
        <div className="Inputinput__prefix">
            <div className="Inputinput__icon">{prefix && <SearchSvg />}</div>
        </div>
    );
};

/**
 * 后缀组件
 */
const Suffix: FunctionComponent<ISuffixProps> = ({ type, isCanClear, suffixClick }) => {
    return (
        <div className="Inputinput__suffix">
            <div className="Inputinput__icon">
                {type === 'password' && <PasswordSvg suffixClick={(e) => suffixClick(e, PASSWORD_TOGGLE)} />}
                {isCanClear && <ClearSvg suffixClick={(e) => suffixClick(e, CLEAR_CONTENT)} />}
            </div>
        </div>
    );
};



export default (id: string, option: IInputProps): void => {
    const element: Element = !startsWithHash(id) ? document.getElementById(id)! : document.querySelector(id)!;
    render(<Input {...option} />, element);
};;
