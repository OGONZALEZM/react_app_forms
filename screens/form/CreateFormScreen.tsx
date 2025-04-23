import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import BasicTextField from "../../components/BasicTextField";
import SubmitButton from "../../components/SubmitButton";
import Divider from "../../components/Divider";
import RadioGroup from "../../components/RadioGroup";
import { MaterialIcons } from "@expo/vector-icons";
import { addForm } from "../../store/formSlice";
import { QuestionType, Question } from "../../models/Question";
import { Form } from "../../models/Form";
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from "react-native-paper";
import { generateRandomId } from "../../utils/randomId";

const CreateFormScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [optionId, setOptionId] = useState(1);

  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        questionId,
        text: '',
        type: QuestionType.SHORT_ANSWER,
        required: false,
        options: [{
          questionId,
          optionId,
          value: ""
        }]
      }
    ]);
    setQuestionId(q => q + 1);
    setOptionId(o => o + 1);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleQuestionTypeChange = (index: number, type: string) => {
    const updated = [...questions];
    updated[index].type = type as QuestionType;
    setQuestions(updated);
  };

  const handleAddOption = (qid: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.questionId === qid
          ? {
              ...q,
              options: [...(q.options || []), {
                questionId: qid,
                optionId,
                value: ""
              }]
            }
          : q
      )
    );
    setOptionId(o => o + 1);
  };

  const handleQuestionRequired = (index: number, value: boolean) => {
    const updated = [...questions];
    updated[index].required = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qid: number, oid: number, value: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.questionId === qid
          ? {
              ...q,
              options: q.options?.map(opt =>
                opt.optionId === oid ? { ...opt, value } : opt
              )
            }
          : q
      )
    );
  };

  const handleRemoveOption = (qid: number, oid: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.questionId === qid
          ? {
              ...q,
              options: q.options?.filter(opt => opt.optionId !== oid)
            }
          : q
      )
    );
  };

  const handleCreateForm = () => {
    if (!name.trim()) {
      setError('Please enter a form name.');
      return;
    }

    const cleanedQuestions = questions.filter(q => q.text.trim());
    if (cleanedQuestions.length === 0) {
      setError('Please add at least one question.');
      return;
    }

    setError('');
    const newForm: Form = { 
      formId: generateRandomId(),
      name: name,
      questions: cleanedQuestions
    };
    dispatch(addForm(newForm));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <BasicTextField label="Name:" value={name} onChangeText={setName} />
          <Divider />
          <Text style={styles.label}>Questions:</Text>
          {questions.map((q, index) => (
            <View key={`question-${q.questionId}`} style={styles.question}>
              <BasicTextField
                label={`Question ${index + 1}`}
                value={q.text}
                onChangeText={(text) => handleQuestionChange(index, text)}
              />
              <View style={styles.checkbox}>
                <Checkbox
                  status={(q.required == true) ? 'checked' : 'unchecked'}
                  onPress={() => handleQuestionRequired(index, !q.required)}
                />
                <Text style={{ marginLeft: 8 }}>Required?</Text>
              </View>

              <RadioGroup
                label="Question type:"
                options={[
                  QuestionType.LONG_ANSWER,
                  QuestionType.SHORT_ANSWER,
                  QuestionType.NUMBER,
                  QuestionType.RADIO
                ]}
                selected={q.type}
                onChange={(type) => handleQuestionTypeChange(index, type)}
                horizontal
              />

              {q.type === QuestionType.RADIO && (
                <View style={styles.options}>
                  <View style={styles.addOptionContainer}>
                    <Text style={styles.addOptionLabel}>Options</Text>
                    <Pressable
                      style={styles.addOption}
                      onPress={() => handleAddOption(q.questionId)}
                    >
                      <MaterialIcons name="add" size={15} color="#333" />
                    </Pressable>
                  </View>

                  {q.options?.map((opt, opIndex) => (
                    <BasicTextField
                      key={`opt-${q.questionId}-${opt.optionId}`}
                      label={`Option ${opIndex + 1}`}
                      value={opt.value}
                      remove
                      onRemove={() => handleRemoveOption(q.questionId, opt.optionId)}
                      onChangeText={(text) =>
                        handleOptionChange(q.questionId, opt.optionId, text)
                      }
                    />
                  ))}
                </View>
              )}
            </View>
          ))}

          <Divider />
          <SubmitButton label="Add Question" onPress={handleAddQuestion} style={styles.addButton} />
          <Divider />
          <SubmitButton label="Create" onPress={handleCreateForm} />

          </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12
  },
  scrollViewContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  error: {
    color: 'red',
    marginBottom: 8
  },
  question: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#EEE',
    shadowOffset: { width: 1, height: 2 }
  },
  options: {
    backgroundColor: '#EEE',
    padding: 20,
    borderRadius: 8
  },
  addOptionContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addOption: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addOptionLabel: {
    marginRight: 12,
    fontWeight: '600'
  },
  addButton: {
    backgroundColor: '#666'
  }
});

export default CreateFormScreen;