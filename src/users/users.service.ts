import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { bcryptConstant } from './constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    createUser.password = await hash(
      createUserDto.password,
      bcryptConstant.saltOrRound,
    );

    return createUser.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw Error(`Ops... User with id: ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw Error(`Ops... User with id: ${username} not found`);
    }
    return user;
  }

  async findByUsernamePassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    await UsersService.validUserPassword(user, password);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await hash(
      updateUserDto.password,
      bcryptConstant.saltOrRound,
    );
    const user = await this.userModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      updateUserDto,
      { new: true },
    );
    if (!user) {
      throw Error(`Ops... User with id: ${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete({
      _id: id,
    });

    if (!deletedUser) {
      throw Error(`Ops... User with id: ${id} not found`);
    }
    return deletedUser;
  }

  static async validUserPassword(user: User, password: string) {
    const isMatch = await compare(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException(['Incorrect username or password.']);
  }
}
