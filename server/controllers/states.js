import { State } from "../models/state.model.js";

export const getAllStates = async () => {
    const states = await State.findAll();
    console.log(states.every(state => state instanceof State)); // true
    console.log('All states:', JSON.stringify(states, null, 2));
};

export const getStateByID = async (req, res) => {
    const stateID = req.params.id;
    const state = await State.findOne({ where: { state_id: stateID } });
    if (state === null) {
        console.log('Not found!');
    } else {
        console.log(state instanceof State); // true
        console.log(state.name); // 'My Title'
    }
};