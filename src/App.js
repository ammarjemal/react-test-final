import { Fragment } from "react";
import Layout from "./Layout/layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import AddDepartmentPage from "./pages/add-department";
import UpdateDepartmentPage from "./pages/update-department";
import DisplayDepartmentPage from "./pages/display-department";
import DisplayTreePage from "./pages/department-tree";
function App() {
  return (
    <Fragment>
      <Switch>
        {/* Route to the home page */}
        <Route path="/" exact>
          <HomePage/>
        </Route>
        {/* Route to add deparment page */}
        <Route path="/add-department" exact>
          <Layout>
            <AddDepartmentPage/>
          </Layout>
        </Route>
        {/* Route to update deparment page */}
        <Route path="/update-department" exact>
          <Layout>
            <UpdateDepartmentPage/>
          </Layout>
        </Route>
        {/* Route to display a single deparment page */}
        <Route path="/display-department" exact>
          <Layout>
            <DisplayDepartmentPage/>
          </Layout>
        </Route>
        {/* Route to display department tree */}
        <Route path="/department-tree" exact>
          <Layout>
            <DisplayTreePage/>
          </Layout>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
