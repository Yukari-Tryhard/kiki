const { faker } = require('@faker-js/faker');
const Product = require('../models/product');

const seedData = [];

for (let i = 1; i <= 10; i++) {
  const product = new Product({
    name: faker.commerce.productName(),
    publishingYear: faker.date.past(10).getFullYear(),
    publishingDate: faker.date.past(10),
    language: faker.random.locale(),
    pages: faker.datatype.number({ min: 100, max: 500 }),
    publisher: faker.company.name(),
    form: faker.helpers.arrayElement(['Bìa Mềm', 'Bìa Cứng']),
    author: faker.name.fullName(),
    slug: faker.lorem.slug(),
    price: faker.datatype.number({ min: 5, max: 50 }),
    discountPercent: faker.datatype.number({ min: 0, max: 50 }),
    description: faker.lorem.paragraph(),
    productPictures: [{ img: faker.image.imageUrl() }],
    quantity: faker.datatype.number({ min: 10, max: 100 }),
    category: '60a72b240c08b400151f07d2', // Replace with the ID of the category you want to assign the products to
  });

  seedData.push(product);
}

const seedProducts = async () => {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        await Product.insertMany(seedData);
        console.log('Seed product data inserted!');
      } else {
        console.log('Product data already present, skipping seed...');
      }
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };
  
  module.exports = seedProducts;