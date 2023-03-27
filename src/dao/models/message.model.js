import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  message : {
    nombre: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    }
  }
});

export const Msg = mongoose.model("msg", msgSchema);
