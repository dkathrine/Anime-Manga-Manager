import { BrowserRouter, Switch, Route } from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

// page components
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Entry from "./pages/entry/Entry";

// styles
import "./App.css";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/library/:id">
            <Entry />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;