const cors = require('@koa/cors');
const Koa = require('koa');
const  {DataTypes,Sequelize} = require('sequelize');
const Router = require('koa-router');
const koaBody = require('koa-body');

const koa = new Koa();
const router = new Router();
koa.use(cors());

/// db connecting
const sequelize = new Sequelize('TodoDB', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = sequelize.define('TodoTasks', {
    title: {
        type: DataTypes.TEXT,
    },
    completed: {
        type: DataTypes.BOOLEAN,
    },
});
(async ()=>{
    await sequelize.sync();//{ force: true }
})();

async function getData(){
    let theData = await User.findAll({
        attributes: ['id', 'title', 'completed'],
    });
    let todos = [];
    theData.forEach((elm)=>{
        todos.push(elm.dataValues);
    });
    return todos;
};

async function addData(todo){ // принимает обьект task с полями title, completed
    if(todo.title){
        let addedTodo = await User.create({title:`${todo.title}`, completed:`${todo.completed}`});
        return addedTodo.id;
    } else{
        return 'error';
    }
};

async function deleteData(delId){ // принимает id элемента который следует удалить
    await User.destroy({
        attributes: ['id', 'title', 'completed'],
        where:{
           id:delId,
       },
    });
};

async function getDataById(dataId){ // принимает id элемента - который вернёт
    let theData = await User.findAll({
        attributes: ['id', 'title', 'completed'],
        where:{
            id: dataId,
        },
    });
    return theData;
};

async function changeCompleted(dataId){//принимает id элемента который нужно изменить
    getDataById(dataId).then((data)=>{
        const todo = data[0].dataValues;
        (async ()=>{
            await User.update({completed:!todo.completed}, {
                where:{
                    id:todo.id,
                },
            });
        })();
    });
};

async function changeTitleTodo(todoId, newTitle){
    const changedTodo = await User.update({title:newTitle}, {
        where:{
            id:todoId,
        },
    });
    return changedTodo;
};

///end db connected
router.get('/tasks',async (ctx)=>{ /// следует вернуть все таски        READ
        let todos = await getData();
        ctx.body = (todos);
})
    .get('/tasks/:id', async (ctx)=>{  // принимает id таски которую возвращает        READ
        let task = await getDataById(ctx.params.id);
        ctx.body = task[0];         ///// dev
    });
router.post('/tasks', async (ctx)=>{  // принимает обьект таски которую сетит в бд      CREATE
    let newTodo = (ctx.request.body);
    let id = await addData(newTodo);
    newTodo.id = id;
    ctx.response.body = newTodo;
});

router.put('/tasks/change-title/:id/:newTitle', async (ctx)=>{ // принимает id и новый title     UPDATE
   ctx.body = await changeTitleTodo(ctx.params.id, ctx.params.newTitle);
});

router.put('/tasks/change-completed/:id',(ctx)=>{ // принимает id и меняет completed у соответвующей таски    UPDATE
    changeCompleted(ctx.params.id);
});

router.delete('/tasks/:id', (ctx)=>{ // принимает id на удаление       DELETE
    deleteData(ctx.params.id);
    ctx.body = {id:ctx.params.id};
});
koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(3001);
