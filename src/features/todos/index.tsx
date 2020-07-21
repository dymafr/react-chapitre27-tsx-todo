import React, { useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';
import './store';
import { useDispatch, useSelector } from 'react-redux';
import { filteredTodoDataSelector } from './store/selectors';
import {
  tryAddTodoAction,
  fetchTodoAction,
  tryDeleteTodoAction,
  tryEditTodoAction,
  toggleEditModeAction,
} from './store/actions';
import { RouteChildrenProps } from 'react-router-dom';
import { Todo } from '../../interfaces';
import { GlobalTodoState } from './store';

const Todos = (props: RouteChildrenProps<{ filter: string }>) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodoAction());
  }, [dispatch]);

  const todos = useSelector((state: GlobalTodoState) => {
    return filteredTodoDataSelector(state, props?.match?.params.filter);
  });

  const tryAddTodo = (todo: Todo) => {
    dispatch(tryAddTodoAction(todo));
  };

  const deleteTodo = (index: number) => {
    dispatch(tryDeleteTodoAction(index));
  };

  const editTodo = (todo: Todo, index: number) => {
    dispatch(tryEditTodoAction(todo, index));
  };

  const toggleEditMode = (index: number) => {
    dispatch(toggleEditModeAction(index));
  };

  return (
    <>
      <h4>Ajouter une todo</h4>
      <hr className="my-4" />
      <AddTodo addTodo={tryAddTodo} />
      <hr className="my-4" />
      <div className="card">
        <div className="card-header d-flex flex-row align-items-center">
          <span className="flex-fill">Todo list</span>
          <Filter />
        </div>
        <div className="card-body">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleEditMode={toggleEditMode}
          />
        </div>
      </div>
    </>
  );
};

export default Todos;
