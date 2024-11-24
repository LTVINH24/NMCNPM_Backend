import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

const Address=mongoose.model('Address', addressSchema);

export default Address;