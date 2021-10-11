import { useHistory } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { Container } from "./styles";

enum UsePurpose {
  PERSONAL = "Personal",
  TEAM = "Team",
}

enum OtherProducts {
  GITHUB = "Github",
  SLACK = "Slack",
  GMAIL = "Gmail",
  TRELLO = "Trello",
}

interface SurveyProps {
  previousStep: any;
  nextStep: any;
  setFormData: any;
  formData: any;
}

interface AccountFieldProps {
  otherComments: string;
  usePurpose: string;
  otherProducts: OtherProducts[];
}

function SurveyFields({
  previousStep,
  nextStep,
  setFormData,
  formData,
}: SurveyProps) {
  return (
    <Container>
      <h1>SurveyFields</h1>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setFormData((prevState: any) => {
              return { ...prevState, ...values };
            });
            nextStep();
          }, 1000);
        }}
      >
        {({ isValid, dirty, isSubmitting, values }) => (
          <Form>
            <div className="row">
              <label htmlFor="otherComments">Other comments</label>
              <Field name="otherComments" type="text" />
              <ErrorMessage
                className="error"
                component="div"
                name="otherComments"
              />
            </div>

            <div className="row">
              <p>
                Are you using the product for personal use or with your team?
              </p>
              <div role="group" className="checkbox">
                {Object.values(UsePurpose).map((purpose: string) => (
                  <label>
                    <Field type="radio" name="usePurpose" value={purpose} />
                    {purpose}
                  </label>
                ))}
              </div>
            </div>

            <div className="row">
              <p>Which other products do you use?</p>
              <div role="group" className="checkbox">
                {Object.values(OtherProducts).map((product: any) => (
                  <label>
                    <Field
                      type="checkbox"
                      name="otherProducts"
                      value={product}
                    />
                    {product}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={previousStep}>Previous</button>
            <button type="submit" disabled={!isValid}>
              {isSubmitting ? "Loading..." : "Continue"}
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SurveyFields;
