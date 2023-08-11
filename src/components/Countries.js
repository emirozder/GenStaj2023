import { City, Country, State } from 'country-state-city'
import React, { useEffect, useState } from 'react'
import { Autocomplete, Stack, TextField } from '@mui/material';

const Countries = () => {
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();

    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState();
    const [city, setCity] = useState();

    const changeCountry = (value) => {
        setCountry(countryData.find(ctr => ctr.name === value));
    }
    const changeState = (value) => {
        setState(stateData.find(ctr => ctr.name === value));
    }
    const changeCity = (value) => {
        setCity(cityData.find(ctr => ctr.name === value));
    }

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country])
    
    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state])

    useEffect(() => {
        stateData && setState(stateData[0]);
    }, [stateData]);
    
    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);


    return (
        <Stack direction="row" spacing={2}>
            <Autocomplete
                value={country.name}
                onChange={(event, newValue) => {
                    changeCountry(newValue);
                }}
                id="controllable-states-demo"
                options={countryData.map(data => data.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
            />
            {state && <Autocomplete
                value={state.name}
                onChange={(event, newValue) => {
                    changeState(newValue);
                }}
                id="controllable-states-demo"
                options={stateData.map(data => data.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            />}
            {city && <Autocomplete
                value={city.name}
                onChange={(event, newValue) => {
                    changeCity(newValue);
                }}
                id="controllable-states-demo"
                options={cityData.map(data => data.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="District" />}
            />}

        </Stack>
    )
}

export default Countries