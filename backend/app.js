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

async function addData(todo){
    if(todo.completed&&todo.title){
        await User.create({title:`${todo.title}`, completed:`${todo.completed}`});
        console.log(`Add data: ${todo.completed} ${todo.title}`);
    }
    else{
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

//getData();          ///dev
///end db connected


/*router.options('/tasks', (ctx)=>{
    ctx.set('Access-Control-Allow-Origin', '')
});*/

router.get('/tasks',(ctx)=>{ /// следует вернуть все таски
    /*ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');*/
    todosArr = new Array();
    getData().then((todos)=>{
       todosArr = todos;
    }).then(()=>{
        ctx  = todosArr;
    })


})
    .get('/tasks/:id',(ctx)=>{
        ctx.body = "/tasks/:id";
    });


router.post('/tasks', (ctx)=>{
    console.log(ctx.request.body);
   //  = "hello";
    ctx.body = "hello";
});



koa.use(require('koa-body')())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(3000);
