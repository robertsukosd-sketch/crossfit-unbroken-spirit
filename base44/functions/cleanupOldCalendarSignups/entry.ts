import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
    const cutoff = formatDateKey(cutoffDate);

    const oldSignups = await base44.asServiceRole.entities.CalendarSignup.filter({}, 'slot_date', 500);
    const recordsToDelete = oldSignups.filter((signup) => signup.slot_date && signup.slot_date < cutoff);

    await Promise.all(recordsToDelete.map((signup) => base44.asServiceRole.entities.CalendarSignup.delete(signup.id)));

    return Response.json({ deleted: recordsToDelete.length, cutoff });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});