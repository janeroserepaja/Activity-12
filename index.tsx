import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Task = {
  id: string;
  title: string;
};

export default function TodoListScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task.trim(),
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Task List</Text>

        <Text style={styles.subtitle}>
          Stay organized and get things done
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#9A8FA8"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>
            Add Task
          </Text>
        </TouchableOpacity>

      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          My Tasks
        </Text>

        <Text style={styles.taskCount}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </Text>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>
                ✓
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No tasks yet
            </Text>

            <Text style={styles.emptyText}>
              Add your first task above
            </Text>

          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>

            <View style={styles.taskCircle}>
              <Text style={styles.check}>
                ✓
              </Text>
            </View>

            <Text style={styles.taskText}>
              {item.title}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>
                ×
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2FF',
  },

  /* Header */
  header: {
    paddingTop: 25,
    paddingBottom: 30,
    marginHorizontal: 28,
    alignItems: 'center',
  },

  title: {
    fontSize: 29,
    fontWeight: '700',
    color: '#4B3B61',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#8A78A6',
    marginTop: 8,
    textAlign: 'center',
  },

  /* Input */
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5D9F2',
    marginBottom: 36,
  },

  input: {
    height: 50,
    backgroundColor: '#F8F5FC',
    borderRadius: 13,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#4B3B61',
  },

  addButton: {
    height: 50,
    backgroundColor: '#9B7BC1',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  /* List Header */
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 28,
    marginBottom: 20,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B3B61',
  },

  taskCount: {
    fontSize: 13,
    color: '#8A78A6',
  },

  /* FlatList */
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 50,
  },

  /* Task Card */
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EDE5F5',
  },

  taskCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0E8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  check: {
    color: '#9B7BC1',
    fontSize: 19,
    fontWeight: '700',
  },

  taskText: {
    flex: 1,
    fontSize: 15,
    color: '#51465B',
    paddingRight: 10,
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#FCECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteText: {
    fontSize: 23,
    color: '#C56B7A',
    lineHeight: 25,
  },

  /* Empty State */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EDE3F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIcon: {
    color: '#9B7BC1',
    fontSize: 34,
    fontWeight: '600',
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#4B3B61',
    marginTop: 17,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 13,
    color: '#9A8FA8',
    marginTop: 6,
    textAlign: 'center',
  },
});