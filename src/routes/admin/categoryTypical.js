import {getAllTypicalDetails} from "../../controllers/admin-controllers/categoryTypicalController.js";

import express from "express";

const router=express.Router();

router.get('/all/:id',getAllTypicalDetails);

export default router;