import  {model,schema} from "mongoose"

const itinerarySchema = new schema({
    destination: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date :{
        type: Date,
        required: true
    },
    intrests: {
        type: [String],
        required: true
    },
    travellers: {
        type: string,
        required: false
    },
    budget: {
        type: String,
        required: false
    }
}, {timestamps: true})

export const Itinerary = model("Itinerary", itinerarySchema)