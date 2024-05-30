import { State } from "../models/state.model.js";

export const getAllStates = async () => {
    const states = await State.findAll();

};

export const getStateByID = async (req, res) => {
    const stateID = req.params.id;
    const state = await State.findOne({ where: { state_id: stateID } });

};

export const getStateIdFromName = async (req, res) => {
    const stateName = req.params.name;
    const stateID = await State.findOne({ attributes: ['state_id'], where: { name: stateName } });
    return res.status(200).send(stateID);
};