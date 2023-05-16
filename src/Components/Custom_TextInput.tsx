import { StyleSheet } from 'react-native';
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
        style={[styles.textinput, props.style]}
        inputMode='text'
        placeholder={placeholder}
        placeholderTextColor='#A7A7A7'
        autoCorrect={false}
      />
      {error ? <Text color={'red.600'} fontSize={11} py={1}>{error} </Text>: <Text></Text>}
    </>
  );
};

export default forwardRef<typeof Input, CustomTextInputProps>(CustomTextInput);

const styles = StyleSheet.create({
  textinput: {
    flex:1,
    backgroundColor: 'white',
    color: '#000',
  },
});
