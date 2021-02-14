const {
  mysql
} = require('../../database/mysql')
const Order = require('../../model/order')
const Uuid = require('../../utils/uuid')

class OrderService {
  //添加新订场订单
  static async newOrder({
    ctx
  }) {
    let newOrderInfo = {}
    newOrderInfo = ctx.request.body
    const order = new Order(newOrderInfo)
    order.id = new Uuid().uuid
    order.createdDate = new Date()
    console.log(order.getData().order)

    const result = await mysql('order').insert(order.getData().order)
    return result[0] === 0 ? {
      result: true,
      order: order.getData().order
    } : {
      result: false
    }
  }

  //获取所有订场订单
  // static async getAllOrder() {
  //   const result = await mysql('order')
  //     .join('user', {
  //       'user.id': 'order.user_id'
  //     })
  //     .join('court', {
  //       'court.id': 'order.court_id'
  //     })
  //     .select('order.id', 'order.user_id', 'order.court_id', {
  //       "user_name": "user.name"
  //     }, {
  //       "court_name": "court.name"
  //     }, "order.status", "order.datetype", "order.date", "order.created_date", "order.updated_date")
  //     .orderBy('order.created_date', 'desc')
  //   const OrdersInfo = []
  //   result.forEach((OrderInfo) => {
  //     OrdersInfo.push(OrderInfo)
  //   })
  //   return OrdersInfo
  // }

  //获取所有订场订单
  static async getAllOrder() {
    const result = await mysql('order')
      .select()
      .orderBy('created_date', 'desc')
    const OrdersInfo = []
    result.forEach((OrderInfo) => {
      OrdersInfo.push(OrderInfo)
    })
    return OrdersInfo
  }

  //获取某人的订场订单
  static async getOrder({
    id
  }) {
    const result = await mysql('order').where({
        user_id: id
      })
      .select()
      .orderBy('created_date', 'desc')
    const OrdersInfo = []
    result.forEach((OrderInfo) => {
      OrdersInfo.push(OrderInfo)
    })
    return OrdersInfo
  }
  //获取某天某个场的订场订单
  static async OrderByDate({
    courtId,
    date
  }) {
    const result = await mysql('order').where({
        court_id: courtId,
        date: date
      })
      .select()
      .orderBy('created_date', 'desc')
    const OrdersInfo = []
    result.forEach((OrderInfo) => {
      OrdersInfo.push(OrderInfo)
    })
    return OrdersInfo
  }
  // 删除某个订场订单
  static async delOrder({
    id
  }) {
    const result = await mysql('order')
      .where({
        id
      })
      .del()

    return result === 1
  }
  // 订场订单信息更新
  static async setOrder({
    ctx,
    id
  }) {
    let updateOrderInfo = {}
    updateOrderInfo = ctx.request.body
    const order = new Order(updateOrderInfo)
    const updateInfo = order.getData().orderWithNoNull
    Reflect.deleteProperty(updateInfo, 'id')
    Reflect.deleteProperty(updateInfo, 'created_date')
    Reflect.deleteProperty(updateInfo, 'updated_date')
    const result = await mysql('order').where({
      id
    }).update(updateInfo)
    return result === 1
  }

   
static async checkOrder({ ctx }) {
  let OrderInfo = {}
  let newOrderInfo = ctx.request.body
  const order = new Order(newOrderInfo)
  console.log(order.getData().orderWithNoNull)
  await mysql('order')
    .where(order.getData().orderWithNoNull)
    .select()
    .then((raw) => {
      [OrderInfo] = raw
    })
    if(OrderInfo){
      const order2 = new Order(OrderInfo)
      return order2.getData()
    }else{
      return undefined
    }

}
}


module.exports = OrderService