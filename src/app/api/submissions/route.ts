import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

// POST — public form submission (from /contribute page)
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { contributor_name, song_name } = body;
  if (!contributor_name || !song_name) {
    return NextResponse.json({ error: 'Name and song name are required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('submissions')
    .insert({
      contributor_name: body.contributor_name,
      contributor_village: body.contributor_village || '',
      song_name: body.song_name,
      occasion: body.occasion || '',
      lyrics: body.lyrics || '',
      cultural_context: body.cultural_context || '',
      youtube_link: body.youtube_link || '',
      email: body.email || '',
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send email notification to admin
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    if (resendKey && adminEmail) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Himalaya Folk <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Song Submission: ${body.song_name}`,
          html: `
            <h2>New Song Submission</h2>
            <p><strong>Song:</strong> ${body.song_name}</p>
            <p><strong>By:</strong> ${body.contributor_name} from ${body.contributor_village || 'N/A'}</p>
            <p><strong>Occasion:</strong> ${body.occasion || 'N/A'}</p>
            <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
            <br/>
            <p>Review this submission in your <a href="https://himalayafolk.com/admin/submissions">admin dashboard</a>.</p>
          `,
        }),
      });
    }
  } catch {
    // Email is optional — don't fail the submission
  }

  return NextResponse.json({ success: true });
}
