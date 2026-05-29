-- Run once in Supabase SQL Editor (public.shares must already exist)
ALTER TABLE public.shares
ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '';

COMMENT ON COLUMN public.shares.title IS 'Display name shown in the editor header';
