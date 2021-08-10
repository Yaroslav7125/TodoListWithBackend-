<template>
  <div id="app">
    <h1>My todo list!</h1>
    <AddTodo
        userInput="userInput"
        v-on:updateUserInput  ="userInput = $event"
        v-on:addTodo='PushTodo'
    />
    <TodoList
        v-bind:todos='filteredTodos'
        v-on:deleteTodo="deleteTodo"
        v-on:changeTodoCompleted="changeTodoCompleted"
        v-on:changeTodoTitle="changeTodoTitle"
    />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import AddTodo from './components/AddTodo.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    AddTodo,
  },
  data() {
    return {
      todos: [
        { id:1,title:'купить хлеп', completed: false},
        { id:2,title:'купить матрас', completed: false},
        { id:3,title:'купить сено', completed: false},
      ],
      userInput: '',
    }
  },
  methods: {
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    PushTodo(newTodo) {
      this.todos.push(newTodo);
      this.saveTodos() // сетим в local Storage
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveTodos(); //сетим в local Storage
    },
    changeTodoCompleted(index) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveTodos(); // сетим при изм completed
    },
    changeTodoTitle(index, StrTitle){
      this.todos[index].title = StrTitle;
      this.saveTodos();// сетим при изменении title
    }
  },

  computed: {
    filteredTodos: function () {

      if (this.userInput != '') {
        return this.todos.filter(t => t.title.includes(this.userInput))
      } else {
        return this.todos;
      }
    },
  },
  mounted: function () {
    {
      if (JSON.parse(localStorage.getItem("todos"))) {
        this.todos = JSON.parse(localStorage.getItem("todos"));// читаем
      }
      else localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
