import express from 'express';
import router from express.Router();
import { addSchool, listSchools } from '../controllers/school.controller';

router.post('/addSchool', addSchool);

router.get('/listSchools', listSchools);

export default router;