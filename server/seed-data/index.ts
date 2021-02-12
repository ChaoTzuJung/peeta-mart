// seed 的功用就是提供測試資料，把測試的data塞進測試DB裡面的

import { products } from './data';

export async function insertSeedData(ks: any) {
    // Keystone API changed, so we need to check for both versions to get keystone
    const keystone = ks.keystone || ks;
    const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

    console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
    // grabing mongoose by adapter and we can inject data to DB
    const { mongoose } = adapter;
    // loop over every single product and create Product and ProductImage in DB
    for (const product of products) {
        console.log(`  🛍️ Adding Product: ${product.name}`);
        const { _id } = await mongoose
        .model('ProductImage')
        .create({ image: product.photo, altText: product.description });
        product.photo = _id;
        await mongoose.model('Product').create(product);
    }
    console.log(`✅ Seed Data Inserted: ${products.length} Products`);
    console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
    process.exit();
}