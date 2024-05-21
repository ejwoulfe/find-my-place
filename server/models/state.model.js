import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';



export const State = sequelize.define("state", {
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
