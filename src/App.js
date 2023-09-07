import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Sidebar from "./pages/Dashboard/Sidebar";
import ProductList from "./pages/Product/ProductList";
import EmployeeList from "./pages/Employees/EmployeeList";

function App() {
  return (
    <Router>
      <div className="App">

        <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
          {/* menu */}
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          {/* Content */}
          <Grid item xs={9}>
            <div>
              <h1></h1>
              <Routes>
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/employee-list" element={<EmployeeList />} />
              </Routes>
            </div>
          </Grid>
        </Grid>

      </div>
    </Router>
  );
}

export default App;