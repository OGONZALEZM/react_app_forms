import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addPoll } from "../../store/pollSlice";
import BasicTextField from "../../components/BasicTextField";
import SubmitButton from "../../components/SubmitButton";
import Divider from "../../components/Divider";
import { Poll } from "../../models/Poll";
import { v4 as uuidv4 } from 'uuid';
import { generateRandomId } from "../../utils/randomId";

const CreatePollScreen = ({ navigation }: any) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
  
    const handleAddOption = () => {
      setOptions((prev) => [...prev, '']);
    };
  
    const handleOptionChange = (index: number, value: string) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      setOptions(updatedOptions);
    };
  
    const handleCreatePoll = () => {
      if (!question.trim()) {
        setError('Please enter a question text.');
        return;
      }
  
      const cleanedOptions = options.filter((opt) => opt.trim() !== '');
      if (cleanedOptions.length < 2) {
        setError('Please enter at least two options.');
        return;
      }
  
      setError('');
      const newPoll: Poll = { 
        pollId: generateRandomId(),
        question: question, 
        options: cleanedOptions };
      dispatch(addPoll(newPoll));
      navigation.goBack();
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
  
        <BasicTextField
          label="Question:"
          value={question}
          onChangeText={setQuestion}
        />
  
        <Divider />
        <Text style={styles.label}>Options:</Text>
  
        {options.map((option, index) => (
          <BasicTextField
            key={index}
            label={`Option ${index + 1}`}
            value={option}
            onChangeText={(text) => handleOptionChange(index, text)}
          />
        ))}
  
        <SubmitButton
          label="Add Option"
          onPress={handleAddOption}
          style={styles.addButton}
        />
  
        <Divider />
        <SubmitButton label="Create" onPress={handleCreatePoll} />
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      gap: 12,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    error: {
      color: 'red',
      marginBottom: 8,
    },
    addButton: {
      backgroundColor: '#666',
    },
  });
  
export default CreatePollScreen;