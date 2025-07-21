/* Imports */
import React, { type JSX } from "react";

/* Relative Imports */
import { PAGE_ROOT } from "@/routes/paths";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utilities/auth";

// ----------------------------------------------------------------------

/* Types/Interfaces */
export interface ISessionState {
  isAuthenticated: boolean;
  authToken: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isPageLoaded: boolean | null;
  LoginUser: (token: string, rememberMe: boolean) => void;
  LogoutUser: () => void;
}

export interface ISessionProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const initialState: ISessionState = {
  isAuthenticated: false,
  authToken: null,
  user: null,
  isPageLoaded: true,
  LoginUser: async () => {},
  LogoutUser: () => {},
};

const SessionContext = React.createContext<ISessionState>(initialState);

class Session extends React.Component<ISessionProps, ISessionState> {
  constructor(props: ISessionProps) {
    super(props);

    const accessToken = getAccessToken();

    this.state = {
      isAuthenticated: !!accessToken,
      authToken: accessToken || null,
      user: null,
      isPageLoaded: true,

      LoginUser: async (token: string, rememberMe: boolean) => {
        setAccessToken(token, rememberMe);
        this.setState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          authToken: token,
        }));
        await this.getUserProfile();
      },

      LogoutUser: () => {
        removeAccessToken();

        this.setState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
          authToken: null,
          user: null,
        }));
        window.location.href = PAGE_ROOT.signIn.absolutePath;
      },
    };
    // Bind methods to the class instance
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount(): void {
    if (this.state.authToken) {
      this.getUserProfile();
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isPageLoaded: false,
      }));
    }
  }
  async getUserProfile(): Promise<void> {}

  render(): JSX.Element {
    return (
      <SessionContext.Provider value={this.state}>
        {!this.state.isPageLoaded && this.props.children}
      </SessionContext.Provider>
    );
  }
}

export default SessionContext;
export const SessionProvider = Session;
export const SessionConsumer = SessionContext.Consumer;
