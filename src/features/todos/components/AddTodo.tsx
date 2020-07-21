import React, { useRef } from 'react';
import { Todo } from '../../../interfaces';

export interface AddTodoProps {
  addTodo: (todo: Todo) => void;
}

const AddTodo = (props: AddTodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const submitTodo = () => {
    if (ref?.current?.value) {
      props.addTodo({
        name: ref.current.value,
        done: false,
        editMode: false,
      });

      ref.current.value = '';
    }
  };

  return (
    <div className="d-flex mb-4">
      <input
        ref={ref}
        type="text"
        placeholder="Ajouter une todo"
        className="form-control mr-5"
      />
      <button onClick={submitTodo} className="btn btn-success">
        Ajouter
      </button>
    </div>
  );
};

export default AddTodo;
