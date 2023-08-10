import { useState } from 'react'
import{AsyncPaginate} from 'react-select-async-paginate'
import { GEO_API_URL,geoApiOptions } from '../apis'



const Search=({onSearchChange})=>{
 const [search,setSearch]=useState(null)

 const loadOptions = async (input) => {
    return await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${input}`,
      geoApiOptions
    )
      .then((response)=>response.json())
      .then((response)=>{
        return {
          options: response.data.map((city) =>{
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };


 const handleOnChange=(data)=>{
  setSearch(data)
  onSearchChange(data)
 }


    return (
        <AsyncPaginate
        placeholder='Search City'
        debounceTimeout={500}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
          />

    )
     
}
export default Search