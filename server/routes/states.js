import { Router } from "express";
import { getAllStates, getStateByID, getStateIdFromName } from "../controllers/states.js";

export const stateRouter = Router();


stateRouter.get('/', getAllStates);
stateRouter.get('/id/:id', getStateByID);
stateRouter.get('/name/:name', getStateIdFromName);