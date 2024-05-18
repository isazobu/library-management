import { Optional, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional  } from "sequelize";


import { sequelize } from "../../db";

export interface BookAttributes {
  id: number;
  name: string;
  score: number;
  isBorrowed: boolean;

}

export interface BookCreationAttributes extends Omit<BookAttributes, 'id' | 'averageRating' | 'isBorrowed'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  declare id: CreationOptional<number>;
  declare name: string;
  declare score: CreationOptional<number>;
  declare isBorrowed: CreationOptional<boolean>;

}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: -1,
  },
  isBorrowed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_borrowed',
  }
  
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'books',
  timestamps: false, // Add createdAt and updatedAt fields
});

export default Book;