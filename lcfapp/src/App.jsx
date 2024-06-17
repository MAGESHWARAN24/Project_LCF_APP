import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./components/LCF/Common/RootLayout";
import ApplicationCard from "./components/LCF/Application/ApplicationCard";
import {ThemeProvider} from "./components/LCF/Common/ThemeProvider";
import {Provider} from "react-redux";
import {Store} from "./Redux/Store";
import ApplicationList from "./components/LCF/Application/ApplicationList";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Provider store={Store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={RootLayout}>
                <Route path="/applicationlist" Component={ApplicationList} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
