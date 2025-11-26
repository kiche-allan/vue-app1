<template>
  <div id="app">
    <div class="container">
      <h1>Vue Todo App</h1>
      
      <!-- Add Todo Form -->
      <div class="add-todo">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo"
          placeholder="What needs to be done?"
          class="todo-input"
        >
        <button @click="addTodo" class="add-btn">Add</button>
      </div>

      <!-- Todo List -->
      <div class="todo-list">
        <div 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          :class="['todo-item', { completed: todo.completed }]"
        >
          <input 
            type="checkbox" 
            v-model="todo.completed"
            class="todo-checkbox"
          >
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)" class="delete-btn">×</button>
        </div>
      </div>

      <!-- Filters and Stats -->
      <div class="footer">
        <div class="todo-count">
          {{ incompleteTodos }} items left
        </div>
        
        <div class="filters">
          <button 
            v-for="filter in filters" 
            :key="filter"
            @click="currentFilter = filter"
            :class="{ active: currentFilter === filter }"
          >
            {{ filter }}
          </button>
        </div>

        <button 
          v-if="hasCompleted"
          @click="clearCompleted"
          class="clear-btn"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newTodo: '',
      currentFilter: 'all',
      filters: ['all', 'active', 'completed'],
      todos: [
        { id: 1, text: 'Learn Vue.js', completed: true },
        { id: 2, text: 'Build a todo app', completed: false }
      ]
    }
  },
  computed: {
    filteredTodos() {
      switch (this.currentFilter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    },
    incompleteTodos() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    hasCompleted() {
      return this.todos.some(todo => todo.completed);
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo.trim(),
          completed: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-weight: 300;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e1e1e1;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #5a6fd8;
}

.todo-list {
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f9f9f9;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-checkbox {
  margin-right: 10px;
  transform: scale(1.2);
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #ff5252;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
}

.filters button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  border-radius: 3px;
}

.filters button.active {
  border-color: #667eea;
  color: #667eea;
}

.clear-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.clear-btn:hover {
  background: #ff5252;
}
</style>