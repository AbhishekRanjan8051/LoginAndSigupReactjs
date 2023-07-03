import React, { useState } from "react";
import * as Components from "./Components";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function App() {
  const [signIn, toggle] = useState(true);
  const [show, setShow] = useState(false);
  const handleLogin = (e, key) => {
    e.preventDefault();
    if (key == "login") {
      toast.success("Welocme Back", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (key == "signin") {
      toast.success("Welocme to XYZ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleResetEmail = () => {
    setShow(false);
    toast.success("We Have Send you a reset link on your mail id.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Your Mail Id."),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter Your Password."),
  });
  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Button
            onClick={(e) => {
              handleLogin(e, "signin");
            }}
          >
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              //   setTimeout(() => {
              //     alert(JSON.stringify(values, null, 2));
              //     setSubmitting(false);
              //   }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Components.Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
                <span style={{ fontSize: "15px", color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </span>

                <Components.Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                <span style={{ fontSize: "15px", color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </span>
                <br />
                <Components.Anchor href="#" onClick={() => setShow(true)}>
                  Forgot your password?
                </Components.Anchor>
                <Components.Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    handleLogin(e, "login");
                  }}
                >
                  Log In
                </Components.Button>
              </form>
            )}
          </Formik>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Log In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
      <ToastContainer />

      <Modal show={show} size="lg" onHide={() => setShow(false)}>
        <div style={{ padding: "20px", margin: "auto" }}>
          <span>
            Please Enter the mail or user id to send you the Reset link.
          </span>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ margin: "auto", width: "90%" }}>
              <label htmlFor="email">Enter Email</label>
              <Components.ModalInput type="email" placeholder="Email" />
            </div>
            <div style={{ margin: "auto", width: "80%" }}>
              <Button
                style={{ width: "100%" }}
                onClick={() => handleResetEmail()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Components.Container>
  );
}

export default App;
