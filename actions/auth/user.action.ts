import { createServerSideClient } from '@/lib/supabase';
// { serverComponent = false }
export const getUser = async () => {
  const supabase = await createServerSideClient();
  const user = await supabase.auth.getUser();
  return user?.data?.user;
};

export const getProfileById = async ({
  serverComponent = false,
  userId = '',
}) => {
  const supabase = await createServerSideClient(serverComponent);
  const profile = await supabase.from('profiles').select('*').eq('id', userId);

  return profile?.data?.[0];
};
