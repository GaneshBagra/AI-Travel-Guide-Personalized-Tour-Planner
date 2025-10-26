import { Schema } from "mongoose"
import mongoose  from "mongoose"

const itinerarySchema = new mongoose.Schema({
    itinaryOwner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    destination: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date :{
        type: String,
        required: true
    },
    intrests: {
        type: [String],
        required: true
    },
    travellers: {
        type: String,
        required: false
    },
    budget: {
        type: String,
        required: false
    }
}, {timestamps: true})

export const Itinary = mongoose.model("Itinary", itinerarySchema)