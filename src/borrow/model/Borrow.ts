import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../../db";
import User from '../../user/models/User';
import Book from '../../books/model/Book';

class Borrow extends Model {
  public id!: number;
  public borrowDate!: Date;
  public returnDate!: Date;
  public score!: number;
}

Borrow.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  borrowDate: {
    type: DataTypes.DATE,
    field: 'borrow_date',
  },
  returnDate: {
    type: DataTypes.DATE,
    field: 'return_date',
  },
  score: {
    type: DataTypes.FLOAT,
  },
}, {
  sequelize,
  modelName: 'Borrow',
  tableName: 'borrows',
  timestamps: false,
});

// Define associations
User.hasMany(Borrow, { as: 'pastBorrows', foreignKey: 'UserId' });
User.hasMany(Borrow, { as: 'presentBorrows', foreignKey: 'UserId' });
Borrow.belongsTo(User, { foreignKey: 'UserId' });
Borrow.belongsTo(Book, { as: 'book', foreignKey: 'BookId' });
Book.hasMany(Borrow, { foreignKey: 'BookId' });

export default Borrow;
