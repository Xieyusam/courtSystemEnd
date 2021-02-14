const Router = require('koa-router')
// 引入路由模块
const user = require('../controller/user')
const court = require('../controller/court')
const order = require('../controller/order')




// 首页路由
const index = new Router()

// TODO: 用户相关路由
const UserRouter = new Router()
UserRouter.get('/user/:id', user.getUserById)
UserRouter.post('/user/register', user.newUser)
UserRouter.post('/login', user.login)
UserRouter.post('/user/change', user.setUser)
UserRouter.del('/user/:id', user.delUser)
UserRouter.get('/AllUser', user.getAllUser)
UserRouter.post('/delMoreUser', user.delMoreUser)
UserRouter.post('/resetPassword', user.resetPassword)
UserRouter.post('/newPassword', user.newPassword)

// TODO: 球场相关路由
const CourtRouter = new Router()
CourtRouter.post('/newCourt', court.newCourt)
CourtRouter.get('/AllCourt', court.getAllCourt)
CourtRouter.post('/delCourt', court.delCourt)
CourtRouter.post('/setCourt', court.setCourt)
CourtRouter.post('/getCourtWithOrder', court.getCourtWithOrder)

// TODO: 订场相关路由
const OrderRouter = new Router()
OrderRouter.post('/newOrder', order.newOrder)
OrderRouter.get('/AllOrder', order.getAllOrder)
OrderRouter.post('/delOrder', order.delOrder)
OrderRouter.post('/setOrder', order.setOrder)
OrderRouter.post('/getOrder', order.getOrder)
OrderRouter.post('/OrderByDate', order.OrderByDate)


module.exports = {
    index, UserRouter , CourtRouter,OrderRouter
}