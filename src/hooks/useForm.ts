import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, ChangeEventHandler, FocusEvent, FocusEventHandler, FormEvent, FormEventHandler } from 'react';

type TFormValue = Record<string, any>;
type ErrorFields<T extends TFormValue> = { [name in keyof T]: { message: string }; };
type TouchedFields<T extends TFormValue> = { [name in keyof T]: boolean };

interface useFormArgs<T extends TFormValue> {
  initialValues: T;
  validate: (values: T) => ErrorFields<T>;
  onSubmit: (values: T) => void;
}

interface useFormReturn<T extends TFormValue> {
  values: T;
  errors: ErrorFields<T>;
  touched: TouchedFields<T>;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  handleSubmit: FormEventHandler;
}

const useForm = <T extends TFormValue>({
  initialValues,
  validate,
  onSubmit
}: useFormArgs<T>): useFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<TouchedFields<T>>({} as TouchedFields<T>);
  const [errors, setErrors] = useState<ErrorFields<T>>({} as ErrorFields<T>);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  } 

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((touched, field) => {
        touched[field as keyof typeof values] = true
        return touched
      }, {} as TouchedFields<T>)
    )

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some(v => v)) {
      return;
    }

    onSubmit(values);
  }

  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator])

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  }
};

export { useForm };
export type {
  TFormValue,
  ErrorFields,
  TouchedFields,
  useFormArgs,
  useFormReturn
}