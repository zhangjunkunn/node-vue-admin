import express from 'express'
import * as InfoAndTopic from '../controller/infoAndTopic'

const router = express.Router()

router.post('/insertJournalismAndTopic', InfoAndTopic.insertJournalismAndTopic)
router.post('/findForSortList', InfoAndTopic.findForSortList)

export default router