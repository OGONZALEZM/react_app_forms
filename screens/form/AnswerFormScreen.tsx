import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import RadioGroup from '../../components/RadioGroup';
import SubmitButton from '../../components/SubmitButton';
import BasicTextField from '../../components/BasicTextField';

import { selectFormById, updateForm } from '../../store/formSlice';
import { QuestionType } from '../../models/Question';
import { Answer } from '../../models/Answer';


const AnswerFormScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { formId } = route.params as { formId: string };
  const form = useSelector(selectFormById(formId));
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState('');

  const getAnswerValue = (questionId: number): string => {
    return answers.find(a => a.questionId === questionId)?.value.toString() || '';
  };

  const updateAnswer = (questionId: number, value: string) => {
    setAnswers(prev => {
      const index = prev.findIndex(a => a.questionId === questionId);
      const updated = [...prev];
      if (index !== -1) {
        updated[index] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };

  const validateAnswers = (): boolean => {
    for (const question of form?.questions || []) {
      if (question.required) {
        const answer = answers.find(a => a.questionId === question.questionId);
        if (!answer || answer.value.trim() === '') {
          setError('Please complete all the required questions.');
          return false;
        }
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateAnswers()) {
      dispatch(updateForm({ formId, answers }));
      navigation.goBack();
    }
  };

  const renderQuestionInput = (question: any) => {
    const commonProps = {
      label: question.text,
      value: getAnswerValue(question.questionId),
      onChangeText: (text: string) => updateAnswer(question.questionId, text),
    };

    switch (question.type) {
      case QuestionType.SHORT_ANSWER:
        return <BasicTextField {...commonProps} />;
      case QuestionType.LONG_ANSWER:
        return <BasicTextField {...commonProps} isTextArea />;
      case QuestionType.NUMBER:
        return <BasicTextField {...commonProps} isNumeric />;
      case QuestionType.RADIO:
        return (
          <RadioGroup
            label={question.text}
            options={question.options?.map(op => op.value) || []}
            selected={getAnswerValue(question.questionId)}
            onChange={(option) => updateAnswer(question.questionId, option)}
            horizontal
          />
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            
            <Text style={styles.title}>{form?.name}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {form?.questions.map((question, index) => (
                <View style={styles.container} key={index}>
                <Text style={styles.label}>
                    {question.text}{question.required ? ' *' : ''}
                </Text>
                {renderQuestionInput(question)}
                </View>
            ))}

            <SubmitButton label="Submit" onPress={handleSubmit} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
  },
  scrollViewContainer: {
    padding: 20,
  },
  container: {
    padding: 20,
    marginBottom: 10,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '200',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default AnswerFormScreen;