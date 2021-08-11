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
    changeTodoTitle (id, StrTitle) {
      ///
      this.$emit('changeTodoTitle', id, StrTitle);
    },
    changeTodoCompleted (id) {
      this.$emit('сhangeTodoCompleted', id);
    },
  },
};
</script>
