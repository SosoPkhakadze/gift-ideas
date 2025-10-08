import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft, ExternalLink, Star, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function GiftCategory() {
  const router = useRouter();
  const { slug } = router.query;

  // Get category info based on slug
  const category = getCategoryBySlug(slug as string);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <Link href="/top-gifts" className="text-primary-purple hover:underline">
            Back to Top Gifts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{category.title} - Gift Ideas</title>
        <meta name="description" content={category.description} />
      </Head>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/top-gifts"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-purple mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Collections
          </Link>

          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-white`}>
                {category.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  {category.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  {category.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {category.products.map((product: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl">{product.emoji}</div>
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary-purple text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-purple transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Why It's Great */}
                  <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-primary-purple">Why it's great:</span> {product.whyGreat}
                    </p>
                  </div>

                  {/* Price and Action */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-primary-purple">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-glow transition-all group/btn"
                    >
                      View
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Reviews Count */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>{product.reviews} reviews</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center bg-gradient-to-br from-primary-purple to-purple-glow rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let our AI help you discover the perfect personalized gift
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-primary-purple font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Use AI Gift Finder
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Helper function to get category data
function getCategoryBySlug(slug: string) {
  const categories: Record<string, any> = {
    'girlfriend-under-6': {
      title: 'Adorable Gifts for Your Girlfriend Under $6',
      description: 'Thoughtful doesn\'t mean expensive — perfect budget gifts to make her smile!',
      color: 'bg-gradient-to-br from-pink-400 to-rose-400', // A nice, warm gradient for "girlfriend" gifts
      icon: '💖', // An appropriate emoji for this category
      products: [
        {
          name: 'Lemon Lavender Candle',
          description: 'Cozy Vibes in a Jar. This candle smells like calm evenings and warm hugs, perfect for unwinding.',
          whyGreat: 'Helps her relax and creates a soothing atmosphere.',
          price: '4.99',
          originalPrice: '9.99',
          rating: '4.2',
          reviews: '295',
          emoji: '🕯️',
          link: 'https://amzn.to/48kpJwV',
          badge: 'Limited time deal',
        },
        {
          name: 'CoverGirl Clean Fresh Tinted Lip Balm',
          description: 'Sweet and Subtle Beauty. Keeps her lips soft, hydrated, and kissable with a natural finish.',
          whyGreat: 'A practical daily beauty essential that makes her feel pampered.',
          price: '4.98',
          originalPrice: '7.99',
          rating: '4.4',
          reviews: '10,360',
          emoji: '💄',
          link: 'https://amzn.to/4ocXwwU',
          badge: 'Prime Big Deal',
        },
        {
          name: 'Lenox Butterfly Meadow Cup',
          description: 'Morning Coffee, But Make It Charming. This butterfly-patterned cup will instantly make her mornings brighter.',
          whyGreat: 'Adds a touch of joy and charm to her daily coffee or tea ritual.',
          price: '5.98',
          originalPrice: '7.99',
          rating: '4.6',
          reviews: '5,512',
          emoji: '☕',
          link: 'https://amzn.to/4ofbI8F',
          badge: 'Prime Big Deal',
        },
        {
          name: 'Vlando Mini Travel Jewelry Case with Mirror',
          description: 'For Her Little Treasures. Perfect for keeping her favorite rings, earrings, or necklaces safe, with a built-in mirror.',
          whyGreat: 'Practical for travel and organizing her small accessories.',
          price: '4.83',
          originalPrice: '5.69',
          rating: '4.7',
          reviews: '646',
          emoji: '💍',
          link: 'https://amzn.to/3WraJGl',
          badge: 'Prime Big Deal',
        },
        {
          name: 'My Sticker Dress-Up: Dancers',
          description: 'A Fun & Wholesome Surprise. An activity book filled with dancers, costumes, and tons of reusable stickers for creative fun.',
          whyGreat: 'A nostalgic and playful gift for artistic souls.',
          price: '5.99', // Assuming a price under $6, as it's not explicitly listed but implied by the collection title. You might want to confirm this price.
          rating: '4.6',
          reviews: '888',
          emoji: '💃',
          link: 'https://amzn.to/4pY7Lqf',
          badge: '#1 Best Seller',
        },
        {
          name: 'BS-MALL Triangle Makeup Sponge Set',
          description: 'Because Beauty Starts with the Basics. These makeup sponges help blend foundation like a dream, making her beauty routine smoother.',
          whyGreat: 'A practical and cute gift she\'ll use every day for flawless makeup application.',
          price: '5.94',
          originalPrice: '6.99',
          rating: '4.6',
          reviews: '1,154',
          emoji: ' sponges', // Changed to represent makeup sponges
          link: 'https://amzn.to/3J2752D',
          badge: 'Prime Big Deal',
        },
      ],
    },
    'art-lovers': {
      title: 'Gifts for Art Lovers',
      description: 'Creative and inspiring gifts for artists and art enthusiasts',
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      icon: '🎨',
      products: [
        {
          name: 'Professional Watercolor Paint Set',
          description: 'Premium quality watercolors with rich pigments and smooth blending',
          whyGreat: 'Artist-grade quality that professionals trust',
          price: '42.99',
          originalPrice: '59.99',
          rating: '4.9',
          reviews: '1,234',
          emoji: '🎨',
          link: 'https://amazon.com',
          badge: 'Bestseller',
        },
        {
          name: 'Digital Drawing Tablet',
          description: 'Pressure-sensitive tablet for digital art creation',
          whyGreat: 'Perfect for digital artists and illustrators',
          price: '89.99',
          rating: '4.7',
          reviews: '856',
          emoji: '✏️',
          link: 'https://amazon.com',
        },
        {
          name: 'Art History Coffee Table Book',
          description: 'Beautifully illustrated journey through art movements',
          whyGreat: 'Stunning visuals and insightful commentary',
          price: '34.99',
          rating: '4.8',
          reviews: '423',
          emoji: '📚',
          link: 'https://amazon.com',
        },
        {
          name: 'Acrylic Paint Marker Set',
          description: 'Vibrant permanent markers for any surface',
          whyGreat: 'Versatile and easy to use on multiple surfaces',
          price: '24.99',
          originalPrice: '34.99',
          rating: '4.6',
          reviews: '2,103',
          emoji: '🖊️',
          link: 'https://amazon.com',
        },
        {
          name: 'Artist Sketch Book Bundle',
          description: 'Premium quality paper for all drawing media',
          whyGreat: 'Thick paper that prevents bleed-through',
          price: '19.99',
          rating: '4.9',
          reviews: '3,456',
          emoji: '📓',
          link: 'https://amazon.com',
          badge: 'Top Rated',
        },
        {
          name: 'LED Art Studio Lamp',
          description: 'Adjustable lighting for perfect color accuracy',
          whyGreat: 'Professional lighting reduces eye strain',
          price: '67.99',
          rating: '4.8',
          reviews: '789',
          emoji: '💡',
          link: 'https://amazon.com',
        },
      ],
    },
    'girlfriend': {
      title: 'Top 10 Gifts for Your Girlfriend',
      description: 'Show her how much you care with these thoughtful and romantic gifts',
      color: 'bg-gradient-to-br from-rose-500 to-pink-500',
      icon: '💝',
      products: [
        {
          name: 'Personalized Name Necklace',
          description: 'Elegant custom jewelry with her name in beautiful script',
          whyGreat: 'Personal and meaningful, she can wear it every day',
          price: '39.99',
          rating: '4.9',
          reviews: '5,234',
          emoji: '💎',
          link: 'https://amazon.com',
          badge: 'Bestseller',
        },
        {
          name: 'Spa Gift Set Luxury Collection',
          description: 'Premium bath bombs, lotions, and aromatherapy',
          whyGreat: 'Perfect for relaxation and self-care',
          price: '49.99',
          originalPrice: '79.99',
          rating: '4.8',
          reviews: '3,102',
          emoji: '🛁',
          link: 'https://amazon.com',
        },
        {
          name: 'Silk Pillowcase Set',
          description: 'Luxurious silk for better sleep and skin health',
          whyGreat: 'Reduces hair frizz and promotes healthy skin',
          price: '29.99',
          rating: '4.7',
          reviews: '2,456',
          emoji: '😴',
          link: 'https://amazon.com',
        },
        {
          name: 'Customized Photo Album',
          description: 'Leather-bound album for your precious memories',
          whyGreat: 'Sentimental gift that celebrates your relationship',
          price: '44.99',
          rating: '5.0',
          reviews: '1,890',
          emoji: '📸',
          link: 'https://amazon.com',
          badge: 'Top Rated',
        },
        {
          name: 'Designer Handbag',
          description: 'Elegant crossbody bag in trending colors',
          whyGreat: 'Stylish accessory she\'ll use daily',
          price: '89.99',
          originalPrice: '129.99',
          rating: '4.8',
          reviews: '4,567',
          emoji: '👜',
          link: 'https://amazon.com',
        },
        {
          name: 'Smart Jewelry Box',
          description: 'Elegant storage with LED lights and mirror',
          whyGreat: 'Keeps her jewelry organized and safe',
          price: '54.99',
          rating: '4.6',
          reviews: '987',
          emoji: '💍',
          link: 'https://amazon.com',
        },
      ],
    },
    // Add more categories as needed
  };

  return categories[slug] || null;
}