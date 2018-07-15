import express from 'express'
import * as Banner from '../controller/banner'

const router = express.Router()

router.post('/findBannerList', Banner.findBannerList)
router.post('/insertBanner', Banner.insertBanner)
router.post('/deleteBanner', Banner.deleteBanner)

export default router