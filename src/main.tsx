import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./AppRouter.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { UIProvider } from "./context/ui/UIProvider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <UIProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UIProvider>
      <Toaster />
    </Provider>
  </>
);
