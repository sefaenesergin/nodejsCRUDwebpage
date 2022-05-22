const express = require('express')
const router = express.Router()
const Content = require('../models/content.model')
const contentController = require('../controllers/contentController')




router.get('/', contentController.content_index)

router.get('/:id', contentController.content_detailed )


module.exports = router