import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyfspcmbuzoiorltbybq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5ZnNwY21idXpvaW9ybHRieWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNTQ4OTQsImV4cCI6MjEwNDczMDg5NH0.ScA_GOQtXzSQjPKE2OB6U2uFxIRTZ579LBrvu5XeYew';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);