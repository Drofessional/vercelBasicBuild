import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI 

let mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(MONGODB_URI, mongooseConfig)

mongoose.connection.on('connected', () => {console.log('Connected to database!')})
mongoose.connection.on('disonnected', () => {console.log('Disconnected to database!')})
mongoose.connection.on('error', () => {console.log('Error connecting to database! Look out for: ', error)})


export default mongoose.connection 

