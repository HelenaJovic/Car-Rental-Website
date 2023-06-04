import axios from 'axios';

const BASE_URL = 'http://localhost:8081'; // Replace with your backend URL

let server = {}

server.getAllSortedCars = () =>{
  const options = {
     headers:{
       Accept: 'application/json'
     },
     method: 'GET',
     url: `${BASE_URL}/cars/sortedCars`
  }
  return axios(options)
  .then((resp)=> {console.log(resp); return resp})
  .catch((err) =>{return err})

}

export default server;