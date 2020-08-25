const { Router } = require('express');

const router = Router();

const {
  getRegistries,
  saveRegistries,
} = require('../controllers/google.controller')

router.get('/invitados', getRegistries)
router.post('/invitados', saveRegistries )

module.exports = router;