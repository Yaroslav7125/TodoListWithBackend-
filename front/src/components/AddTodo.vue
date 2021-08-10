<template>
    <div class="container">
            <div class="container-inner">
                <input class='form-control' type="text" v-model='valueTodo'>
                <button v-on:click='createTodo' class="btn btn-warning">Add</button>
                <input class='form-control form-control-search' :title='userInput' @input="$emit('updateUserInput', $event.target.value)" placeholder="Search..." type="text" >
            </div>
    </div>
</template>
<script>
export default{
  props:{
    userInput:String,
  },
  data(){
        return{
            valueTodo:'',
        }
  },
  methods:{
        createTodo(){
            if(this.valueTodo){
                const newTodo = {
                    id:Date.now(),
                    title:this.valueTodo,
                    completed:false,
                }
                this.$emit('addTodo', newTodo);
            } 
            this.valueTodo='';
        },
  },
}
</script>
<style scoped>
.container{
    display: flex;  
    justify-content: center;
}
.container-inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    border:1px solid grey;
    margin: 5px;
    border-radius: 3px;   
}
.form-control{
     width: 500px;
 }
 .form-control-search{
     width: 100px;
     margin-right: 15px;
 }
 .btn{
     margin: 15px ;
 }

</style>
