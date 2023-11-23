declare global {
  interface Window {
    ReactNativeWebView: any;
    gtag: any;
    dataLayer: any;
    trustwallet: any;
    zerionWallet: any;
  }
}

export const ReactNativeWebView = window.ReactNativeWebView;