import React from "react";
import { Box, Container } from "@mui/material"
import SearchPatient from "./components/SearchPatient";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentTable from "./pages/AppointmentTable";
function App() {

  return (
    // <Container fixed>
    //   <Box sx={{ bgcolor: 'ghostwhite', height: '100vh', pt:'20px'}}>
    //     <SearchPatient/>
    //   </Box>
    // </Container>

    <Home />
            // <Router>
            //   <Routes>
            //     <Route path="/" element={} />
            //     <Route path="/appointments" element={<AppointmentTable />} />
            //   </Routes>
            // </Router>
  );
}

export default App;