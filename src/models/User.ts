import { Typegoose, prop, pre, instanceMethod } from 'typegoose';
import { hash, compare } from 'bcrypt';

@pre<User>('save', async function(next) {
  // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  // your application becomes.
  this.password = await hash(this.password, 10);

  next();
})

export class User extends Typegoose {
  @prop({ required: true })
  email!: string;

  @prop()
  password!: string;

  @instanceMethod
  public async isValidPassword(password: string) {
    return compare(password, this.password);
  }
}

export const UserModel =  new User().getModelForClass(User);
