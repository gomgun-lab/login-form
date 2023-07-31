import { useForm } from "../hooks/useForm";
import type { ErrorFields } from '../hooks/useForm'
import { hasTwoOrMoreSpecialCharacters, isValidEmail } from "../utils/validate";

const initialValues = {
  email: "",
  password: "",
  passwordConfirm: ""
}

type SignupFormValues = typeof initialValues;

const validate = (props: SignupFormValues) => {
  const { email, password, passwordConfirm } = props;
  const errors = {} as ErrorFields<SignupFormValues> ;

  if (email === "") {
    errors["email"] = { message: "유효한 이메일을 입력해주세요." }
  }

  if (!isValidEmail(email)) {
    errors["email"] = { message: "유효한 이메일을 입력해주세요." }
  }

  if (password !== passwordConfirm) {
    errors["password"] = { message: "비밀번호가 일치하지 않습니다." }
  }

  if (password === "") {
    errors["password"] = { message: "유효한 비밀번호를 입력해주세요." }
  }

  if (!hasTwoOrMoreSpecialCharacters(password)) {
    errors["password"] = { message: "유효한 비밀번호를 입력해주세요." }
  }
  
  return errors;
}

const onSubmit = (props: SignupFormValues) => {
  console.log(props);
}

const SignupForm = () => {
  const { values ,errors, touched, handleChange, handleSubmit } = useForm<SignupFormValues>({ initialValues, validate, onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="text" value={values.email} onChange={handleChange}/>
      </div>

      { touched["email"] && errors.email && <p>{ errors.email.message }</p>}
      
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" value={values.password} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input id="passwordConfirm" name="passwordConfirm" type="text" value={values.passwordConfirm} onChange={handleChange}/>
      </div>
      
      { touched["password"] && errors.password && <p>{ errors.password.message }</p>}

      <button type="submit">회원가입</button>
    </form>
  );
};

export { SignupForm };
