import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PLACE_ID = 'ChIJmV_f1yr_sUARNEf83Ig3aYM';

Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      return Response.json({ error: 'Missing API key' }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}&language=ro`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK') {
      return Response.json({ error: data.status, message: data.error_message }, { status: 400 });
    }

    const { name, rating, user_ratings_total, reviews } = data.result;

    return Response.json({ name, rating, user_ratings_total, reviews: reviews || [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});