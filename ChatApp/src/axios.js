import axios from "axios"

const InstanceAxios = ()=>{
    return axios.create({
        baseURL:"https://chatappbackend-jzmy.onrender.com",
        headers:{
            "Content-Type" : 'application/json'
        }
    })
}

export default InstanceAxios;