import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextAreaInput(
    { className = '', isFocused = false, children, ...props },
    ref) {
    const input = ref ? ref : useRef();


    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={input}
        >{children}</textarea>
    );
});
