import { Schema, model, models, Document, Types } from "mongoose";
import { IUser } from "./user";

// Genre Schema
export interface IGenre extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId | IUser;
}

const GenreSchema = new Schema<IGenre>(
  {
    name: {
      type: String,
      required: [true, "Please provide a genre name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);



const Genre = models.User || model<IGenre>("User", GenreSchema);

export default Genre;
