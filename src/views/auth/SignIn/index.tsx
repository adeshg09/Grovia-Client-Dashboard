/* Imports */
import { useContext, type JSX } from "react";

/* Relative Imports */
import clsx from "clsx";

/* Local Imports */
import SessionContext from "@/context/SessionContext";
import { typography } from "@/theme/typography";
import AuthPage from "@/components/Page/AuthPage";
import SignInForm from "./components/SignInForm";
import AppLogo from "@/assets/images/appLogo.png";

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
  const handleSignIn = (
    token: string,
    rememberMe?: boolean,
    selectedLoginOption?: any
  ): void => {
    console.log("token", token);
    LoginUser(token, rememberMe, selectedLoginOption);
  };

  return (
    <AuthPage title="Sign In">
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="flex flex-col items-start gap-2">
          <img src={AppLogo} alt="App Logo" className="h-14" />
          <h1 className={typography.semibold24}>Welcome to Grovia</h1>
          <p
            className={clsx(
              typography.regular14,
              "text-secondary-400 dark:text-secondary-300"
            )}
          >
            Lets get you signed in
          </p>
        </div>

        {/* Sign In form */}
        <SignInForm onSubmitSuccess={handleSignIn} />
      </div>
    </AuthPage>
  );
};

export default SignIn;
