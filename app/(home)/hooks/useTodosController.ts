import {
  createTodos,
  deleteTodosSoft,
  getTodosBySearch,
  getTodosByUserId,
  updateTodos,
} from '@/actions/todo/todo.action';
import { Database } from '@/types/database.types';
import { useCallback, useEffect, useState } from 'react';

type TodoDTO = Database['public']['Tables']['todos_with_rls']['Row'];

const useTodosController = (ownerUserId = '') => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoDTO[]>([]);

  const onGetTodos = useCallback(async () => {
    setLoading(true);
    try {
      const resultTodos = await getTodosByUserId(ownerUserId);
      if (resultTodos) setTodos(resultTodos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [ownerUserId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]);

  const onCreateEmptyTodos = async () => {
    await createTodos('');
    await onGetTodos();
  };

  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };

  const onDeleteTodos = async (id: number) => {
    await deleteTodosSoft(id);
    await onGetTodos();
  };

  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const todoResult = await getTodosBySearch(terms);
      if (todoResult) setTodos(todoResult);
    } else {
      await onGetTodos();
    }
  };
  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  };
};

export default useTodosController;
