import InfoAndTopic from '../dbModel/infoAndTopic'
import formidable from 'formidable'

const form = formidable.IncomingForm()

function insertJournalismAndTopic(req, res, next) {
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send({
        stateCode: 0,
        retMsg: 'error',
        detail: '表单信息错误'
      })
      return
    }
    const {
      uid,
      type,
      title,
      content,
      picUrl,
      areaName,
      locationName,
      location,
      showTime,
      editorUserType
    } = fields
    const tempInsertData = {
      uid,
      type,
      title,
      content,
      picUrl,
      areaName,
      locationName,
      location,
      showTime,
      editorUserType,

    }
    InfoAndTopic.create(tempInsertData).then(() => {
      res.send({
        stateCode: 1,
        retMsg: 'success',
        detail: '创建成功'
      })
    }).catch((err) => {
      console.log('创建资讯失败', err)
      res.send({
        stateCode: 0,
        retMsg: 'fail',
        detail: '创建失败，稍后再试'
      })
    })
  })
  
}

function findForSortList(req, res, next) {
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send({
        stateCode: 0,
        retMsg: 'error',
        detail: '表单错误'
      })
      return
    }
    const {areaName} = fields
    InfoAndTopic.find({}, {
      _id: 0
    }).then(infoAndTopicData => {
      res.send({
        stateCode: 1,
        retMsg: 'success',
        data: infoAndTopicData
      })
    })
  })
}

export default {
  insertJournalismAndTopic,
  findForSortList
}