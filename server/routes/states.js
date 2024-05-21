import { Router } from "express";
import { getAllStates, getStateByID } from "../controllers/states.js";

export const stateRouter = Router();


stateRouter.get('/', getAllStates);
stateRouter.get('/:id', getStateByID);