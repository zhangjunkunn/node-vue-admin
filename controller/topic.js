import Topic from '../dbModel/topic'
import formidable from 'formidable'

const defaultBackUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529053722047&di=e70ccebbc63c7c08fae95d878171880b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F960a304e251f95ca7c25a798c2177f3e660952cf.jpg'
const defaultPic = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529055179482&di=8940398b90dac2990ad5206b4b8367dc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d11f5730515c00000028eca4b0a4.jpg%401280w_1l_2o_100sh.jpg'

async function findTopicList(req, res, next) {
  const TopicList = await Topic.find({}, {
    tid: 1,
    topicName: 1,
    backgroundUrl: 1,
    topicPic: 1
  })
  console.log(TopicList)
  if(!TopicList) {
    res.send({
      stateCode: 0,
      retMsg: 'fail',
      data: [],
      detail: '未找到'
    })
    return
  } else {
    res.send({
      stateCode: 1,
      retMsg: 'success',
      data: TopicList,
      detail: '请求成功'
    })
  }
}

async function updateSort(req, res, next) {
  const form = formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if(err) {
      res.send({
        stateCode: 0,
        retMsg: 'fail',
        detail: '表单信息错误'
      })
      return
    }
    const {list} = fields
  })
}

async function insertTopic(req, res, next) {
  const form = formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({
        stateCode: 0,
        retMsg: 'fail',
        detail: '表单信息错误'
      })
      return
    }
    const {
      topicName = '十一大长假',
      detail = '要放假了啊',
      recommend = 1,
      topicPic = '/default.png',
      backgroundUrl = '/default.png'
    } = fields
    Topic.create({
      topicName,
      detail,
      recommend,
      topicPic,
      backgroundUrl
    }).then((newTopic) => {
      console.log('add success', newTopic)
      res.send({
        stateCode: 1,
        retMsg: 'success'
      })
    }).catch(err => {
      console.log('add fail', err)
      res.send({
        stateCode: 0,
        retMsg: 'fail'
      })
    })
  })
}

async function deleteTopic(req, res, next) {
  const form = formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send({
        stateCode: 0,
        retMsg: 'err'
      })
    }
    const {tid} = fields
    Topic.remove({tid}).then(data => {
      console.log('remove', data)
      res.send({
        stateCode: 1,
        retMsg: 'success',
        detail: '删除成功'
      })
    }).catch(err => {
      console.log('remove fail')
      res.send({
        stateCode: 0,
        retMsg: 'fail',
        detail: '删除失败，请稍后尝试'
      })
    })
  })
}

export {
  findTopicList,
  updateSort,
  insertTopic,
  deleteTopic
}