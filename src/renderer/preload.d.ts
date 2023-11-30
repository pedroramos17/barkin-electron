declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
    api: {
      logout: () => any;
      getUser: () => any;
      getDrivers: () => any;
      getVehicles: () => any;
      getGateways: () => any;
    };
  }
}

export {};
