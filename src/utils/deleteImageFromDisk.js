import fs from 'fs-extra';
const deleteImageFromDiskSync =(filePath) => {
    fs.unlinkSync(filePath, (err) => {
        if (err) {
            console.error(`Error deleting the file at ${filePath}:`, err);
            return;
        }
        console.log(`File at ${filePath} deleted successfully!`);
    });
};

export default deleteImageFromDiskSync;