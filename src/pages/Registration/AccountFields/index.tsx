import { useHistory } from "react-router-dom";
import FormikDatePicker from "components/FormikDatePicker";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { Container } from "./styles";

interface AccountFieldsProps {
  nextStep: any;
}

interface AccountFieldProps {
  username: string;
  email: string;
  password: string;
  birth_date: Date;
}

const defaultFormState: AccountFieldProps = {
  username: "",
  email: "",
  password: "",
  birth_date: new Date(new Date().toDateString()),
};

const today: Date = new Date();

function AccountFields({ nextStep }: AccountFieldsProps) {
  const history = useHistory();
  return (
    <Container>
      <h1>Account Fields</h1>
      <Formik
        initialValues={defaultFormState}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .max(50, "Must be 50 characters or less")
            .min(5, "Must be 5 characters or more")

            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          birth_date: Yup.date()
            .max(today, "Date cannot be after today")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
            nextStep();
          }, 1000);
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="row">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage className="error" component="div" name="username" />
            </div>
            <div className="row">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" />
              <ErrorMessage className="error" component="div" name="email" />
            </div>

            <div className="row">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage className="error" component="div" name="password" />
            </div>

            <div className="row">
              <label htmlFor="birth_date">Birth Date</label>
              <FormikDatePicker name="birth_date" maxDate={new Date()} />
              <ErrorMessage
                className="error"
                component="div"
                name="birth_date"
              />
            </div>

            <button onClick={() => history.push("/login")}>Back</button>
            <button type="submit" disabled={!(isValid && dirty)}>
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AccountFields;
