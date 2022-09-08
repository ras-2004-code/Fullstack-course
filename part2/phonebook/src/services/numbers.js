import axios from 'axios'

const base_url='http://localhost:3001/persons'

const getAll=()=>{
    return axios.get(base_url).then(response=>response.data)
}

const create=(personObj)=>{
    return axios.post(base_url,personObj).then(response=>response.data)
}

const del=(id)=>{
    return axios.delete(`${base_url}/${id}`)
}

const update=(id,personObj)=>{
    return axios.put(`${base_url}/${id}`,personObj)
}

export default {getAll,create,del,update}