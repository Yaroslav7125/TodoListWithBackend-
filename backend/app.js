"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cors = require("@koa/cors");
var Koa = require("koa");
var sequelize_1 = require("sequelize");
var Router = require("koa-router");
var koaBody = require("koa-body");
var todos = require("./models/todostable");
var dotenv = require("dotenv");
dotenv.config();
var koa = new Koa();
var router = new Router();
koa.use(cors());
var sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'TodoDB', process.env.DB_LOGIN || 'postgres', process.env.DB_PASSWORD || '123', {
    host: process.env.HOST || 'localhost',
    dialect: 'postgres'
});
var dbTodos = todos(sequelize, sequelize_1.DataTypes);
function getTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var theTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, dbTodos.findAll()];
                case 1:
                    theTodo = _a.sent();
                    return [2, theTodo.map(function (elm) {
                            return elm.dataValues;
                        })];
            }
        });
    });
}
;
function addTodo(todo) {
    return __awaiter(this, void 0, void 0, function () {
        var addedTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!todo.title) return [3, 2];
                    return [4, dbTodos.create({ title: "" + todo.title, completed: todo.completed })];
                case 1:
                    addedTodo = _a.sent();
                    return [2, addedTodo.dataValues];
                case 2: return [2, {}];
            }
        });
    });
}
;
function deleteTodo(todoId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, dbTodos.destroy({
                        where: {
                            id: todoId
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
;
function changeCompleted(todoId, complFlag) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, dbTodos.update({ completed: complFlag }, {
                        where: {
                            id: todoId
                        }, returning: true
                    })];
                case 1: return [2, (_a.sent())[1][0].dataValues];
            }
        });
    });
}
;
function changeTitleTodo(todoId, newTitle) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, dbTodos.update({ title: newTitle }, {
                        where: {
                            id: todoId
                        }, returning: true
                    })];
                case 1: return [2, (_a.sent())[1][0].dataValues];
            }
        });
    });
}
;
router.get('/tasks', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getTodos()];
            case 1:
                todos = _a.sent();
                if (todos.length) {
                    ctx.body = (todos);
                }
                else {
                    ctx.status = 204;
                    ctx.body = [];
                }
                return [2];
        }
    });
}); })
    .post('/tasks', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var newTodo, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newTodo = (ctx.request.body);
                _a = ctx.response;
                return [4, addTodo(newTodo)];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); })
    .put('/tasks/change-title/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, changeTitleTodo(ctx.params.id, ctx.request.body.strTitle)];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); })
    .put('/tasks/change-completed/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, changeCompleted(ctx.params.id, ctx.request.body.todoCompleted)];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); })["delete"]('/tasks/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, deleteTodo(ctx.params.id)];
            case 1:
                _a.sent();
                ctx.body = { id: ctx.params.id };
                return [2];
        }
    });
}); });
koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());
koa.listen(process.env.PORT || 3000);
//# sourceMappingURL=app.js.map