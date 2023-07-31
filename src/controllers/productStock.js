export class ProductStock {
    constructor(_id, name, cost, price, category_id, images, status, stock_id){
        this._id = _id;
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.category_id = category_id;
        this.images = images;
        this.status = status;
        this.stock_id = stock_id
    }
}