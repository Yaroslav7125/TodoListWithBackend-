<template>
  <div class="container">
    <div class="container-inner">
      <input :checked="todo.completed" class="checkbox" @click="changeCompleted" type="checkbox">
      <h2 :class="{done: this.todo.completed}" v-if="!editTodo">
        {{ (index+1) + ' '+ todo.title }}
      </h2>
      <input class="form-control" :value="todo.title" v-else type="text" @input="changeTodoTitle($event.target.value) ">
      <button class="btn btn-primary" @click="changeEditTodos()">
        Edit
      </button>
      <button @click="deleteTodo" class="btn btn-outline-dark">
        X
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo', 'index'],
  data () {
    return {
      editTitle: '',
      editTodo: false,
    };
  },
  methods: {
    changeEditTodos () {
      this.editTodo = !this.editTodo;
      this.$emit('changeTodoTitle', this.index, this.editTitle);
    },
    changeCompleted () {
      this.$emit('changeTodoCompleted', this.index);
    },
    changeTodoTitle (StrTitle) {
      this.editTitle = StrTitle;
    },
    deleteTodo () {
      this.$emit('deleteTodo', this.todo.id);
    },
  },
};
</script>

<style scoped>
 .container{
     display: flex;
     justify-content: center;
 }
 .container-inner{
   display: flex;
   align-items: center;
   border:1px solid grey;
   margin: 5px;
   border-radius: 8px;
   background-color: #fff;
 }
 .form-control{
     width: 500px;
 }
 .btn{
     margin: 15px ;
 }
 h2{
     width: 500px;
 }
 .checkbox{
     margin: 15px;
     width: 100px;
 }
 .done{
     text-decoration: line-through;
 }
</style>
