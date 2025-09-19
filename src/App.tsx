import React from "react";

import { Provider } from "react-redux";
import { store } from "./store";
import AppRoute from "./Routes/AppRoute";
import ErrorBoundary from "./components/Error/ErrorBoundary";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
      <AppRoute />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
