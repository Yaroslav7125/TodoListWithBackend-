<template>
    <div class="content">
        <Todo 
        v-for="(todo, index) in todos"
        v-bind:todo='todo'
        v-bind:key="todo.id"
        v-bind:index='index'
        v-on:deleteTodo="deleteTodo"
        v-on:changeTodoTitle="changeTodoTitle"
        v-on:changeTodoCompleted="changeTodoCompleted"
        />
    </div>
</template>

<script>
import Todo from './Todo.vue'
export default{
    props:['todos'],
    components:{
        Todo:Todo,
    },
    methods:{
      deleteTodo(id){
          this.$emit('deleteTodo', id);
      },
      changeTodoTitle(index, strTitle){
          this.$emit('changeTodoTitle', index, strTitle);
      },
      changeTodoCompleted(index){
          this.$emit('changeTodoCompleted', index);
      },
    },
}
</script>
