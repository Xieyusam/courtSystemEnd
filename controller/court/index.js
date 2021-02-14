const CourtService = require('../../service/court')
const OrderService = require('../../service/order')
const Response = require('../../utils/response')

async function newCourt(ctx) {
    ctx.request.body.status = 0
    const response = new Response()
    const result = await CourtService.newCourt({
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

async function getAllCourt(ctx) {
    const result = await CourtService.getAllCourt()
    const response = new Response()
    response.SUCCESS = 200
    response.DATA = {
        count: result.length,
        Courts: result
    }
    ctx.body = response.getData()
}

async function getCourtWithOrder(ctx) {
    const {
       day1,day2,day3
    } = ctx.request.body
    let result = await CourtService.getCourtWithOrder({
        day1,day2,day3
     })
    const response = new Response()
    response.SUCCESS = 200
    response.DATA = {
        count: result.length,
        Courts: result
    }
    ctx.body = response.getData()
}

async function delCourt(ctx) {
    const {
        id
    } = ctx.request.body

    const result = await CourtService.delCourt({
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

async function setCourt(ctx) {
    const {
        id
    } = ctx.request.body
    const result = await CourtService.setCourt({
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
    newCourt,
    getAllCourt,
    delCourt,
    setCourt,
    getCourtWithOrder
}