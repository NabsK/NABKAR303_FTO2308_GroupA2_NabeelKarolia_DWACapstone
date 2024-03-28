import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejdgmjslzlngbrmileqf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZGdtanNsemxuZ2JybWlsZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0ODI5MzMsImV4cCI6MjAyNzA1ODkzM30.ZLg3TjjTkmXxT23IZ86ATRTYsHOLsfK63EIPa5B00C8";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Supabase key is not provided in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
