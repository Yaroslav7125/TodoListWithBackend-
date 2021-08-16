<template>
  <div class="todo-content">
    <div id="app">
      <h1>My todo list!</h1>
      <AddTodo
        userInput="userInput"
        @updateUserInput="userInput = $event"
        @addTodo="pushTodo"
      />
      <TodoList
        :todos="filteredTodos"
        @deleteTodo="deleteTodo"
        @сhangeTodoCompleted="changeTodoCompleted"
        @changeTodoTitle="changeTodoTitle"
      />
    </div>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import AddTodo from '@/components/AddTodo.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    TodoList,
    AddTodo,
  },
  data () {
    return {
      todos: Array,
      userInput: '',
    };
  },
  methods: {
    async pushTodo (newTodo) {
        axios.post('http://localhost:3001/tasks', newTodo).then((resp)=>{
       axios.get('http://localhost:3001/tasks').then((response)=>{
         this.todos = response.data;
       });
     });
    },
    deleteTodo (id) {
      axios.delete(`http://localhost:3001/tasks/${id}`).then(()=>{
        this.todos = this.todos.filter(t => t.id !== id);
      });
    },
     changeTodoCompleted (id) {
       let todo = this.todos.filter((todo)=>todo.id == id);
       axios.put(`http://localhost:3001/tasks/change-completed/${id}`, {todoCompleted:!todo[0].completed}).then(()=>{
        todo[0].completed = !todo[0].completed;
      });
    },
    changeTodoTitle (id, strTitle) {

      let index  = this.todos.findIndex((elm)=> elm.id == id);
      axios.put(`http://localhost:3001/tasks/change-title/${id}`, {strTitle:strTitle}).then(()=>{
        this.todos[index].title = strTitle;
      });
    },
  },

  computed: {
    filteredTodos: function () {
      if (this.userInput != '') {
        return this.todos.filter(t => t.title.includes(this.userInput));
      } else {
        return this.todos;
      }
    },
  },
  mounted: function () {
    axios.get('http://localhost:3001/tasks').then((response)=>{
      this.todos = response.data;
    });
  },
};


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.todo-content{
  padding-top: 24px;
}
</style>
