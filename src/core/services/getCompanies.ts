import axios from "axios"

const getCompanies = async () => {
    const url = 'https://fake-api.tractian.com/companies'
    try{
        const result = await axios.get(url);
        return result.data
    } catch (e) {
        return [];
    }
}

export default getCompanies