const minio = require("minio");

const bucketClient = new minio.Client({
    endPoint: process.env.BUCKET_ENDPOINT || 'localhost',
    port: +process.env.BUCKET_PORT || 9000,
    useSSL: !!+process.env.BUCKET_USE_SSL || false,
    accessKey: process.env.BUCKET_ACCESS_KEY || "",
    secretKey: process.env.BUCKET_SECRET_KEY || "",
});

const bucket = process.env.BUCKET_NAME || "tmt";

(async () => {
    try {
        const exists = await bucketClient.bucketExists(bucket);
    
        if (!exists) {
            await bucketClient.makeBucket(bucket);
        }
    } catch (error) {
        console.error("An error happened while initializing the bucket...");
        console.log(error);
    }
})();

async function getPresignedGetUrl(objectName) {
    try {
        const url = await bucketClient.presignedGetObject(bucket, objectName, 5 * 60);
        return url;
    } catch (error) {
        throw error;
    }
}

async function getPresignedPutUrl(objectName) {
    try {
        const url = await bucketClient.presignedPutObject(bucket, objectName, 5 * 60);
        return url;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPresignedGetUrl,
    getPresignedPutUrl
};