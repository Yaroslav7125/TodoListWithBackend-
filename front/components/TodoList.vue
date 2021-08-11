<template>
  <div class="content">
    <Todo
      v-for="(todo, index) in todos"
      :todo="todo"
      :index="index"
      :key="todo.id"
      @deleteTodo="deleteTodo"
      @changeTodoTitle="changeTodoTitle"
      @changeTodoCompleted="changeTodoCompleted"
    />
  </div>
</template>

<script>
import Todo from './Todo.vue';
export default {
  props: ['todos'],
  components: {
    Todo: Todo,
  },
  methods: {
    deleteTodo (id) {
      this.$emit('deleteTodo', id);
    },
    changeTodoTitle (index, StrTitle) {
      ///
      this.$emit('changeTodoTitle', index, StrTitle);
    },
    changeTodoCompleted (index) {
      this.$emit('сhangeTodoCompleted', index);
    },
  },
};
</script>
