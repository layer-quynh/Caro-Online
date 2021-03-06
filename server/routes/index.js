let express = require('express');
let router = express.Router();

let ctrlUser = require('../controllers/user');
let ctrlRoom = require('../controllers/room');

router.post('/login', (req, res) => {
    ctrlUser.login(req, res);
})
router.post('/register', (req, res) => {
    ctrlUser.register(req, res);
})

router.post('/room/info', (req, res) => {
    ctrlRoom.getRoom(req, res);
})
router.post('/room/list', (req, res) => {
    ctrlRoom.getListRoom(req, res);
})
router.post('/room/user/new', (req, res) => { 
    ctrlRoom.addUser(req, res);
})
router.post('/room/new', (req, res) => { 
    ctrlRoom.createRoom(req, res);
})
router.post('/room/user/list', (req, res) => {
    ctrlRoom.getListUser(req, res);
})
router.post('/room/delete', (req, res) => {
    ctrlRoom.deleteRoom(req, res);
})
router.post('/room/update', (req, res) => {
    ctrlRoom.updateRoom(req, res);
})

router.post('/user/point/update', (req, res) => {
    ctrlUser.updatePoint(req, res);
})
router.post('/user/list', (req, res) => {
    ctrlUser.getListUser(req, res);
})
module.exports = router;