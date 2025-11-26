<template>
  <div id="app" class="container">
    <header class="header">
      <h1>Todo App</h1>
      <p class="subtitle">Manage your tasks efficiently</p>
    </header>

    <main class="main-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading">Loading todos...</div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        {{ error }}
        <button @click="error = null" class="close-btn">✕</button>
      </div>

      <!-- Input Section -->
      <div class="input-section">
        <input
          v-model="newTodoText"
          @keyup.enter="addTodo"
          type="text"
          placeholder="Add a new todo..."
          class="todo-input"
        />
        <button @click="addTodo" class="add-btn">Add Todo</button>
      </div>

      <!-- Todos List -->
      <div class="todos-container">
        <div v-if="todos.length === 0" class="empty-state">
          <p>No todos yet. Add one to get started!</p>
        </div>

        <div v-else class="todos-list">
          <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @toggle="toggleTodo"
            @update="updateTodo"
            @delete="deleteTodo"
          />
        </div>
      </div>

      <!-- Stats -->
      <div v-if="todos.length > 0" class="stats">
        <p>Total: <strong>{{ todos.length }}</strong></p>
        <p>Completed: <strong>{{ completedCount }}</strong></p>
        <p>Remaining: <strong>{{ todos.length - completedCount }}</strong></p>
      </div>
    </main>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem.vue'
import todoService from './services/todoService'

export default {
  name: 'App',
  components: {
    TodoItem
  },
  data() {
    return {
      todos: [],
      newTodoText: '',
      loading: true,
      error: null
    }
  },
  computed: {
    completedCount() {
      return this.todos.filter(todo => todo.completed).length
    }
  },
  methods: {
    async fetchTodos() {
      try {
        this.loading = true
        this.error = null
        const response = await todoService.getTodos()
        this.todos = response.data
      } catch (error) {
        this.error = 'Failed to fetch todos. Please try again.'
        console.error('Error fetching todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addTodo() {
      if (!this.newTodoText.trim()) {
        this.error = 'Please enter a todo text'
        return
      }

      try {
        this.error = null
        const response = await todoService.createTodo(this.newTodoText)
        this.todos.unshift(response.data)
        this.newTodoText = ''
      } catch (error) {
        this.error = 'Failed to add todo. Please try again.'
        console.error('Error adding todo:', error)
      }
    },

    async toggleTodo(id) {
      try {
        this.error = null
        const todo = this.todos.find(t => t.id === id)
        const response = await todoService.updateTodo(id, {
          completed: !todo.completed
        })
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = response.data
      } catch (error) {
        this.error = 'Failed to update todo. Please try again.'
        console.error('Error toggling todo:', error)
      }
    },

    async updateTodo(id, updatedTodo) {
      try {
        this.error = null
        const response = await todoService.updateTodo(id, updatedTodo)
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = response.data
      } catch (error) {
        this.error = 'Failed to update todo. Please try again.'
        console.error('Error updating todo:', error)
      }
    },

    async deleteTodo(id) {
      try {
        this.error = null
        await todoService.deleteTodo(id)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (error) {
        this.error = 'Failed to delete todo. Please try again.'
        console.error('Error deleting todo:', error)
      }
    }
  },
  mounted() {
    this.fetchTodos()
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  padding-top: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.main-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.loading {
  text-align: center;
  padding: 40px 20px;
  color: #667eea;
  font-size: 1.1rem;
}

.error-message {
  background: #fee;
  border-left: 4px solid #f44336;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #d32f2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  opacity: 0.7;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.todo-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

.todos-container {
  margin-bottom: 20px;
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
  text-align: center;
}

.stats p {
  color: #666;
  font-size: 0.95rem;
}

.stats strong {
  color: #667eea;
  font-size: 1.3rem;
  display: block;
  margin-top: 5px;
}
</style>
