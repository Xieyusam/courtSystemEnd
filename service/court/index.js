const {
  mysql
} = require('../../database/mysql')
const Court = require('../../model/court')
const Uuid = require('../../utils/uuid')

class CourtService {
  //添加新球场
  static async newCourt({
    ctx
  }) {
    let newCourtInfo = {}
    newCourtInfo = ctx.request.body
    const court = new Court(newCourtInfo)
    court.id = new Uuid().uuid
    court.createdDate = new Date()
    const result = await mysql('court').insert(court.getData().court)
    return result[0] === 0 ? {
      result: true,
      court: court.getData().court
    } : {
      result: false
    }
  }

  //获取所有球场信息
  static async getAllCourt() {
    const result = await mysql('court').select().orderBy('created_date', 'desc')
    const CourtsInfo = []
    result.forEach((CourtInfo) => {
      CourtsInfo.push(CourtInfo)
    })
    return CourtsInfo
  }

    //获取所有球场信息(带订单)
    static async getCourtWithOrder({
      day1,day2,day3
   }) {
      const result = await mysql('court').select('court.*',
      {'day1':await mysql('order').select().where('court_id','=','court.id').andWhere({date:day1})
      },
      {'day2':
        await mysql('order').select().where('court_id','=','court.id').andWhere({date:day2})
      },
      {'day3':
        await mysql('order').select().where('court_id','=','court.id').andWhere({date:day3})
      }
      )
      const CourtsInfo = []
      result.forEach((CourtInfo) => {
        CourtsInfo.push(CourtInfo)
      })
      return CourtsInfo
    }
  // 删除某个球场
  static async delCourt({
    id
  }) {
    const result = await mysql('court')
      .where({
        id
      })
      .del()

    return result === 1
  }
  // 球场信息更新
  static async setCourt({
    ctx,
    id
  }) {
    let updateCourtInfo = {}
    updateCourtInfo = ctx.request.body
    const court = new Court(updateCourtInfo)
    const updateInfo = court.getData().courtWithNoNull
    Reflect.deleteProperty(updateInfo, 'id')
    Reflect.deleteProperty(updateInfo, 'created_date')
    Reflect.deleteProperty(updateInfo, 'updated_date')
    const result = await mysql('court').where({
      id
    }).update(updateInfo)
    return result === 1
  }
}


module.exports = CourtService