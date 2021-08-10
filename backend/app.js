const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

const koa = new Koa();
const router = new Router();
koa.use(cors());

taskList = [
    {id:0, title:"Buy milk", completed:false},
    {id:1, title:"Buy milk1", completed:false},
    {id:2, title:"Buy milk2", completed:false},
    {id:3, title:"Buy milk3", completed:false},
    {id:4, title:"Buy milk4", completed:false},
]


router.get('/tasks',(ctx)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    console.log(JSON.stringify(ctx))
    ctx.body = taskList;
})
    .get('/tasks/:id',(ctx)=>{
        ctx.body = taskList[ctx.params.id];
    })



koa.use(router.routes())
    .use(router.allowedMethods());

koa.listen(3000)
