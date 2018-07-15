import user from './user'
import banner from './banner'
import topic from './topic'
import infoAndTopic from './infoAndTopic'

export default app => {
  app.use('/near', user)
  app.use('/api/operation/banner', banner)
  app.use('/api/operation/topic', topic)
  app.use('/api/operation/infoAndTopic', infoAndTopic)
}