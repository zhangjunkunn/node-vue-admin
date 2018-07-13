import user from './user'
import banner from './banner'
import topic from './topic'

export default app => {
  app.use('/near', user)
  app.use('/api/operation/banner', banner)
  app.use('/api/operation/topic', topic)
}