/// <reference types="react-scripts" />

declare global {
    interface Window {
      googleTranslateElementInit: () => void;
      google: any;
    }
  }
  
  export {};
  