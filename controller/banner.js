import Banner from '../dbModel/banner'
import timeF from 'time-formater'
import formidable from 'formidable'

async function findBannerList(req, res, next) {
  const bannerList = await Banner.find({}, '-_id bid pic jumpType jump createTime')
  console.log('find banner', bannerList)
  if(!bannerList) {
    res.send({
      stateCode: 0,
      retMsg: 'err',
      data: []
    })
    return
  } else {
    res.send({
      stateCode: 1,
      retMsg: 'success',
      data: bannerList,
      detail: '查询成功'
    })
  }
}

async function insertBanner(req, res, next) {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if(err) {
      console.log('表单错误')
      res.send({
        stateCode: 0,
        retMsg: 'err',
        detail: '表单错误'
      })
      return
    } else {
      const {pic, jumpType, jump} = fields
      const insertData = {
        pic,
        jumpType,
        jump,
        createTime: timeF().format('YYYY-MM-DD HH:mm:ss'),
      }
      Banner.create(insertData).then(e => {
        console.log(e)
        res.send({
          stateCode: 1,
          retMsg: 'success',
          detail: '添加成功'
        })
      }).catch(err => {
        console.log(err)
        res.send({
          stateCode: 0, 
          retMsg: 'fail',
          detail: '创建数据失败'
        })
      })
    }
  })
}

async function deleteBanner(req, res, next) {
  const form = formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send({
        stateCode: 0,
        retMsg: 'error',
        detail: '表单错误'
      })
      return
    }
    const {bid} = fields
    Banner.findOneAndRemove({bid}).then(() => {
      console.log('delete banner success')
      res.send({
        stateCode: 1,
        retMsg: 'success',
        detail: '删除成功'
      })
    }).catch(() => {
      res.send({
        stateCode: 0,
        retMsg: 'fail',
        detail: '删除失败，稍后再试'
      })
    })
  })
}

export {
  insertBanner,
  findBannerList,
  deleteBanner
}