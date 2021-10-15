import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "antd/dist/antd.css";

import {
  PostArticlePage,
  ArticlePage,
  DashboardProjectPage,
  InviteCollabPage,
  LoginMemberPage,
  ProjectListPage,
  RegisterPage,
  CreateProjectPage,
} from "./pages/member/index";
import { LoginAdminPage, DashboardAdminPage } from "./pages/admin/index";
import AuthorizedRoute from "../src/auth/AuthorizedRoute";
import RestrictedWrapper from "../src/auth/RestrictedWrapper";
import { AuthorizedContextProvider } from "../src/auth/AuthorizedContext";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizedContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <RestrictedWrapper target="/member/beranda-project">
                <LoginMemberPage />
              </RestrictedWrapper>
            </Route>
            <Route path="/login-admin" exact>
              <RestrictedWrapper target="/beranda-admin">
                <LoginAdminPage />
              </RestrictedWrapper>
            </Route>
            <Route path="/register" component={RegisterPage} />
            <Route path="/member/artikel-saya" component={ArticlePage} />
            <AuthorizedRoute
              path="/member/beranda-project"
              component={DashboardProjectPage}
            />
            <Route path="/member/project-saya" component={ProjectListPage} />
            <Route path="/member/buat-project" component={CreateProjectPage} />
            <Route
              path="/member/undangan-kolaborasi"
              component={InviteCollabPage}
            />
            <Route path="/member/post-artikel" component={PostArticlePage} />
            <Route path="/beranda-admin" component={DashboardAdminPage} />
          </Switch>
        </Router>
      </AuthorizedContextProvider>
    </QueryClientProvider>
  );
}

export default App;
