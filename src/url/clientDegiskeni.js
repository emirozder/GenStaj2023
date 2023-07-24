import Client from "fhir-kit-client";

const url = 'https://hapi.fhir.org/baseR5/'

export const fhirClient = new Client({
    baseUrl: url
});