class Court {
    constructor({
      id,
      name,
      type,
      tips,
      status,
      created_date: createdDate,
      updated_date: updatedDate,
    }) {
      this.court = {
        id: String,
        tips: String,
        name: String,
        type: Number,
        status: Number,
        created_date: Number,
        updated_date: Number,
      }
      this.court.id = id
      this.court.name = name
      this.court.status = status
      this.court.type = type
      this.court.tips = tips
      this.court.created_date = createdDate
      this.court.updated_date = updatedDate
    }
  
    getData() {
      const { court } = this
      const courtWithNoNull = { ...this.court }
  
      const properties = Object.getOwnPropertyNames(this.court)
  
      properties.forEach((property) => {
        if (Reflect.get(this.court, property) == null) {
          Reflect.deleteProperty(courtWithNoNull, property)
        }
      })
  
      return { court, courtWithNoNull }
    }
  
    get id() {
      return this.court.id === undefined ? null : this.court.id
    }
  
    set id(value) {
      this.court.id = value
    }
  
    get type() {
        return this.court.type === undefined ? null : this.court.type
      }
    
    set type(value) {
        this.court.type = value
    }

    get tips() {
        return this.court.tips === undefined ? null : this.court.tips
      }
    
    set tips(value) {
        this.court.tips = value
    }
    
    get status() {
      return this.court.status === undefined ? null : this.court.status
    }
  
    set status(value) {
      this.court.status = value
    }
    
    get createdDate() {
      return this.court.created_date === undefined
        ? null
        : this.court.created_date
    }
  
    set createdDate(value) {
      this.court.created_date = value
    }
  
    get updatedDate() {
      return this.court.updated_date === undefined
        ? null
        : this.court.updated_date
    }
  
    set updatedDate(value) {
      this.court.updated_date = value
    }
  }
  
  module.exports = Court
  