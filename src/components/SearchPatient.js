import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Stack } from "@mui/material"
import { getSearchedPatient, setCurrentPage } from '../redux/features/patient/patientSlice';
import Patient from './Patient';
import AddPatient from './AddPatient';

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={'20px'}
        ml={'10px'}
        mr={'10px'}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            color="secondary"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={searchPatient}>Search</Button>
        </Stack>

        <AddPatient />
      </Stack>

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