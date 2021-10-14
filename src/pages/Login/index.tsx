import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { AuthContext } from "contexts/auth.context";

import Input from "components/Input";

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
  const { authState, handleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<LoginForm>(defaultFormState);
  const [isValidLogin, setIsValidLogin] = useState<boolean>(false);
  const [fielderrors, setFieldErrors] = useState<ErrorField>(
    defaultFieldErrorsState
  );
  const history = useHistory();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    (async () => {
      e.preventDefault();

      setIsLoading(true);
      try {
        await loginSchema.validate(formData, { abortEarly: false });
        await handleLogin(formData);
        // setIsValidLogin(true);
        // setFormData(defaultFormState);
        // setFieldErrors(defaultFieldErrorsState);
        // setErrors([]);
        // history.push("/todo");
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
      setFieldErrors({ ...fielderrors, [name]: [] });
    } else {
      try {
        await Yup.reach(loginSchema, name).validate(value);
        setFieldErrors({ ...fielderrors, [name]: [] });
      } catch (err: any) {
        setFieldErrors({ ...fielderrors, [name]: err.errors });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // Check if length of field values > 0
  // (must be here because empty fields have no errors)
  // Check if there is no error
  const isEnabled =
    Object.values(formData).every((item) => item.length > 0) &&
    Object.values(fielderrors).every((errorArray) => {
      return errorArray.length === 0;
    });

  return (
    <Container>
      <h1>Login</h1>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      {isValidLogin && <p style={{ color: "green" }}>Credenciais corretas</p>}
      <form onSubmit={login}>
        <Input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          labelcontent="Username"
          value={formData.username}
          onChange={onChangeInput}
          fielderrors={fielderrors.username}
          required
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          labelcontent="Password"
          value={formData.password}
          onChange={onChangeInput}
          fielderrors={fielderrors.password}
          required
        />
        <button className={"primary"} type="submit" disabled={!isEnabled}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <Link to="/registration">Criar conta</Link>
    </Container>
  );
}

export default Login;
