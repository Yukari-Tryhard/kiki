const seedProducts = require("./productSeed")
const seedCategories = require("./categorySeed")

const seed = async function(){
    await seedProducts();
    await seedCategories();
}

module.exports = seed;