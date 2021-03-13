const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { getToy, addToy, getToys, deleteToy, updateToy } = require('./toy.controller');
const router = express.Router();
const { log } = require('../../middlewares/logger.middleware');

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys);
router.post('/', addToy);
router.get('/:id', getToy);
router.put('/:id', updateToy);
router.delete('/:id', deleteToy)

module.exports = router