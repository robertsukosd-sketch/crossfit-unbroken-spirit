import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PRIVATE_CALENDAR_TOKEN = 'calendar-usf-8m4q-z7n2-k9vx';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    if (payload?.token !== PRIVATE_CALENDAR_TOKEN) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const signups = await base44.asServiceRole.entities.CalendarSignup.list('-created_date', 2000);
    return Response.json({ signups });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});