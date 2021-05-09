var express = require('express');
var router = express.Router();
const ctrl = require("../controllers/control");

router.get('/get/:txid', ctrl.getVacc);
router.post('/add', ctrl.addVacc);
router.post('/supply', ctrl.supply);
router.get('/stats/:time', ctrl.getStat);

module.exports = router;
