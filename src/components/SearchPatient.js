import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Stack, Toolbar, Grid, IconButton, AppBar, Paper } from "@mui/material"
import { getSearchedPatient, setCurrentPage } from '../redux/features/patient/patientSlice';
import Patient from './Patient';
import AddPatient from './AddPatient';
import SearchIcon from '@mui/icons-material/Search';

const SearchPatient = () => {

  //#region SEARCHING

  const [searchKey, setSearchKey] = useState('');

  const searchPatient = () => {
    const params = {
      type: '',
      bundle: searchedResponse,
      keyword: searchKey
    }
    dispatch(getSearchedPatient(params))
  }

  //#endregion

  //#region PAGINATION and NEW DATA FETCHING starts

  const dispatch = useDispatch();
  const { searchedPatient, searchedResponse, currentPage } = useSelector(state => state.patient)

  console.log("search edilmiş veri:", searchedPatient);
  console.log("search key:", searchKey);

  const handlePageChangeSearch = (event, newPage) => {
    if (newPage > currentPage) {
      const params = {
        type: 'next',
        bundle: searchedResponse,
        keyword: searchKey
      }
      dispatch(getSearchedPatient(params));
      dispatch(setCurrentPage(0));
    } else if (newPage < currentPage) {
      const params = {
        type: 'prev',
        bundle: searchedResponse,
        keyword: searchKey
      }
      dispatch(getSearchedPatient(params));
      dispatch(setCurrentPage(0));
    } else {
      dispatch(setCurrentPage(newPage));
    }
  };

  //#endregion



  return (
    <>
      <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center"  py={1}>
              <Grid item >
                <TextField
                  id="outlined-search"
                  label="Search"
                  type="search"
                  color="primary"
                  value={searchKey}
                  onChange={e => setSearchKey(e.target.value)}
                />
              </Grid>
              <Grid item xs>
                <IconButton aria-label="delete" size="small" color="info" onClick={searchPatient}>
                  <SearchIcon color="primary" sx={{ display: 'block' }} />
                </IconButton>
              </Grid>
              <Grid item>
                <AddPatient />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>

      {
        searchedPatient.length >= 0 ? (<Patient
          searchedPatient={searchedPatient}
          handlePageChangeSearch={handlePageChangeSearch}
          totalSearch={searchedResponse.total}
        />) : <Patient />
      }
    </>
  )
}

export default SearchPatient