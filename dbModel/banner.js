import mongoose, { mongo } from 'mongoose'

const schema = mongoose.Schema
let count = 1

const bannerSchema = new schema({
  bid: {
    type: Number,
    default: count ++
  },
  pic: String,
  jumpType: String,
  jump: String,
  createTime: String
}, {
  _id: false
})

const Banner = mongoose.model('Banner', bannerSchema, 'banner')

export default Banner