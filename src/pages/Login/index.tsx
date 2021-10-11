import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import Input from "components/Input";

import validateLogin from "utils/validateLogin";

import { Container } from "./styles";

type LoginForm = { username: string; password: string };
type ErrorField = { username: string[]; password: string[] };
type EventTargetDestructuring = { name: string; value: string };

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long.")
    .required(),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long.")
    .required(),
});

const defaultFormState: LoginForm = {
  username: "",
  password: "",
};

const defaultFieldErrorsState: ErrorField = {
  username: [],
  password: [],
};

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<LoginForm>(defaultFormState);
  const [isValidLogin, setIsValidLogin] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<ErrorField>(
    defaultFieldErrorsState
  );

  const login = (e: any) => {
    (async () => {
      e.preventDefault();

      setIsLoading(true);
      try {
        await loginSchema.validate(formData, { abortEarly: false });
        await validateLogin(formData);
        setIsValidLogin(true);
        setFormData(defaultFormState);
        setFieldErrors(defaultFieldErrorsState);
      } catch (err: any) {
        err.errors?.length > 0
          ? setErrors(err.errors)
          : setErrors(["Invalid Username or Password"]);
      }
      setIsLoading(false);
    })();
  };

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: EventTargetDestructuring = e.target;
    if (value === "") {
      setFieldErrors({ ...fieldErrors, [name]: [] });
    } else {
      try {
        await Yup.reach(loginSchema, name).validate(value);
        setFieldErrors({ ...fieldErrors, [name]: [] });
      } catch (err: any) {
        setFieldErrors({ ...fieldErrors, [name]: err.errors });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // Check if length of field values > 0
  // (must be here because empty fields have no errors)
  // Check if there is no error
  const isEnabled =
    Object.values(formData).every((item) => item.length > 0) &&
    Object.values(fieldErrors).every((value) => {
      return value.length === 0;
    });

  return (
    <Container>
      <h1>Login</h1>
      {errors.length > 0 &&
        errors.map((error) => <p style={{ color: "red" }}>{error}</p>)}
      {isValidLogin && <p style={{ color: "green" }}>Credenciais corretas</p>}
      <form onSubmit={login}>
        <Input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          labelContent="Username"
          value={formData.username}
          onChange={onChangeInput}
          fieldErrors={fieldErrors.username}
          required
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          labelContent="Password"
          value={formData.password}
          onChange={onChangeInput}
          fieldErrors={fieldErrors.password}
          required
        />
        <button type="submit" disabled={!isEnabled}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <Link to="/register">Criar conta</Link>
    </Container>
  );
}

export default Login;
