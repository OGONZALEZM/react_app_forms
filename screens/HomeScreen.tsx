import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import SubmitButton from '../components/SubmitButton';
import { selectAllPolls } from '../store/pollSlice';
import { selectAllForms } from '../store/formSlice';

const HomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'polls' | 'forms'>('polls');
  const polls = useSelector(selectAllPolls);
  const forms = useSelector(selectAllForms);

  const renderPollItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.question}</Text>
      {item.answer ? (
        <Text style={styles.answeredText}>{item.answer}</Text>
      ) : (
        <Pressable
          style={styles.answerButton}
          onPress={() => navigation.navigate('AnswerPoll', { pollId: item.pollId })}
        >
          <Text style={styles.answerButtonText}>Answer Now</Text>
        </Pressable>
      )}
    </View>
  );

  const renderFormItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      {item.answers ? (
        <Text style={styles.answeredText}>Submitted</Text>
      ) : (
        <Pressable
          style={styles.answerButton}
          onPress={() => navigation.navigate('AnswerForm', { formId: item.formId })}
        >
          <Text style={styles.answerButtonText}>Answer Now</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'polls' && styles.activeTab]}
          onPress={() => setActiveTab('polls')}
        >
          <Text style={[styles.tabText, activeTab === 'polls' && styles.activeTabText]}>Polls</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'forms' && styles.activeTab]}
          onPress={() => setActiveTab('forms')}
        >
          <Text style={[styles.tabText, activeTab === 'forms' && styles.activeTabText]}>Forms</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={activeTab === 'polls' ? polls : forms}
          keyExtractor={(item) => (activeTab === 'polls' ? item.pollId : item.formId)}
          renderItem={activeTab === 'polls' ? renderPollItem : renderFormItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No {activeTab} available.</Text>}
        />
        <SubmitButton
          label={`Add New ${activeTab === 'polls' ? 'Poll' : 'Form'}`}
          onPress={() =>
            navigation.navigate(activeTab === 'polls' ? 'CreatePoll' : 'CreateForm')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    margin: 20,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6200ee',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    padding: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  answerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  answerButtonText: {
    color: '#6200ee',
    fontWeight: '500',
  },
  answeredText: {
    fontSize: 14,
    color: 'green',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
});

export default HomeScreen;