const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const  {DataTypes,QueryTypes,Sequelize} = require('sequelize')


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
    if(`${todo.completed}`&&todo.title){
        await User.create({title:`${todo.title}`, completed:`${todo.completed}`});
        console.log(`Add data: ${todo.completed} ${todo.title}`);

    } else{
        console.log(`Data with: ${todo.completed} ${todo.title} not pushing`);
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
    });
}
//getData();          ///dev
///end db connected


/*router.options('/tasks', (ctx)=>{
    ctx.set('Access-Control-Allow-Origin', '')
});*/

router.get('/tasks',(ctx)=>{ /// следует вернуть все таски
    /*ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');*/
   /*
     getData().then( (todos)=>{
        ctx.body = JSON.stringify(todos);
    })
   */
    (async()=>{
        let todos = await getData();
        ctx.body = JSON.stringify(todos);
        console.log(todos);
    })()
})
    .get('/tasks/:id',(ctx)=>{  // принимает id таски которую возвращяет
        //ctx.body = "/tasks/:id";
        getDataById(ctx.params.id).then((result)=>{
            ctx.body = JSON.stringify(result[0].dataValues);
            console.log(JSON.stringify(result[0].dataValues));
        })

    });


router.post('/tasks', (ctx)=>{  // принимает обьект таски которую сетит в бд
    /*
    console.log(ctx.request.body); // принимаем
   //  = "hello";
    ctx.body = "hello"; // отвечаем
    */
    console.log(ctx.request.body);
    let newTodo = JSON.parse(ctx.request.body);
    addData(newTodo);
});

router.put('/tasks/:id/:newTitle',(ctx)=>{ // принимает id и новый title
    changeTitleTodo(ctx.params.id, ctx.params.newTitle);
});

router.delete('/tasks/:id/', (ctx)=>{ // принимает id на удаление
    deleteData(ctx.params.id);
})




koa.use(require('koa-body')())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(3000);
