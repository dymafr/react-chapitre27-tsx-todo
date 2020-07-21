import React from 'react';
import TodoItem from './TodoItem';
import TodoEdit from './TodoEdit';
import { Todo } from '../../../interfaces';

interface TodoListProps {
  todos: Todo[] | undefined;
  deleteTodo: (index: number) => void;
  editTodo: (todo: Todo, index: number) => void;
  toggleEditMode: (index: number) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul className="list-group">
      {props.todos &&
        props.todos.map((t, i) =>
          t.editMode ? (
            <TodoEdit
              key={t.name}
              todo={t}
              toggleEditMode={() => props.toggleEditMode(i)}
              editTodo={(todo: Todo) => props.editTodo(todo, i)}
            />
          ) : (
            <TodoItem
              key={t.name}
              todo={t}
              deleteTodo={() => props.deleteTodo(i)}
              editTodo={(todo: Todo) => props.editTodo(todo, i)}
              toggleEditMode={() => props.toggleEditMode(i)}
            />
          )
        )}
    </ul>
  );
};

export default TodoList;
