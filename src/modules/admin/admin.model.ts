//the model schema for the mongoDB
import { Schema, model, Model, Document } from 'mongoose';
import { CONSTANT } from '../../constant';

declare interface IAdmin extends Document {
    name: string;
    email: string;
    otp: string;
    imageUrl: string;
    salt: string;
    password: string;
}

const schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        index: true,
        default: ''
    },
    otp: {
        value: String,
        generatedTime: Date,
        expiryTime: Date,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    }
);

export var admins: Model<IAdmin> = model<IAdmin>(CONSTANT.DB_MODEL_REF.ADMIN, schema);