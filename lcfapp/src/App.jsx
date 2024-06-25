import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./components/LCF/Common/RootLayout";
import {ThemeProvider} from "./components/LCF/Common/ThemeProvider";
import {Provider} from "react-redux";
import {Store} from "./Redux/Store";
import ApplicationList from "./components/LCF/Application/ApplicationList";
import ConfigurationLayout from "./components/LCF/Common/ConfigurationLayout";
import FormBuilder from "./components/LCF/FormBuilder/FormBuilder";
import Builder from "./components/LCF/FormBuilder/Builder";
import DesignerProvider from "./Hooks/DesignerProvider";
import {Toaster} from "./components/ui/toaster";
import AuthMiddleware from "./components/LCF/Common/AuthMiddleware";
import Login from "./components/LCF/Auth/Login/Login";
import UserCollection from "./components/LCF/User/UserCollection";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Provider store={Store}>
          <DesignerProvider>
            <BrowserRouter>
              <AuthMiddleware>
                <Routes>
                  <Route path="/" Component={Login} />

                  <Route Component={RootLayout}>
                    <Route
                      path="/applicationlist"
                      Component={ApplicationList}
                    />
                    <Route path="/user" Component={UserCollection} />
                  </Route>
                  <Route
                    path="/applicationlist/:applicationid/"
                    Component={ConfigurationLayout}
                  >
                    <Route path="formbuilder" Component={FormBuilder} />
                    <Route path="formbuilder/:formid" Component={Builder} />
                    <Route path="menu" Component={() => <>Menu</>} />
                    <Route path="users" Component={() => <>Users</>} />
                    <Route path="roles" Component={() => <>Roles</>} />
                    <Route path="workflow" Component={() => <>workflow</>} />
                  </Route>
                </Routes>
              </AuthMiddleware>
            </BrowserRouter>
            <Toaster />
          </DesignerProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
