'use server';

import { createServerSideClient } from '@/lib/supabase';

// todolist 가져오기
export const getTodos = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .select('*')
    .is('deleted_at', null)
    .order('id', {
      ascending: false,
    });

  return result.data;
};

// todolist 가져오기 + by Id
export const getTodosById = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .select('*')
    .is('deleted_at', null)
    .eq('id', id);

  return result.data;
};

// todolist 가져오기 + by UserId
export const getTodosByUserId = async (userId: string) => {
  const supabase = await createServerSideClient(true);
  const result = await supabase
    .from('todos_with_rls')
    .select('*')
    .is('deleted_at', null)
    .eq('user_id', userId);

  return result.data;
};
// todolist 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .select('*')
    .is('deleted_at', null)
    .ilike('content', `%${terms}%`)
    .order('id', { ascending: false })
    .limit(500);

  return result.data;
};

// todolist 생성하기
export const createTodos = async (content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .insert({ content })
    .select();

  return result.data;
};

// todolist 업데이트
export const updateTodos = async (id: number, content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return result.data;
};

// todolist 삭제하기 (soft)
export const deleteTodosSoft = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from('todos_with_rls')
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return result.data;
};

//todolist 삭제하기 (hard)
// export const deleteTodosHard = async (id: number) => {
//   const supabase = await createServerSideClient();
//   const result = await supabase.from('todos_with_rls').delete().eq('id', id);

//   return result.data;
// };
