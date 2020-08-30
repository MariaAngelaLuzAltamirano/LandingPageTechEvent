const { Router } = require('express');

const router = Router();

const {
  getRegistries,
  saveRegistries,
} = require('../controllers/google.controller')

router.get('/invitados', getRegistries)
router.post('/new-guest', saveRegistries)

module.exports = router;