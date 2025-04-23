import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { selectPollById, updateAnswer } from '../../store/pollSlice';
import RadioGroup from '../../components/RadioGroup';
import SubmitButton from '../../components/SubmitButton';

const AnswerPollScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { pollId } = route.params as { pollId: string };
    const poll = useSelector(selectPollById(pollId));
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectedOptionChange = (option: string) => {
        setSelectedOption(option)
    }

    const handleAnswerPoll = () => {
        if (!selectedOption.trim()) {
            setError('Please enter a question text.');
            return;
        }
        dispatch(updateAnswer({ pollId, answer: selectedOption }));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label} >{poll?.question}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <RadioGroup
                label="Choose one:"
                options={poll?.options !== undefined ? poll?.options : []}
                selected={selectedOption}
                onChange={(option) => handleSelectedOptionChange(option)}
            />
            <SubmitButton label="Submit" onPress={handleAnswerPoll} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 20,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    label: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
    saveButton: {
      backgroundColor: '#666',
    },
});

export default AnswerPollScreen;