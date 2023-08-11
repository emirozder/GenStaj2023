import React from "react";
import { Box, Container } from "@mui/material"
import SearchPatient from "./components/SearchPatient";
import Home from "./pages/Home";

function App() {

  return (
    // <Container fixed>
    //   <Box sx={{ bgcolor: 'ghostwhite', height: '100vh', pt:'20px'}}>
    //     <SearchPatient/>
    //   </Box>
    // </Container>
    <Home/>
  );
}

export default App;