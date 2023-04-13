const { faker } = require('@faker-js/faker');
const Category = require('../models/category');

const seedData = [];

for (let i = 0; i < 10; i++) {
  const category = {
    name: faker.helpers.arrayElement(['Tiểu thuyết', 'Truyện tranh', 'Tâm  lý', 'Ngoại ngữ']),
    slug: faker.lorem.slug(),
    categoryImage: faker.image.imageUrl(),
  };
  seedData.push(category);
}

const seedCategories = async () => {
    try {
      const category = await Category.find();
      if (category.length === 0) {
        await Category.insertMany(seedData);
        console.log('Seed category data inserted!');
      } else {
        console.log('Category Data already present, skipping seed...');
      }
    } catch (error) {
      console.error('Error seeding categories:', error);
    }
  };

  module.exports = seedCategories;