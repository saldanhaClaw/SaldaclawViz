const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })

async function archiveHealthProducts() {
  try {
    const products = await stripe.products.list({ active: true, limit: 100 })
    
    const healthKeywords = ["peptide", "botox", "skincare", "melatonina", "aromatherapy", "gummies"]
    const toArchive = products.data.filter(p => {
      const name = p.name.toLowerCase()
      return healthKeywords.some(kw => name.includes(kw)) && !name.includes("mounjaro")
    })
    
    console.log(`Found ${toArchive.length} health products to archive:`)
    toArchive.forEach(p => console.log(` - ${p.name} (${p.id})`))
    
    for (const product of toArchive) {
      await stripe.products.update(product.id, { active: false })
      console.log(`Archived: ${product.name}`)
    }
    
    console.log("\nArchiving complete.")
  } catch (err) {
    console.error("Error:", err)
  }
}

archiveHealthProducts()
