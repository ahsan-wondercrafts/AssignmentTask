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
      {error ? <Text style={{color:'red'}}>{error}</Text>: <Text> </Text>}
    </>
  );
};

export default forwardRef<typeof Input, CustomTextInputProps>(CustomTextInput);

const styles = StyleSheet.create({
  textinput: {
    width: '100%',
    backgroundColor: 'white',
    color: '#000',
  },
});
