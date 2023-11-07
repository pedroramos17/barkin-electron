interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    // eslint-disable-next-line promise/param-names
    await new Promise((r) => {
      setTimeout(r, 500);
    }); // fake delay
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  async signout() {
    // eslint-disable-next-line promise/param-names
    await new Promise((r) => {
      setTimeout(r, 500);
    }); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = '';
  },
};

export default fakeAuthProvider;
