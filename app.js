import express from 'express'
import db from './mongodb/db'
import router from './router'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'

const app = express()

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST,GET");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("content-type", 'application/json; charset=utf-8')
  res.header("X-Powered-By", 'Express')
  next()
});

app.use(cookieParser())

router(app)

// app.use(history());
// app.use(express.static('./public'))
app.listen(8002, () => {
  console.log(
    chalk.green('监听成功：8002')
  )
})