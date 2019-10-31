const env = process.env.NODE_ENV;
console.log(`********* process.env.NODE_ENV: ${process.env.NODE_ENV}`);

const config = {
    development: {
        MongoUrl:  "mongodb://127.0.0.1:27017/PaintChip"
    },
    cypress: {
        MongoUrl:  "mongodb://127.0.0.1:27017/TestPaintChip"
    }
};

module.exports = config[env];
