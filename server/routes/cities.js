
import { Router } from "express";
import { getAllCitiesByStateId, getCityById, getCityByStateIdAndCityName } from "../controllers/cities.js";
export const cityRouter = Router();


cityRouter.get('/:state_id', getAllCitiesByStateId);
cityRouter.get('/city/:city_id', getCityById);
cityRouter.get('/city/:state_id/:name', getCityByStateIdAndCityName);