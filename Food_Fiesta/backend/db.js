const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://hg21csb0b21:19422004@cluster0.xf6tmcg.mongodb.net/Sasta_zomato?retryWrites=true&w=majority';
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) { console.log("error -- >", err); }
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {

                    if (err) {
                        console.log("error --- >", err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                        // console.log(global.food_items); 
                    }
                })
            }
            )
        }
    })
}

module.exports = mongoDB; 