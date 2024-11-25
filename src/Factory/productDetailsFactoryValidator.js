import {PhoneDetail,LaptopDetail,WatchDetail,CameraDetail,TelevisionDetail}
from "../models/ProductDetails.js";

const Type={
    PHONE:'phone',
    LAPTOP:'laptop',
    WATCH:'watch',
    CAMERA:'camera',
    TELEVISION:'television'
}

const phoneProps = ['productId', 'type', 'weight', 'internalMemory', 'chip', 'screenSize', 'batteryCapacity', 'operatingSystem'];
const laptopProps = ['productId', 'type', 'weight', 'CPU', 'RAM', 'storage', 'screenSize', 'operatingSystem'];
const watchProps = ['productId', 'type', 'weight', 'batteryCapacity', 'screenSize', 'operatingSystem'];
const cameraProps = ['productId', 'type', 'weight', 'batteryCapacity', 'cameraType', 'cameraSensor', 'imageStabilization', 'screenSize', 'screenType'];
const televisionProps = ['productId', 'type', 'weight', 'screenSize', 'screenType', 'refreshRate', 'imageTechnology', 'soundTechnology', 'operatingSystem'];

const productDetailsPropsMappig={
    [Type.PHONE]:phoneProps,
    [Type.LAPTOP]:laptopProps,
    [Type.WATCH]:watchProps,
    [Type.CAMERA]:cameraProps,
    [Type.TELEVISION]:televisionProps,
};

const productDetailsValidator ={
    isMissingProps:(productDetails) => {
        const props = productDetailsPropsMappig[productDetails.type];
        return props.some((prop) => !productDetails[prop]);
    },
    isInvalidType:(productDetails) => {
        return !Object.values(Type).includes(productDetails.type);
    },
};

export default productDetailsValidator;

