'use client';
import React from 'react';

const TodoListItemReadOnly = ({ todo }) => {
  return (
    <li className="min-h-[60px] bg-[#B280D9] border border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        {todo?.content}
      </article>
    </li>
  );
};

export default TodoListItemReadOnly;
