const cors = require('@koa/cors');
const Koa = require('koa');

const Router = require('koa-router');
const koaBody = require('koa-body');


const  {DataTypes,Sequelize} = require('sequelize')


const koa = new Koa();
const router = new Router();
koa.use(cors());


/// db connecting
const sequelize = new Sequelize('TodoDB', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
});

/*     // проверка подключения к базе
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
*/

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
        attributes: ['id', 'title', 'completed']
    });
    let todos = new Array();
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
        console.log(`Data with: ${todo.completed} ${todo.title} not pushing`);
        return "error";
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
                }
            });
        })();
    });
};

async function changeTitleTodo(todoId, newTitle){
    await User.update({title:newTitle}, {
        where:{
            id:todoId
        },
    })
};
//getData();          ///dev
///end db connected

/*
router.options('/tasks', (ctx)=>{
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
});
*/
router.get('/tasks',async (ctx)=>{ /// следует вернуть все таски
    /*ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

     getData().then( (todos)=>{
        ctx.body = JSON.stringify(todos);
    })

    */
        let todos = await getData();
        ctx.body = (todos);
        console.log(todos);
})
    .get('/tasks/:id', async (ctx)=>{  // принимает id таски которую возвращает
        //ctx.body = "/tasks/:id";
        let task = await getDataById(ctx.params.id);
        ctx.body = task[0];
        console.log(JSON.stringify(task));                ///// dev
    });

//{"title":"Buy ice","completed":false}
router.post('/tasks', async (ctx)=>{  // принимает обьект таски которую сетит в бд
    /*
    console.log(ctx.request.body); // принимаем
   //  = "hello";
    ctx.body = "hello"; // отвечаем
    */
    console.log(ctx.request.body);
    let newTodo = (ctx.request.body);
    let id = await addData(newTodo);
    newTodo.id = id
    ctx.response.body = newTodo;
});

router.put('/tasks/change-title/:id/:newTitle',(ctx)=>{ // принимает id и новый title
    changeTitleTodo(ctx.params.id, ctx.params.newTitle);
});

router.put('/tasks/change-completed/:id',(ctx)=>{ // принимает id и меняет completed у соответвующей таски
    changeCompleted(ctx.params.id);
});

router.delete('/tasks/:id', (ctx)=>{ // принимает id на удаление
    deleteData(ctx.params.id);
});

koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(3000);
