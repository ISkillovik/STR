import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginStrAdm from "./Pages/LoginStrAdm";
import MainLayout from "./layouts/MainLayout";
import HomeStr from "./Pages/HomeStr";
import About from "./Pages/About";
import LiveEvents from "./Pages/LiveEvents";
import Racers from "./Pages/Racers";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="loginstradm" Component={LoginStrAdm} />
          <Route path="/" element={<MainLayout />}>
            <Route index Component={HomeStr} />
            <Route path="liveevents" Component={LiveEvents} />
            <Route path="about" Component={About} />
            <Route path="racers" Component={Racers} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
