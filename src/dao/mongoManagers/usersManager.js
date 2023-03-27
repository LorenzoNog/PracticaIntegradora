import { usersModel } from "../models/usersModel.js";
import { comparePasswords } from "../../utils.js";
import { hashPassword } from "../../utils.js";

export default class UsersManager {
  async createUser(user) {
    const { email, password, firstName, lastName, age, role} = user;
    try {
      const existUser = await usersModel.find({ email });
      if (existUser.length === 0) {
        const hashedPassword = await hashPassword(password);
        const newUser = {
          firstName,
          lastName,
          age,
          email,
          role,
          password: hashedPassword,
        };
        if(user.email.includes('@admin.com')){
          newUser.isAdmin = true,
          newUser.role = 'Admin'
        }
        await usersModel.create(newUser);
        console.log(newUser);
        return newUser
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async getUserById(id) {
    try {
      const user = await usersModel.findOne({ _id: id });
      if (user) {
        return user;
      } else {
        return error;
      }
    } catch (error) {
      return error
    }
  }

  async getUsers() {
    try {
      const users = await usersModel.find();
      if (users) {
        return users;
      } else {
        return error;
      }
    } catch (error) {
      return error
    }
  }

  async loginUser(user) {
    const { email, password } = user;
    try {
      const user = await usersModel.findOne({ email });
      if (user) {
        const passwords = comparePasswords(password, user.password);
        if (passwords) {
          console.log(user);
          return user;
        }
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  };

  async updateOne(idUser, obj){
    try {
      const updateUser = await usersModel.updateOne({_id:idUser},{$set:obj})
      if(updateUser){
        return updateUser
      }else{
        console.log('No se pudo actualizar la informacion del usuario.')
      }
    } catch (error) {
      return error
    }
  };

  async deleteOne(idUser){
    try {
      const deleteUser = await usersModel.deleteOne({_id: idUser})
      return deleteUser
    } catch (error) {
      return error
    }
  }

}
