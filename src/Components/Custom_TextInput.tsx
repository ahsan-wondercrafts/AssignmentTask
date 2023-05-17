import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import { Input, IInputProps, Text } from 'native-base';

interface CustomTextInputProps extends IInputProps {
  inputRef?: Ref<typeof Input | null> | ((instance: typeof Input | null) => void) | null;
  placeholder: string;
  error?: string | null;
}

const CustomTextInput: ForwardRefRenderFunction<typeof Input, CustomTextInputProps> = (
  { inputRef, placeholder, error, ...props },
  ref
) => {
  return (
    <>
      <Input
        ref={inputRef || undefined}
        {...props}
        py={'3%'}
        backgroundColor={'white'}
        color={'black'}
        inputMode='text'
        placeholder={placeholder}
        placeholderTextColor='#A7A7A7'
        autoCorrect={false}
      />
      {error ? <Text color={'red.600'} fontSize={11} py={1}>{error} </Text> : <Text></Text>}
    </>
  );
};

export default forwardRef<typeof Input, CustomTextInputProps>(CustomTextInput);
