const { registerUser, loginUser, userCurrent} = require('../controllers/userController');

const router = express.Router();

router.route('/users').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').get(protect, userCurrent);