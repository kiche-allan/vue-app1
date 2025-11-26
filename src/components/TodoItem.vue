<template>
  <div :class="['todo-item', { completed: todo.completed }]">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="todo-checkbox"
    />
    <span class="todo-text">{{ todo.text }}</span>
    <button @click="$emit('delete')" class="delete-btn">×</button>
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
  emits: ['delete', 'toggle']
}
</script>

<style scoped>
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
</style>