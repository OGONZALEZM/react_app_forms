import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

type SubmitButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export default function SubmitButton({ label, onPress, style }: SubmitButtonProps) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#6200ee',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 16,
    },
        label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});