import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';

export type OwnerDocument = HydratedDocument<Owner>;

@Schema({ timestamps: true })
export class Owner {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }])
  pokemons: [Pokemon];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
