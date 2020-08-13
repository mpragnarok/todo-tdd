const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb://SuperTestUser:SuperTestUser1@localhost:27017/todo-tdd",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    } catch (e) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}
module.exports = { connect };
