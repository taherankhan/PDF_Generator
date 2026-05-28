import { getSupabase } from './supabaseClient';

export type ContactMessage = {
  email: string;
  message: string;
};

export async function submitContactMessage(payload: ContactMessage): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase.from('contact_messages').insert([
    {
      email: payload.email.trim(),
      message: payload.message.trim(),
    },
  ]);

  if (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
}
