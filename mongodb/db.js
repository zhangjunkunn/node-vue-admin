import mongoose from 'mongoose'
import chalk from 'chalk'

mongoose.connect('mongodb://localhost:27017/webadmin')

const db = mongoose.connection

db.once('open', (err, res) => {
  if (!err) console.log(chalk.green('数据库连接成功'))
})

db.on('error', (err) => {
  console.error(chalk.red('error in mongodb: ' + err));
  mongoose.disconnect()
})

db.on('close', () => {
  console.log(chalk.yellow('数据库断开，重新连接'))
  mongoose.connect('mongodb://localhost:27017/webadmin', {
    useMongoClient: true
  })
})

export default db