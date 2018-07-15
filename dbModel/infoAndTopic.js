import mongoose from 'mongoose'

const schema = mongoose.Schema

const InfoSchema = new schema({
  uid: String,
  type: {
    type: Number,
    default: 20
  },
  title: {
    type: String,
    default: '测试默认标题'
  },
  content: String,
  picUrl: {
    type: String,
    default: 'default.png'
  },
  areaName: {
    type: String,
    default: '石景山区'
  },
  locationName: String,
  location: String,
  showTime: Number,
  editorUserType: {
    type: Number,
    default: 20
  }
})

const InfoAndTopic = mongoose.model('InfoAndTopic', InfoSchema, 'info_topic')
export default InfoAndTopic