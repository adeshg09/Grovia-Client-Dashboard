/* Imports */
import { useContext, type JSX } from "react";

/* Relative Imports */
import SessionContext from "@/context/SessionContext";

/* Local Imports */

// ----------------------------------------------------------------------

/**
 * Component to create the signin form and it's outer design.
 *
 * @component
 * @returns {JSX.Element}
 */
const SignIn = (): JSX.Element => {
  /* Hooks */
  const { LoginUser } = useContext(SessionContext);

  /* Functions */
  /**
   * function to set token and user details in session context.
   * @param {string} token - auth token to set for api validations
   * @param {boolean} rememberMe - flag to remember user for 30 days
   * @returns {void}
   */
  const handleSignIn = (token: string, rememberMe: boolean): void => {
    LoginUser(token, rememberMe);
  };

  return <div>SignIn</div>;
};

export default SignIn;
