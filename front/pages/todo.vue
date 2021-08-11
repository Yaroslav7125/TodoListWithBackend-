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
      todos: [
        { id: 1, title: 'купить хлеп', completed: false },
        { id: 2, title: 'купить матрас', completed: false },
        { id: 3, title: 'купить сено', completed: false },
      ],
      userInput: '',
    };
  },
  methods: {
    async pushTodo (newTodo) {
       await axios.post('http://localhost:3001/tasks', newTodo).then((resp)=>{
       this.todos.push(resp.data);
     });
    },
    deleteTodo (id) {
      axios.delete(`http://localhost:3001/tasks/${id}`).then(()=>{
        this.todos = this.todos.filter(t => t.id !== id);
      });
    },
    changeTodoCompleted (id) {
      axios(`http://localhost:3001/tasks/change-completed/${id}`).then(()=>{
        let todo = this.todos.filter((todo)=>todo.id == id);
        todo[0].completed = !todo[0].completed;
      });
    },
    changeTodoTitle (id, StrTitle) {

      let index  = this.todos.findIndex((elm)=> elm.id == id);
      axios.put(`http://localhost:3001/tasks/change-title/${id}/${StrTitle}`).then(()=>{
        this.todos[index].title = StrTitle;
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
