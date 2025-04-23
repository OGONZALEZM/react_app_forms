import React from 'react';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface BasicTextFieldProps extends TextInputProps {
  label: string;
  errorText?: string;
  isNumeric?: boolean,
  isTextArea?: boolean,
  remove?: boolean;
  onRemove?: () => void;
}

const BasicTextField: React.FC<BasicTextFieldProps> = ({ label, errorText, isNumeric, isTextArea, remove, onRemove, ...props }) => {
    return (
      <View style={styles.container}>
        <TextInput
          label={label}
          mode="outlined"
          keyboardType={isNumeric ? "numeric" : "default"}
          multiline={isTextArea ? true : false}
          numberOfLines={isTextArea ? 4 : 1}
          style={[styles.textField, { textAlignVertical: 'top' }]}
          error={!!errorText}
          {...props}
        />
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        {remove && 
          <Pressable style={[styles.button]} onPress={onRemove}>
            <MaterialIcons name="delete" size={30} color="white" />
          </Pressable>
        }
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textField: {
      flex: 1,
      backgroundColor: 'white',
    },
    errorText: {
      color: 'red',
      marginTop: 5,
    },
    button: {
      width: 45,
      height: 45,
      alignItems: 'center',
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 8,
      marginLeft: 15,
      justifyContent: 'center'
    }
  });
  
  export default BasicTextField;