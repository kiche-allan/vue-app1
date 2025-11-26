<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="todo-checkbox"
    />
    <div class="todo-content">
      <p v-if="!editing" class="todo-text">{{ todo.text }}</p>
      <input
        v-else
        v-model="editText"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        class="edit-input"
        autofocus
      />
    </div>
    <div class="todo-actions">
      <button
        v-if="!editing"
        @click="startEdit"
        class="edit-btn"
        title="Edit"
      >
        ‚úèÔ∏è
      </button>
      <button
        v-else
        @click="saveEdit"
        class="save-btn"
        title="Save"
      >
        ‚úì
      </button>
      <button
        v-if="editing"
        @click="cancelEdit"
        class="cancel-btn"
        title="Cancel"
      >
        ‚úï
      </button>
      <button
        v-if="!editing"
        @click="$emit('delete', todo.id)"
        class="delete-btn"
        title="Delete"
      >
        Ì∑ëÔ∏è
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      editText: ''
    }
  },
  methods: {
    startEdit() {
      this.editing = true
      this.editText = this.todo.text
    },
    saveEdit() {
      if (this.editText.trim()) {
        this.$emit('update', this.todo.id, { text: this.editText.trim() })
        this.editing = false
      }
    },
    cancelEdit() {
      this.editing = false
      this.editText = ''
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  gap: 12px;
}

.todo-item:hover {
  background: #f0f0f0;
  border-color: #d0d0d0;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

.todo-content {
  flex: 1;
  min-width: 0;
}

.todo-text {
  margin: 0;
  font-size: 1rem;
  word-break: break-word;
  color: #333;
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #667eea;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.todo-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 5px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.edit-btn, .save-btn {
  color: #2196f3;
}

.cancel-btn {
  color: #ff9800;
}

.delete-btn {
  color: #f44336;
}

.delete-btn:hover {
  background: rgba(244, 67, 54, 0.1);
}
</style>
