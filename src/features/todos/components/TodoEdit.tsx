import React from 'react';
import { Formik, useField } from 'formik';
import { Todo } from '../../../interfaces';

export interface TodoEditModeProps {
  editTodo: (todo: Todo) => void;
  toggleEditMode: () => void;
  todo: Todo;
}

export interface MyInputProps {
  name: string;
  type: string;
}

const MyInput = (props: MyInputProps) => {
  const [field] = useField(props);

  return <input className="form-control mr-2" {...field} {...props} />;
};

const TodoEditMode = ({
  editTodo,
  toggleEditMode,
  todo,
}: TodoEditModeProps) => {
  const submit = (values: Partial<Todo>) => {
    editTodo({ ...todo, ...values, editMode: false });
  };

  return (
    <Formik onSubmit={submit} initialValues={{ name: todo.name }}>
      {({ handleSubmit }) => (
        <form
          className="d-flex flex-row justify-content-start align-items-center py-2"
          onSubmit={handleSubmit}
        >
          <MyInput name="name" type="text" />
          <button type="submit" className="btn btn-sm btn-primary mr-2">
            Save
          </button>
          <button
            type="button"
            onClick={toggleEditMode}
            className="btn btn-sm btn-warning"
          >
            Cancel
          </button>
        </form>
      )}
    </Formik>
  );
};

export default TodoEditMode;
