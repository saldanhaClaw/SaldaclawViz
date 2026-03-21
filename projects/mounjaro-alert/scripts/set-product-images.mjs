import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function uploadImageToStripe(imageUrlOrPath) {
  // Stripe doesn't have direct image upload via API. We need to host the image and provide URL.
  // So we'll just update product images with a public URL.
  // For now, we'll use a placeholder or previous uploaded image URL.
  return imageUrlOrPath;
}

async function setMounjaroProductImage(productId) {
  const imageUrl = 'https://mounjaro-alert.vercel.app/assets/001-professional-female-pharmacist-doctor-he.png';
  await stripe.products.update(productId, {
    images: [imageUrl],
  });
  console.log(`✅ Mounjaro Alert product image set to: ${imageUrl}`);
}

async function setEbookGenProductImage(productId) {
  // Try to find a cover image in the project
  const possiblePaths = [
    'public/cover-3d.png',
    'public/cover-mockup.png',
    'public/ebook-cover.png',
    'assets/cover.png',
  ];
  let imageUrl = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      // Assuming Vercel deployment URL; adapt as needed
      imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${p}`;
      break;
    }
  }
  // If not found, use a placeholder or skip
  if (!imageUrl) {
    console.log('⚠️ No cover image found for EbookGen Pro; skipping image update.');
    return;
  }
  await stripe.products.update(productId, {
    images: [imageUrl],
  });
  console.log(`✅ EbookGen Pro product image set to: ${imageUrl}`);
}

async function main() {
  try {
    // Get product IDs from env or from previous creation
    const mounjaroPriceId = process.env.MOUNJARO_PRICE_ID;
    const ebookgenPriceId = process.env.EBOOKGEN_PRICE_ID;

    // Retrieve products via price lookup
    let mounjaroProductId = null;
    let ebookgenProductId = null;

    if (mounjaroPriceId) {
      const price = await stripe.prices.retrieve(mounjaroPriceId);
      mounjaroProductId = typeof price.product === 'string' ? price.product : price.product.id;
      await setMounjaroProductImage(mounjaroProductId);
    }

    if (ebookgenPriceId) {
      const price = await stripe.prices.retrieve(ebookgenPriceId);
      ebookgenProductId = typeof price.product === 'string' ? price.product : price.product.id;
      await setEbookGenProductImage(ebookgenProductId);
    }

    console.log('✅ Product image personalization complete.');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();