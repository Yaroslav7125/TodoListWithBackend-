import * as cors from '@koa/cors';
import * as Koa from 'koa';
import  {DataTypes,Sequelize, Dialect} from 'sequelize';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
// @ts-ignore
import * as todos from '../models/todostable';
import * as dotenv from 'dotenv';
dotenv.config();

const koa = new Koa();
const router = new Router();
koa.use(cors());

type Todo = {
    title:string,
    completed:boolean,
    id?:number,
    updatedAt?:Date,
    createdAt?:Date,
};

/// db connecting
const sequelize = new Sequelize(process.env.DB_NAME||'TodoDB', process.env.DB_LOGIN || 'postgres', process.env.DB_PASSWORD || '123', {
    host: process.env.HOST||'localhost',
    dialect: process.env.DIALECT as Dialect |'postgres',
});

let dbTodos = todos(sequelize, DataTypes);

async function getTodos() :Promise<Todo[]>{ // возвращает все таски
    let theTodo = await dbTodos.findAll();
    return theTodo.map((elm: { dataValues: any; })=>{
        return elm.dataValues;
    });
};

async function addTodo(todo: { title: string; completed: boolean; }):Promise<Todo|{}>{ // принимает обьект todo с полями title и completed, возвращает созданную туду
    if(todo.title){
        let addedTodo = await dbTodos.create({title:`${todo.title}`, completed:todo.completed});
        return addedTodo.dataValues;
    } else{
        return {};
    }
};

async function deleteTodo(todoId: number):Promise<number>{ // принимает id элемента который следует удалить
    await dbTodos.destroy({
        where:{
           id:todoId,
       },
    });
    return todoId;
};

async function changeCompleted(todoId: number, complFlag: boolean) :Promise<Todo>{//принимает id элемента который нужно изменить
    return (await dbTodos.update({completed:complFlag}, {
        where:{
            id:todoId,
        },returning:true,
    }))[1][0].dataValues;
};

async function changeTitleTodo(todoId: number, newTitle: string):Promise<Todo>{ // принимает id tido и новый title к нему, возвращает новую tod'ушку
     return (await dbTodos.update({title:newTitle}, {
        where:{
            id:todoId,
        }, returning:true,
    }))[1][0].dataValues;
};

///end db connected
router.get('/tasks',async (ctx:Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, Todo[]>)=>{ /// следует вернуть все таски        READ
    let todos = await getTodos();
    if(todos.length){
        ctx.body = (todos);
    } else {
        ctx.status = 204;
        ctx.body = [];
    }
})
    .post('/tasks', async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, Todo|{}>)=>{  // принимает обьект таски которую сетит в бд      CREATE
        let newTodo = <Todo>ctx.request.body;
        ctx.response.body = await addTodo(newTodo);
    })
    .put('/tasks/change-title/:id', async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, Todo|{}>)=>{ // принимает id и новый title     UPDATE
        let newTitle = <{strTitle:string}>ctx.request.body;
        ctx.body = await changeTitleTodo(Number(<{id:string}>ctx.params.id), newTitle.strTitle) as Todo | {};
    })
    .put('/tasks/change-completed/:id', async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, Todo|{}>)=>{ // принимает id и меняет completed у соответвующей таски    UPDATE
        let newCompleted = <{todoCompleted:boolean}>ctx.request.body;
        ctx.body = await changeCompleted(Number(<{id:string}>ctx.params.id), newCompleted.todoCompleted) as Todo | {};
    })
    .delete('/tasks/:id', async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, Todo|{}>)=>{ // принимает id на удаление       DELETE
        ctx.body = await deleteTodo((<{id:number}>ctx.params).id);
    });

koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(process.env.PORT || 3000);

