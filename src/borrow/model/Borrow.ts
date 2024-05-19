import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../db";
import User from '../../user/models/User';
import Book from '../../books/model/Book';


export interface BorrowAttributes {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate?: Date | null;
  score?: number;
}


interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id' | 'returnDate' | 'score'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate?: Date;
  public score?: number;

  public readonly user?: User;
  public readonly book?: Book;

}

Borrow.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'book_id',
    references: {
      model: Book,
      key: 'id',
    },
  },
  borrowDate: {
    type: DataTypes.DATE,
    field: 'borrow_date',
  },
  returnDate: {
    type: DataTypes.DATE,
    field: 'return_date',
    allowNull: true,
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


User.hasMany(Borrow, {
  foreignKey: 'userId',
  as: 'borrows',
});

Book.hasMany(Borrow, {
  foreignKey: 'bookId',
  as: 'presentBorrows',
});

Borrow.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Borrow.belongsTo(Book, {
  foreignKey: 'bookId',
  as: 'book',
});
export default Borrow;
