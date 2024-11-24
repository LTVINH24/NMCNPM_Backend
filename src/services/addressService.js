import Address from "../models/Address.js";

const addressService = {

    async createAddress(addressData){
        const addresses = new Address(addressData);
        return addresses;
    },

    async saveAddress(addresses){
        await addresses.save();
        return addresses
    },

    async getAddresses(){
        const addresses = await Address.find();
        return addresses;
    },

    async getAddressById(addressId){
        const addresses = await Address.findById(addressId);
        return addresses;
    },

    async updateAddress(addressId, updateData){
        const addresses = await Address.findByIdAndUpdate(addressId, updateData);
        return addresses;
    },

    async deleteAddress(addressId) {
        const addresses = await Address.findByIdAndDelete(addressId);
        return addresses;
    },

    async setDefaultAddress(addressId) {
        const addresses = await Address.findById(addressId);
    
        await Address.updateMany(
            { isDefault: true },
            { isDefault: false }
        );
    
        addresses.isDefault = true;
    
        return addresses;
    },

    async checkAddressExistence(addressData) {
        const addresses = await Address.findOne({
            address: addressData.address,
            postAlCode: addressData.postAlCode,
            phone: addressData.phone,
        });

        return addresses;
    },
};

export default addressService;