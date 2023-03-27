import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[
        {
            pid: {
                type:mongoose.Schema.Types.ObjectId, 
                ref:'products'
            },
            quantity: {
                type: Number,
                default: 1
            },
            _id:false,
        }
    ]
});

cartSchema.pre('findOne',function(next){
    this.populate('products.pid')
    next()
})
export const cartModel = mongoose.model('Cart', cartSchema)