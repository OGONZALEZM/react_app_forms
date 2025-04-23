import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export interface RadioGroupProps {
    label?: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
    horizontal?: boolean;
  }
  
  const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    options,
    selected,
    onChange,
    horizontal = false,
  }) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RadioButton.Group onValueChange={onChange} value={selected}>
          <View style={[styles.group, horizontal && styles.horizontal]}>
            {options.map((opt, index) => (
              <RadioButton.Item
                key={index}
                label={opt}
                value={opt}
                color='#333'
                position={horizontal ? 'leading' : 'trailing'}
                style={styles.radioItem}
              />
            ))}
          </View>
        </RadioButton.Group>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 12,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    group: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    radioItem: {
      marginRight: 8
    },
  });
  
  export default RadioGroup;