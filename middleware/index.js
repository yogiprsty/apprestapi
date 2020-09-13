const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verification = require('./verification');

// daftarkan menu registrasi
router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verification(2), auth.halamanRahasia);

module.exports = router;