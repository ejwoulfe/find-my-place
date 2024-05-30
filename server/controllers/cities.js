import { Sequelize } from "sequelize";
import { sequelize } from "../config/config.js";
import { City } from "../models/city.model.js";
import { State } from '../models/state.model.js';

export const getAllCitiesByStateId = async (req, res) => {
    try {
        const stateID = Number(req.params.state_id);
        if (isNaN(stateID)) {
            return res.status(400).send({
                message: 'City ID must be of type Number',
            });
        } else {

            const cities = await City.findAll({ where: { state_id: stateID } });
            if (cities.length === 0) {
                return res.status(404).send({
                    message: 'City Not Found',
                });
            } else {
                return res.status(200).send(cities);
            }
        }
    }
    catch {
        ((error) => res.status(400).send(error));
    }
};

export const getCityById = async (req, res) => {
    try {
        const cityID = Number(req.params.city_id);
        if (isNaN(cityID)) {
            return res.status(400).send({
                message: 'City ID must be of type Number',
            });
        } else {

            const city = await City.findByPk(cityID);
            if (city.length === 0) {
                return res.status(404).send({
                    message: 'City Not Found',
                });
            } else {
                return res.status(200).send(city);
            }
        }
    }
    catch {
        ((error) => res.status(400).send(error));
    }
};

// Select * from cities
// LEFT JOIN states ON cities.state_id = states.state_id
// WHERE cities.state_id = 5 AND cities.name = 'Farmington';
export const getCityByStateIdAndCityName = async (req, res) => {
    try {
        const cityName = req.params.name;

        City.findOne({
            where: {
                name: { [Sequelize.Op.like]: cityName }
            },
            include: [{
                model: State,
                required: true,

            }]
        }).then((city) => {
            return res.status(200).send(city);
        });



    }
    catch {
        ((error) => res.status(400).send(error));
    }
};

