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
  completed: boolean;
};

export default function TodoListScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const filteredTasks = tasks.filter((item) => {
    if (filter === 'Pending') {
      return !item.completed;
    }

    if (filter === 'Completed') {
      return item.completed;
    }

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>My Task List</Text>

        <Text style={styles.subtitle}>
          Stay organized and get things done
        </Text>

        <Text style={styles.progress}>
          {completedTasks} of {tasks.length} tasks completed
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#9A8FA8"
          value={task}
          onChangeText={setTask}
          returnKeyType="done"
          onSubmitEditing={addTask}
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

      <View style={styles.filterContainer}>
        {['All', 'Pending', 'Completed'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>My Tasks</Text>
        <Text style={styles.taskCount}>
          {filteredTasks.length} tasks
        </Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>✓</Text>

            <Text style={styles.emptyTitle}>
              No tasks found
            </Text>

            <Text style={styles.emptyText}>
              Add a task or select another filter.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>

            <TouchableOpacity
              style={[
                styles.taskCircle,
                item.completed && styles.completedCircle,
              ]}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.check}>
                {item.completed ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>×</Text>
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

  progress: {
    fontSize: 12,
    color: '#9B7BC1',
    fontWeight: '600',
    marginTop: 8,
  },

  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5D9F2',
    marginBottom: 20,
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

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 25,
    gap: 10,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#EDE5F5',
  },

  activeFilter: {
    backgroundColor: '#9B7BC1',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#77658C',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

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

  listContent: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 50,
  },

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

  completedCircle: {
    backgroundColor: '#9B7BC1',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },

  taskText: {
    flex: 1,
    fontSize: 15,
    color: '#51465B',
    paddingRight: 10,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#9A8FA8',
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

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
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
