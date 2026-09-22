import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ykeuhzossgqmjrpkejev.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HwTLbkvbF6gk08WwVrFWQg_KwEfRh0Z"
);
