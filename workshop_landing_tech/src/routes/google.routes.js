const { Router } = require('express');

const router = Router();

const {
  getRegistries,
  saveRegistries,
} = require('../controllers/google.controller')

router.get('/', getRegistries);
router.post('/', saveRegistries )

module.exports = router;