import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required:[true,'title is required'],
      minLenght:[8,"title must be atleast 8 character"],
      maxLength:[59,"title sould be less than 80 character"],
      trim:true,
    },
    description: {
      type: String,
      required:[true,'title is required'],
      minLenght:[8,"dedscription must be atleast 8 character"],
      maxLength:[200,"description sould be less than 200 character"],
    },
    Category: {
      type: String,
      required:[true,"category is required"]
    },
    thumbnail: {
      public_id: {
        type: String,
        required:true,
      },
      secure_url: {
        type: String,
        required:true,
      },
    },

    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required:true,
          },
          secure_url: {
            type: String,
            required:true,
          },
        },
      },
    ],
    numbersOfLecture: {
      type: Number,
      default:0
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Course=model("Course",courseSchema);
export default Course