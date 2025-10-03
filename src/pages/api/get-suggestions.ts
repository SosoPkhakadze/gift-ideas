import type { NextApiRequest, NextApiResponse } from 'next';

type SuggestionData = {
  suggestions: Array<{
    title: string;
    description: string;
    price: string;
    link: string;
  }>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuggestionData | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recipient, age, gender, occasion, interests, budget, relationship } = req.body;

    // TODO: Implement OpenAI API call
    // Example structure:
    // const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [{
    //       role: 'user',
    //       content: `Generate gift keywords for: ${recipient}, age ${age}, ${gender}, occasion: ${occasion}, interests: ${interests}, budget: ${budget}`
    //     }]
    //   })
    // });

    // TODO: Use the AI-generated keywords to query Amazon Product Advertising API
    // Example structure:
    // const amazonResponse = await fetch('https://webservices.amazon.com/paapi5/searchitems', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     PartnerTag: process.env.AMAZON_ASSOCIATE_TAG,
    //     PartnerType: 'Associates',
    //     Keywords: aiGeneratedKeywords,
    //     SearchIndex: 'All',
    //     ItemCount: 6,
    //     Resources: ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price']
    //   })
    // });

    // Placeholder response for testing
    const mockSuggestions = [
      {
        title: `Perfect Gift for ${recipient}`,
        description: `Ideal for someone interested in ${interests}`,
        price: budget.includes('25-50') ? '35.99' : '49.99',
        link: 'https://amazon.com',
      },
      {
        title: `${occasion} Special`,
        description: `Great for ${age} year old ${gender}`,
        price: '42.99',
        link: 'https://amazon.com',
      },
      {
        title: 'Top Rated Choice',
        description: `Perfect for your ${relationship}`,
        price: '67.99',
        link: 'https://amazon.com',
      },
      {
        title: 'Bestseller Gift',
        description: `Matches interests: ${interests.substring(0, 30)}...`,
        price: '28.99',
        link: 'https://amazon.com',
      },
      {
        title: 'Premium Selection',
        description: 'Highly recommended by customers',
        price: '89.99',
        link: 'https://amazon.com',
      },
      {
        title: 'Customer Favorite',
        description: 'Perfect for any occasion',
        price: '54.99',
        link: 'https://amazon.com',
      },
    ];

    return res.status(200).json({ suggestions: mockSuggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return res.status(500).json({ error: 'Failed to generate suggestions' });
  }
}