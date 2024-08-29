import axios from "axios"

const getCompaniesLocations = async (id: string) => {
    const url = 'https://fake-api.tractian.com/companies'
    try{
        const result = await axios.get(`${url}/${id}/locations`);
        return result.data
    } catch (e) {
        return [];
    }
}

export default getCompaniesLocations