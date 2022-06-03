const { Router } = require('express');
const { getUser,
  putUser,
  postUser,
  deleteUser } = require('../controllers/user.controler');
const router = Router();


router.get('/:id', getUser)



router.put('/', putUser)
router.post('/', postUser)
router.delete('/', deleteUser)


module.exports = router;