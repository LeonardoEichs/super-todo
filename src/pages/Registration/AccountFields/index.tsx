import { useHistory } from "react-router-dom";
import FormikDatePicker from "components/FormikDatePicker";
import ImgPreview from "components/ImgPreview";

import { Formik, Field, Form, ErrorMessage } from "formik";

import { FormDataProps } from "ts/types/register";

import * as Yup from "yup";

import { Container, ButtonContainer } from "../styles";

interface AccountFieldsProps {
  nextStep: () => void;
  setFormData: (
    value: FormDataProps | ((prevState: FormDataProps) => FormDataProps)
  ) => void;
  formData: FormDataProps;
}

const today: Date = new Date();

function AccountFields({
  nextStep,
  setFormData,
  formData,
}: AccountFieldsProps) {
  const history = useHistory();

  return (
    <Container>
      <h1>Account Fields</h1>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, "Must be 30 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
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
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setFormData(values);
            nextStep();
          }, 1000);
        }}
      >
        {({ isValid, dirty, isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage className="error" component="div" name="name" />
            </div>
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
            <div className="row">
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                id="profilePic"
                style={{ display: "none" }}
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    "profilePic",
                    event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : new File([""], "")
                  );
                }}
              />
              <input
                className={"inputButton"}
                type="button"
                value="Browse..."
                onClick={() => {
                  return document.getElementById("profilePic")?.click();
                }}
              />
              <ImgPreview file={values.profilePic} />
              <ErrorMessage
                className="error"
                component="div"
                name="profilePic"
              />
            </div>
            <ButtonContainer>
              {" "}
              <button onClick={() => history.push("/login")}>Back</button>
              <button
                className={"primary"}
                type="submit"
                disabled={!(isValid && dirty)}
              >
                {isSubmitting ? "Loading..." : "Continue"}
              </button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AccountFields;
