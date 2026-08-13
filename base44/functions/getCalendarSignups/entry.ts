import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const signups = await base44.asServiceRole.entities.CalendarSignup.list('-created_date', 2000);
    return Response.json({ signups });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});