import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import { State } from './state.model.js';



export const City = sequelize.define("city", {
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost_index: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    household_median_income: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    male_population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    female_population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    median_house_value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    median_age: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }, races: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    unemployment: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    marital_status: {
        type: DataTypes.JSON,
        allowNull: false
    },
    education: {
        type: DataTypes.JSON,
        allowNull: false
    },
    commute_time: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    crime: {
        type: DataTypes.JSON,
        allowNull: true
    },
});
State.hasMany(City, {
    foreignKey: 'state_id'
});
City.belongsTo(State, { foreignKey: 'state_id' });