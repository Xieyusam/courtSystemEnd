class Order {
    constructor({
        id,
        user_id: userId,
        user_name: userName,
        court_id: courtId,
        court_name: courtName,
        type,
        phone,
        date,
        datetype,
        status,
        created_date: createdDate,
        updated_date: updatedDate,
    }) {
        this.order = {
            id: String,
            user_id: String,
            court_id: String,
            user_name: String,
            court_name: String,
            type: Number,
            date: String,
            phone:String,
            datetype: Number,
            status: Number,
            created_date: Number,
            updated_date: Number,
        }
        this.order.id = id
        this.order.user_id = userId
        this.order.court_id = courtId
        this.order.user_name = userName
        this.order.court_name = courtName
        this.order.type = type
        this.order.date = date
        this.order.phone = phone
        this.order.datetype = datetype
        this.order.status = status
        this.order.created_date = createdDate
        this.order.updated_date = updatedDate
    }

    getData() {
        const {
            order
        } = this
        const orderWithNoNull = {
            ...this.order
        }

        const properties = Object.getOwnPropertyNames(this.order)

        properties.forEach((property) => {
            if (Reflect.get(this.order, property) == null) {
                Reflect.deleteProperty(orderWithNoNull, property)
            }
        })

        return {
            order,
            orderWithNoNull
        }
    }

    get id() {
        return this.order.id === undefined ? null : this.order.id
    }

    set id(value) {
        this.order.id = value
    }

    get userId() {
        return this.order.user_id === undefined ? null : this.order.user_id
    }

    set userId(value) {
        this.order.user_id = value
    }

    get courtId() {
        return this.order.court_id === undefined ? null : this.order.court_id
    }

    set courtId(value) {
        this.order.court_id = value
    }

    get userName() {
        return this.order.user_name === undefined ? null : this.order.user_name
    }

    set userName(value) {
        this.order.user_name = value
    }

    get courtName() {
        return this.order.court_name === undefined ? null : this.order.court_name
    }

    set courtName(value) {
        this.order.court_name = value
    }

    get type() {
        return this.order.type === undefined ? null : this.order.type
    }

    set type(value) {
        this.order.type = value
    }
    get phone() {
        return this.order.phone === undefined ? null : this.order.phone
    }

    set phone(value) {
        this.order.phone = value
    }
    get date() {
        return this.order.date === undefined ? null : this.order.date
    }

    set date(value) {
        this.order.date = value
    }
    get datetype() {
        return this.order.datetype === undefined ? null : this.order.datetype
    }

    set datetype(value) {
        this.order.datetype = value
    }
    get status() {
        return this.order.status === undefined ? null : this.order.status
    }

    set status(value) {
        this.order.status = value
    }

    get createdDate() {
        return this.order.created_date === undefined ?
            null :
            this.order.created_date
    }

    set createdDate(value) {
        this.order.created_date = value
    }

    get updatedDate() {
        return this.order.updated_date === undefined ?
            null :
            this.order.updated_date
    }

    set updatedDate(value) {
        this.order.updated_date = value
    }
}

module.exports = Order