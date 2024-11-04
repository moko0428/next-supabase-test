import { getProfileById } from '@/actions/auth/user.action';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import TodoContainer from './components/TodoContainer';

type Props = {
  params: { user_id: string };
};

const page = async (props: Props) => {
  const userId = props?.params?.user_id;
  const profile = await getProfileById({ serverComponent: true, userId });
  const userName = profile?.full_name;
  if (!profile) permanentRedirect('/');
  return (
    <div>
      <TodoContainer sharedUserFullName={userName ?? ''} ownerUserId={userId} />
    </div>
  );
};

export default page;
