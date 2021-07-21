import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  goals: {
    weight: { type: Number },

    fatPercentage: { type: Number },

    muscelesMass: { type: Number },

    date: { type: Date },
  },

  program: [
    {
      day: {
        type: String,
        required: true,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Regular",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },

      rest: { type: Boolean, required: true },

      name: { type: String, requried: true },

      description: { type: String },

      aerobic: { type: Boolean, required: true },

      muscles: [
        {
          muscle: {
            type: String,
            enum: [
              "Traps",
              "Shoulders",
              "Chest",
              "Upper back",
              "Lats", //כנפיים
              "Lower back",
              "Triceps",
              "Biceps",
              "Forearm",
              "Abs",
              "Gluteus", //עכוז
              "Quads", //ארבעראשי
              "Hamstrings",
              "Claves", //תאומים
            ],
          },
        },
      ],

      time: { type: Number, min: 10, max: 300 },
    },
  ],
});

const Program = mongoose.model("Program", ProgramSchema);
export default Program;
