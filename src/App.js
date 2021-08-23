import "./App.css";
import EntriesList from "./components/library/EntriesList";
import SingleEntryPage from "./components/library/SingleEntryPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import LibrariesList from "./components/library/LibrariesList";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { updateAllLibraries } from "./store/templateLibraries-slice";
import { updateAllLibrariesRecords } from "./store/librariesRecords-slice";
import {
  GET_LIBRARIES_DATA,
  GET_LIBRARIES_TEMPLATES,
  GET_LIBRARIES_DATA_PG,
} from "./API/graphQLTypes";
import { updateAllLibrariesData } from "./store/librariesData-slice";

function App() {
  const {
    loading: loadingDataPg,
    error: errorDataPg,
    data: dataPg,
  } = useQuery(GET_LIBRARIES_DATA_PG);
  const { loading, error, data } = useQuery(GET_LIBRARIES_TEMPLATES);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) dispatch(updateAllLibraries(data?.librariesTemplates));
  }, [data, dispatch, loading]);

  useEffect(() => {
    if (!loadingDataPg)
      // dispatch(updateAllLibrariesRecords(dataData?.librariesData));
      dispatch(updateAllLibrariesData(dataPg?.librariesDataPG));
    // console.log(dataPg);
  }, [loadingDataPg, dataPg, dispatch]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <LibrariesList />
            </Fragment>
          )}
        />
        <Route exact path="/library" component={EntriesList} />
        <Route exact path="/library/entry/" component={SingleEntryPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
