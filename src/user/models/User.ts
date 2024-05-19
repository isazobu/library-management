import { Optional, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional  } from "sequelize";


import { sequelize } from "../../db";
import Borrow from "../../borrow/model/Borrow";

export interface UserAttributes {
    id: number;
    name: string;
    borrows?: Borrow[];
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: CreationOptional<number>;
    declare name: string;
    public readonly borrows?: Borrow[];
    

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // Add createdAt and updatedAt fields
});


export default User;