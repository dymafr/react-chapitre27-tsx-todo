import React from 'react';
import { Todo } from '../../../interfaces';

export interface TodoItemsProps {
  todo: Todo;
  editTodo: (todo: Todo) => void;
  deleteTodo: () => void;
  toggleEditMode: () => void;
}

const TodoItem = ({
  todo,
  editTodo,
  deleteTodo,
  toggleEditMode,
}: TodoItemsProps) => {
  return (
    <li
      onClick={() =>
        editTodo({
          ...todo,
          done: !todo.done,
        })
      }
      className="list-group-item d-flex flex-row justify-content-between align-items-center list-group-item-action"
    >
      <span> {todo.name} </span>
      <span>
        <input
          className="mx-3"
          checked={todo.done}
          onChange={() => {}}
          type="checkbox"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo();
          }}
          className="btn btn-sm btn-danger mr-1"
        >
          delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleEditMode();
          }}
          className="btn btn-sm btn-success"
        >
          Edit
        </button>
      </span>
    </li>
  );
};

export default TodoItem;
