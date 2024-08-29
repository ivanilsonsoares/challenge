import axios from "axios"

const getCompaniesAssets  = async (id: string) => {
    const url = 'https://fake-api.tractian.com/companies'
    try{
        const result = await axios.get(`${url}/${id}/assets`);
        return result.data
    } catch (e) {
        return [];
    }
}

export default getCompaniesAssets 