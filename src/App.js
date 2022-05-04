import "./App.css";
import { User } from "./User/User";
import { UserCategory } from "./UserCategory/UserCategory";
import { UserSubCategory } from "./UserSubCategory/UserSubCategory";
import { UserMultiLevel } from "./UserMultiLevel/UserMultiLevel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Home } from "./Home";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">User Ui</h3>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/usercategory" element={<UserCategory />} />
          <Route path="/usersubcategory" element={<UserSubCategory />} />
          <Route path="/usermultilevel" element={<UserMultiLevel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
