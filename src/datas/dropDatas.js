import axios from "../api/axios";
import { getDataRoute } from "../utils/Endpoint";

export const bloodGroups = [
    { id: 1, name: "A+" },
    { id: 2, name: "A-" },
    { id: 3, name: "B+" },
    { id: 4, name: "B-" },
    { id: 5, name: "AB+" },
    { id: 6, name: "AB-" },
    { id: 7, name: "O+" },
    { id: 8, name: "O-" }
]

export const currentStatus = [
    { id: 1, name: "Under Home care" , value: "home_care"},
    { id: 2, name: "Hospitalized" , value: "hospitalized"},
    { id: 3, name: "Recovered" , value: "recovered"},
    { id: 4, name: "Dead" , value: "dead"},
    { id: 5, name: "Location Changed" , value: "location_changed"},
]

export const stockStatus = [
    { id: 1, name: "Available" , value: "available"},
    { id: 2, name: "Out of Stock" , value: "out_of_stock"},
  
]

export const commonServices = [
    { id: 1, name: 'Ryles tube' },
    { id: 2, name: 'Catheter' },
    { id: 3, name: 'Dressing' },
    { id: 4, name: 'Injections' },
    { id: 5, name: 'IV Fluid' },
    { id: 6, name: 'Bladder wash' },
    { id: 7, name: 'Enema' },
    { id: 8, name: 'Others' },
  ];

  export const services = [
    { id: 1, name: 'Psychiatry' },
    { id: 2, name: 'Palliative OP' },
    { id: 3, name: 'Palliative Home care' },
    { id: 4, name: 'Physiotherapy' },
  ]


  export const getListData = async (name)=>{
    const response = await axios.get(`${getDataRoute}?name=${name}`)
    console.log("response", response.data.list)
    return response.data.list
  }