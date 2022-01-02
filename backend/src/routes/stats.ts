import express from 'express';
import path from 'path';
import { body, param } from 'express-validator';

import * as statsController from '../controller/stats';
import authMiddleware from '../middleware/authMiddleware';
import { validateEnums } from '../utils/helpers/validation/customValidationHelpers';
import multer from 'multer';

const router = express.Router();
const ranksOptionsEnum = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, '../../', 'public/images'));
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb: any) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|svg)$/)) {
      return cb(new Error('only upload files with jpg, jpeg, png, svg.'));
    }
    cb(undefined, true); // continue with upload
  },
});

//fake
// router.post('/fake', authMiddleware, statsController.createFakeStats);

//add stat

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  [
    body('weight', 'Weight needs to be in range 35kg-250kg').isFloat({
      min: 35,
      max: 250,
    }),
    body('height', 'Height needs to be in a range of 100cm-250cm')
      .optional()
      .isInt({
        min: 100,
        max: 250,
      }),
    body('fatPercentage', 'Fat Percentage needs to be lower than 40%')
      .optional()
      .isInt({
        min: 0,
        max: 40,
      }),
    body('musclesMass', 'Muscles mass needs to be in a range of 10kg-200kg')
      .optional()
      .isInt({
        min: 0,
        max: 200,
      }),
  ],
  statsController.addStats
);

//get all stats dates
router.get(
  '/all-stats-dates',
  authMiddleware,
  statsController.getAllStatsDates
);

//get a stat
router.get(
  '/:date',
  authMiddleware,
  param('date', 'invalid date').isDate({ format: 'DD-MM-YYYY' }),
  statsController.getStatsByDate
);

//get all stats
router.get('/', authMiddleware, statsController.getAllStats);

//change the last stat
router.put(
  '/',
  authMiddleware,
  [
    body('weight', 'Weight needs to be in range 35kg-250kg')
      .optional()
      .isFloat({
        min: 35,
        max: 250,
      }),
    body('height', 'Height needs to be in a range of 100cm-250cm')
      .optional()
      .isInt({
        min: 100,
        max: 250,
      }),
    body('fatPercentage', 'Fat Percentage needs to be lower than 80%')
      .optional()
      .isInt({
        min: 0,
        max: 80,
      }),
    body('musclesMass', 'Muscles mass needs to be in a range of 10kg-200kg')
      .optional()
      .isInt({
        min: 0,
        max: 120,
      }),
    body('bodyImageUrl', 'Image is invalid').optional().isURL(),
  ],
  statsController.changeLastStats
);

//delete the last stat
router.delete('/', authMiddleware, statsController.deleteLastStats);

//set a ranking to user
router.post(
  '/set-ranking',
  authMiddleware,
  body('selfRank', 'Ranking is invalid').custom((value: number) =>
    validateEnums(value, ranksOptionsEnum)
  ),
  statsController.setRanking
);

export default router;
