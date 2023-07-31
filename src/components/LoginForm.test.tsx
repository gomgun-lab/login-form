// 비밀벝호 마스킹
// 특수문자 2개 이상
// 아이디 공백 불가
// 엔터키 시 폼 제출
// 이메일 형식 체크 
// 비밀번호, 비밀번호 확인이 같아야 함 
// 유효성 검사를 통과 실패 시 인풋 빨간색

import { render, screen } from '@testing-library/react';
import user from "@testing-library/user-event";

import { SignupForm } from './LoginForm'

describe("회원가입 폼 컴포넌트", () => {
  test("회원가입 폼이 올바르게 렌더링 되어야 한다.", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "회원가입"})).toBeInTheDocument();
  })

  test("빈 이메일 값 입력 시, '유효한 이메일을 입력해주세요.' 문구가 출력된다.", async () => {
    render(<SignupForm/>)

    const emailField = screen.getByLabelText("이메일");
    const button = screen.getByRole("button", { name: "회원가입"});

    await user.type(emailField, " ");
    await user.click(button);

    expect(await screen.findByText("유효한 이메일을 입력해주세요.")).toBeInTheDocument();
  })

  test("올바르지 않은 이메일 값 입력 시, '유효한 이메일을 입력해주세요.' 문구가 출력된다.", async () => {
    render(<SignupForm/>)

    const emailField = screen.getByLabelText("이메일");
    const button = screen.getByRole("button", { name: "회원가입"});

    await user.type(emailField, "invalid email");
    await user.click(button);

    expect(await screen.findByText("유효한 이메일을 입력해주세요.")).toBeInTheDocument();
  })

  test("빈 비밀번호 값 입력 시, '유효한 비밀번호를 입력해주세요.' 문구가 출력된다.", async () => {
    render(<SignupForm/>)

    const passwordField = screen.getByLabelText("비밀번호");
    const button = screen.getByRole("button", { name: "회원가입"});

    await user.type(passwordField, " ");
    await user.click(button);

    expect(await screen.findByText("유효한 비밀번호를 입력해주세요.")).toBeInTheDocument();
  })

  test("비밀번호는 2개 이상의 특수문자를 포함해야 한다.", async () => {
    render(<SignupForm/>)

    const passwordField = screen.getByLabelText("비밀번호");
    const passwordConfirmField = screen.getByLabelText("비밀번호 확인")
    const button = screen.getByRole("button", { name: "회원가입"});

    await user.type(passwordField, "qwe@#34");
    await user.type(passwordConfirmField, "qwe@#34");
    await user.click(button);

    expect(await screen.findByText("유효한 비밀번호를 입력해주세요.")).toThrow();
  })

  // test("폼 입력 중 엔터키 입력시 폼이 제출되어야 한다.", () => {})

  // test("폼의 유효성 검사를 통과할 경우 제출 콜백 함수가 실행되어야 한다.", () => {})

  // test("폼의 유효성 검사를 실패할 경우 폼의 테두리가 붉은 색으로 표시되어야 한다.", () => {})
})