'use client';

import TodoList from '@/components/ui/TodoList';
import React from 'react';
import useTodosController from '../hooks/useTodosController';

interface TodoContainerProps {
  sharedUserFullName?: string;

  ownerUserId?: string;
}

const TodoContainer = ({
  ownerUserId,
  sharedUserFullName,
}: TodoContainerProps) => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController(ownerUserId);

  return (
    <div>
      <TodoList
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={true}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
