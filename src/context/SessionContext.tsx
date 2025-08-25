/* Imports */
import React, { type JSX } from "react";

/* Relative Imports */
import { PAGE_ROOT } from "@/routes/paths";
import {
  getAccessToken,
  getActiveAccount,
  getStoredAccounts,
  getStoredUser,
  isValidToken,
  removeAccessToken,
  removeActiveAccount,
  removeStoredAccounts,
  removeStoredUser,
  setAccessToken,
  setActiveAccount,
  setStoredAccounts,
  setStoredUser,
} from "@/utilities/auth";
import { getUserProfileRequest } from "@/services/account/account";

// ----------------------------------------------------------------------

/* Types/Interfaces */
export interface IAccount {
  id: string;
  phoneNumber: string;
  role: string;
  profile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  isActivated: boolean;
  isPhoneVerified: boolean;
  outlet: {
    id?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    location?: {
      type: string;
      coordinates: [number, number];
    };
    contactNumber?: string;
    status?: string;
    isActive?: boolean;
  };
  status: string;
}

export interface ISessionState {
  isAuthenticated: boolean;
  authToken: string | null;
  user: any | null;
  currentAccount: IAccount | null;
  availableAccounts: IAccount[];
  isPageLoaded: boolean | null;
  isSwitchingAccount: boolean;
  LoginUser: (
    token: string,
    rememberMe: boolean,
    selectedLoginOption: IAccount
  ) => void;
  LogoutUser: () => void;
  SwitchAccount: (token: string, selectedAccount: IAccount) => void;
}

export interface ISessionProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const initialState: ISessionState = {
  isAuthenticated: false,
  authToken: null,
  user: null,
  currentAccount: null,
  availableAccounts: [],
  isPageLoaded: true,
  isSwitchingAccount: false,
  LoginUser: async () => {},
  LogoutUser: () => {},
  SwitchAccount: async () => {},
};

const SessionContext = React.createContext<ISessionState>(initialState);

class Session extends React.Component<ISessionProps, ISessionState> {
  constructor(props: ISessionProps) {
    super(props);

    const accessToken = getAccessToken();
    const user = isValidToken(accessToken as string);
    const storedUser = getStoredUser();
    const activeAccount = getActiveAccount();
    const availableAccounts = getStoredAccounts();

    this.state = {
      isAuthenticated: Boolean(accessToken && user),
      authToken: accessToken!,
      user: storedUser || null,
      currentAccount: activeAccount || null,
      availableAccounts: availableAccounts || [],
      isPageLoaded: !storedUser,
      isSwitchingAccount: false,

      LoginUser: async (
        token: string,
        rememberMe: boolean,
        selectedAccount: IAccount
      ) => {
        setAccessToken(token, rememberMe);
        setActiveAccount(selectedAccount);

        this.setState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          authToken: token,
          currentAccount: selectedAccount,
        }));

        await this.getUserProfile();
      },

      LogoutUser: () => {
        removeAccessToken();
        removeStoredUser();
        removeActiveAccount();
        removeStoredAccounts();

        this.setState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
          authToken: null,
          user: null,
          currentAccount: null,
          availableAccounts: [],
        }));
        window.location.href = PAGE_ROOT.signIn.absolutePath;
      },

      SwitchAccount: async (token: string, selectedAccount: IAccount) => {
        const currentPath = window.location.pathname;

        setAccessToken(token, true);
        setActiveAccount(selectedAccount);

        this.setState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          authToken: token,
          currentAccount: selectedAccount,
        }));

        await this.getUserProfile();

        const isOutletAdmin =
          selectedAccount?.outlet?.id ||
          selectedAccount?.role === "outlet-admin";
        const isSuperAdmin = !isOutletAdmin;

        const isOnOutletDashboard = currentPath.startsWith(
          "/outlet-admin-dashboard"
        );
        const isOnSuperDashboard = currentPath.startsWith(
          "/super-admin-dashboard"
        );

        // Navigate if user is on wrong dashboard
        if (isOutletAdmin && isOnSuperDashboard) {
          window.location.href = "/outlet-admin-dashboard/analytics";
        } else if (isSuperAdmin && isOnOutletDashboard) {
          window.location.href = "/super-admin-dashboard/analytics";
        }

        this.setState((prevState) => ({
          ...prevState,
          isSwitchingAccount: false,
          isPageLoaded: false,
        }));
      },
    };

    // Bind methods to the class instance
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount(): void {
    if (this.state.authToken) {
      console.log("mount check");
      this.getUserProfile();
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isPageLoaded: false,
      }));
    }
  }

  async getUserProfile(): Promise<void> {
    try {
      const response: any = await getUserProfileRequest();
      console.log("getUserProfile response", response);
      if (response?.status.response_code === 200 && response?.data) {
        setStoredUser(response.data);

        if (response?.data?.availableAccounts) {
          setStoredAccounts(response?.data?.availableAccounts);
        }

        this.setState((prevState) => ({
          ...prevState,
          user: response.data,
          availableAccounts: response?.data?.availableAccounts,
          isPageLoaded: false,
        }));
      }
    } catch (error: any) {
      console.log("getUserProfile error", error);
      this.state.LogoutUser();

      this.setState((prevState) => ({
        ...prevState,
        isPageLoaded: false,
      }));
    }
  }

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
