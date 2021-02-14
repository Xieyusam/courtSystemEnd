const OrderService = require('../../service/order')
const Response = require('../../utils/response')

async function newOrder(ctx) {
    ctx.request.body.status = 0
    const response = new Response()
    const checkresult = await OrderService.checkOrder({
        ctx
    })
if(checkresult){
    response.FAIL = 503
    response.DATA = {
      msg: '该场地时间段已经注册'
    }
    ctx.body = response.getData()
}else{

    const result = await OrderService.newOrder({
        ctx
    })
    if (result.result) {
        response.SUCCESS = 200
        response.DATA = result
    } else {
        response.FAIL = 500
        response.DATA = '错误'
    }
    ctx.body = response.getData()
}

}

async function getAllOrder(ctx) {

    const result = await OrderService.getAllOrder()
    let response = new Response()
    response.SUCCESS = 200
    response.DATA = {
        count: result.length,
        Orders: result
    }
    ctx.body = response.getData()
}

async function getOrder(ctx) {
    const {
        id
    } = ctx.request.body
    console.log({id})
    const result = await OrderService.getOrder({id})
    const response = new Response()
    response.SUCCESS = 200
    response.DATA = {
        count: result.length,
        Orders: result
    }
    ctx.body = response.getData()
}

async function OrderByDate(ctx) {
    const {
        courtId,date
    } = ctx.request.body
    const result = await OrderService.OrderByDate({
        courtId,date
    })
    const response = new Response()
    response.SUCCESS = 200
    response.DATA = {
        count: result.length,
        Orders: result
    }
    ctx.body = response.getData()
}

async function delOrder(ctx) {
    const {
        id
    } = ctx.request.body

    const result = await OrderService.delOrder({
        id
    })

    const response = new Response()

    if (result) {
        response.SUCCESS = 200
        response.DATA = '删除成功'
    } else {
        response.FAIL = 500
        response.DATA = '删除错误'
    }
    ctx.body = response.getData()
}

async function setOrder(ctx) {
    const {
        id
    } = ctx.request.body
    const result = await OrderService.setOrder({
        ctx,
        id
    })
    const response = new Response()
    if (result) {
        response.SUCCESS = 200
        response.DATA = '修改成功'
    } else {
        response.FAIL = 500
        response.DATA = '错误'
    }
    ctx.body = response.getData()
}

module.exports = {
    newOrder,
    getAllOrder,
    delOrder,
    setOrder,
    getOrder,
    OrderByDate
}