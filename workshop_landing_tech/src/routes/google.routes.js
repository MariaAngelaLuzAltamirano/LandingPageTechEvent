const { Router } = require('express');

const router = Router();

const {
  getRegistries,
  saveRegistries,
  deleteRegistry
} = require('../controllers/google.controller')

router.get('/invitados', getRegistries)
router.post('/new-guest', saveRegistries)
router.delete('/', deleteRegistry)

module.exports = router;