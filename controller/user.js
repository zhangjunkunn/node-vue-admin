import UserModel from '../dbModel/user'
import formidable from 'formidable'
import crypto from 'crypto'


function Md5(password) {
  console.log(typeof password)
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('base64')
}

function encryption(password) {
  return Md5(Md5(password).substr(2, 7) + Md5(password))
}

async function login(req, res, next) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({
        code: 1,
        data: {
          status: 0,
          token: '',
          message: '表单信息错误'
        }
      })
      return
    }
    const {
      username,
      password
    } = fields
    console.log(typeof username, typeof password)
    console.log(username, password)
    try {
      if (!username) {
        throw new Error('用户名参数错误')
      } else if (!password) {
        throw new Error('用户密码错误')
      }
    } catch (err) {
      res.send({
        code: 1,
        data: {
          status: 0,
          token: '',
          message: err.message
        }
      })
      return
    }
    console.log(1)
    const admin = await UserModel.findOne({
      username
    })
    console.log(2)
    const genPassword = encryption(password)
    console.log('2-1')
    const genToken = Md5(new Date().getTime().toString()).toString()
    console.log(3)
    if (!admin) {
      const rolesAndName = username == 'admin' ? 'admin' : 'editor';
      const userData = {
        username,
        password: genPassword,
        create_time: new Date().getTime().toString(),
        introduction: rolesAndName == 'admin' ? '管理员账号' : '编辑账号',
        name: rolesAndName,
        roles: [rolesAndName],
        token: genToken
      }
      console.log(4)
      console.log(userData)
      await UserModel.create(userData)
      console.log(5)
      res.send({
        code: 0,
        data: {
          status: 1,
          token: genToken,
          message: '用户不存在，自动注册成功'
        }
      })
    } else if(genPassword.toString() != admin.password.toString()) {
      res.send({
        code: 0,
        data: {
          status: 0,
          token: '',
          message: '密码错误'
        }
      })
    } else {
      res.send({
        code: 0,
        data: {
          status: 1,
          token: admin.token,
          message: '登录成功'
        }
      })
    }
  })
}

async function info(req, res, next) {
  const token =  req.query.token
  console.log(token)
  if(!token) {
    res.send({
      code: 1,
      data: {},
      message: 'token错误'
    })
    return
  }
  const user = await UserModel.findOne({
    token
  })
  if(!user) {
    res.send({
      code: 1,
      data: {},
      message: '非法token'
    })
    return
  } else {
    res.send({
      code: 0,
      data: {
        avatar: user.avatar,
        instroduction: user.introduction,
        name: user.name,
        roles: user.roles,
        token: user.name
      },
      message: '用户信息获取成功'
    })
  }
}

export {
  login,
  info
}