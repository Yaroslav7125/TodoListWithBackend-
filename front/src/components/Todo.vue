<template>
    <div class="container">
        <div class="container-inner">
                <input v-bind:checked="todo.completed" class="checkbox" v-on:click='changeCompleted' type="checkbox" >
            <h2 v-bind:class='{done: this.todo.completed}' v-if='!editTodo'>
                 {{(index+1) + ' ' + todo.title}}
            </h2>
            <input class='form-control' v-bind:value="todo.title" v-else type="text" v-on:input="changeTodoTitle($event.target.value)" >
            <button class="btn btn-primary" v-on:click="changeEditTodos()">Edit</button>
            <button v-on:click='deleteTodo' class="btn btn-outline-dark">X</button>
        </div>
    </div>
</template>

<script>
export default{
    props:['todo', 'index'],
    data(){
        return{
          editTodo:false,
        }
    },
    methods:{
        changeEditTodos(){
          this.editTodo= !this.editTodo;
          this.$emit('changeTodo');
        }, 
        changeCompleted(){
          this.$emit('changeTodoCompleted', this.index);
        },
        changeTodoTitle(strTitle){
          this.$emit('changeTodoTitle', this.index, strTitle)
        },
        deleteTodo(){
          this.$emit('deleteTodo', this.todo.id)
        }
    }
}
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
