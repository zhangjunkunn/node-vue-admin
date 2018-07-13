import express from 'express'
import * as Topic from '../controller/topic'

const router = express.Router()

router.post('/findTopicList', Topic.findTopicList)
router.post('/updataSort', Topic.updateSort)
router.post('/insertTopic', Topic.insertTopic)
router.post('/deleteTopic', Topic.deleteTopic)

export default router