import React, { useEffect, useState } from 'react';

const Home = () => {
    const [Data, setData] = useState({});
    const [countryData, setCountryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('dsc');

    // code for fetch data 
    useEffect( () => {
        fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => {
            setData(data)
            setCountryData(data.Countries)
        })
    },[])

    // sorting code goes here 
    const sorting = (col) => {
        if(order==='asc'){
            const sorted = [...countryData].sort((a,b) => 
            {
                if(col==='Country'){ return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1}
                else{ return a[col]-b[col]}
            }
            );
            setCountryData(sorted);
            console.log(sorted);
            setOrder('dsc');
        };
        if(order==='dsc'){
            const sorted = [...countryData].sort((a,b) => 
            {
                if(col==='Country'){ return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1}
                else{ return b[col]-a[col]}
            }
            );
            setCountryData(sorted);
            console.log(sorted);
            setOrder('asc');
        };
    }

    // Filter by continents code goes here
    let continents = {
        asia : ["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","Hong Kong","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Lebanon","Macao","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Palestine","Philippines","Qatar","S. Korea","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","UAE","Uzbekistan","Vietnam","Yemen"],
        northAmerica : ["Anguilla","Antigua and Barbuda","Aruba","Bahamas","Barbados","Belize","Bermuda","British Virgin Islands","Canada","Caribbean Netherlands","Cayman Islands","Costa Rica","Cuba","Curaçao","Dominica","Dominican Republic","El Salvador","Greenland","Grenada","Guadeloupe","Guatemala","Haiti","Honduras","Jamaica","Martinique","Mexico","Montserrat","Nicaragua","Panama","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre Miquelon","Saint Vincent and the Grenadines","Sint Maarten","St. Barth","Trinidad and Tobago","Turks and Caicos Islands","USA"],
        southAmerica : ["Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Falkland Islands (Malvinas)","French Guiana","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"],
        europe : ["Albania","Andorra","Austria","Belarus","Belgium","Bosnia","Bulgaria","Channel Islands","Croatia","Czechia","Denmark","Estonia","Faroe Islands","Finland","France","Germany","Gibraltar","Greece","Holy See (Vatican City State)","Hungary","Iceland","Ireland","Isle of Man","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","UK","Ukraine"],
        africa : ["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Congo","Côte d'Ivoire","DRC","Djibouti","Egypt","Equatorial Guinea","Eritrea","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libyan Arab Jamahiriya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Mayotte","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Réunion","Saint Helena","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Swaziland","Tanzania","Togo","Tunisia","Uganda","Western Sahara","Zambia","Zimbabwe"],
        australia : ["Australia","Fiji","French Polynesia","Marshall Islands","Micronesia","New Caledonia","New Zealand","Palau","Papua New Guinea","Samoa","Solomon Islands","Tonga","Vanuatu","Wallis and Futuna"]
    }
    const filterContinent = (continent) => {
        console.log(continent);
        let continentalCountry = [];

        if(continent==='global'){
            setCountryData(Data?.Countries);
        }
        if(continent==='asia'){
            Data?.Countries?.filter(val => {
                if(continents?.asia?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='europe'){
            Data?.Countries?.filter(val => {
                if(continents?.europe?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='africa'){
            Data?.Countries?.filter(val => {
                if(continents?.africa?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='australia'){
            Data?.Countries?.filter(val => {
                if(continents?.australia?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='north america'){
            Data?.Countries?.filter(val => {
                if(continents?.northAmerica?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='south america'){
            Data?.Countries?.filter(val => {
                if(continents?.southAmerica?.indexOf(val.Country)!==-1){
                    continentalCountry.push(val);
                }
            })
            setCountryData(continentalCountry);
        }
        else if(continent==='antarctica'){
            setCountryData([]);
        }
    }

    return (
        <div>
            {/* Header section  */}
            <header className='mb-8'>
                <div className='flex justify-center items-center bg-orange-200 text-orange-700'>
                <div className='w-5 h-5 animate-pulse px-5 ml-8 rounded-full border border-red-600 flex justify-center items-center'><div className='w-3 h-3 animate-pulse rounded-full px-4 bg-red-600 inline-block'></div></div><div className='px-8 uppercase font-mono font-semibold'>Live</div><p className='bg-gray-700 flex-grow text-white text-center py-1 font-medium font-mono'><span> Last updated on {Data?.Global?.Date.split('T')[0]} Time: {Data?.Global?.Date.split('T')[1].slice(0,8)} (UTC) </span></p>
                </div>
                <h1 className='text-3xl text-center py-3 text-orange-500 border-b-2 mb-5'><i class="fas fa-virus"></i> Covid-19 Tracker</h1>

                {/* world wide summary info section  */}
                <div className='bg-lime-50 mx-12 rounded-xl pb-8 shadow-lg'>
                    <h1 className='text-3xl text-center text-white bg-lime-800 rounded-t-xl py-4 font-mono font-semibold  mb-5'><i class="fas fa-viruses"></i> Worldwide Summary</h1>
                    <div className='grid md:grid-cols-3 grid-cols-2 gap-y-5 justify-items-center'>
                        <div className='mx-5 w-44 h-20 bg-lime-600 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>Total Confirmed</h1>
                            <h2 className='text-xl'>{Data?.Global?.TotalConfirmed}</h2>
                        </div>
                        <div className='mx-5 w-44 h-20 bg-orange-400 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>Total Deaths</h1>
                            <h2 className='text-xl'>{Data?.Global?.TotalDeaths}</h2>
                        </div>
                        <div className='mx-5 w-44 h-20 bg-blue-500 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>Total Recovered</h1>
                            <h2 className='text-xl'>{Data?.Global?.TotalConfirmed - Data?.Global?.TotalDeaths}</h2>
                        </div>
                        <div className='mx-5 w-44 h-20 bg-yellow-500 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>New Confirmed</h1>
                            <h2 className='text-xl'>{Data?.Global?.NewConfirmed}</h2>
                        </div>
                        <div className='mx-5 w-44 h-20 bg-red-700 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>New Deaths</h1>
                            <h2 className='text-xl'>{Data?.Global?.NewDeaths}</h2>
                        </div>
                        <div className='mx-5 w-44 h-20 bg-green-600 rounded-lg flex justify-center items-center flex-col text-center text-white'>
                            <h1 className='text-2xl'>New Recovered</h1>
                            <h2 className='text-xl'>{Data?.Global?.NewConfirmed - Data?.Global?.NewDeaths}</h2>
                        </div>
                    </div>
                </div>
            </header>

            {/* Countrywise Covid-19 update  */}
            <div className='grid grid-cols-3 justify-between items-center bg-gray-500 py-2 mx-5 sticky top-0'>
                <p className='font-semibold text-white pl-3'>Country wise Covid-19 information</p>
                <div>
                    <label for='continent' className='font-semibold text-white'>Filter by continent </label>
                    <select id='continent' className=' w-52 rounded p-0.5' onChange={(e) => filterContinent(e.target.value.toLowerCase())}>
                        <option>Global</option>
                        <option>Asia</option>
                        <option>Europe</option>
                        <option>Africa</option>
                        <option>Australia</option>
                        <option>North America</option>
                        <option>South America</option>
                        <option>Antarctica</option>
                    </select>
                </div>
                <div className=''>
                    <label for='searchBox' className='font-semibold text-white'>Search Country </label>
                    <input type="text" id='searchBox' className='border py-0.5 px-1 rounded' placeholder='India...' onChange={e => {setSearchTerm(e.target.value)}} />
                </div>
                
            </div>

            {/* code for country list table  */}
            <div className='px-5'>
                <table className='table-auto w-full border-2 border-gray-600'>
                    <thead className='bg-gray-900 text-white text-center sticky top-10'>
                        <tr>
                            <th>Sl no</th>
                            <th className='py-2 border-x'>Country <i className="fas fa-sort" onClick={() => sorting('Country')}></i></th>
                            <th>Total Confirmed <i className="fas fa-sort" onClick={() => sorting('TotalConfirmed')}></i></th>
                            <th className='border-x'>Total Deaths <i className="fas fa-sort" onClick={() => sorting('TotalDeaths')}></i></th>
                            <th>New Confirmed <i className="fas fa-sort" onClick={() => sorting('NewConfirmed')}></i></th>
                            <th className='border-x'>New Deaths <i className="fas fa-sort" onClick={() => sorting('NewDeaths')}></i></th>
                            <th>Time Series</th>
                        </tr>
                    </thead>

                    <tbody className='font-semibold text-gray-800'>
                    {countryData?.filter(val => {
                    if(searchTerm === ''){
                        return val;
                    }
                    else if(val?.Country?.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map((val, ind) => {
                    return (
                        <tr key={ind} className={`text-center border-b border-gray-600 py-0.5`}>
                            <td className='bg-gray-300'>{ind+1}</td>
                            <td className='bg-gray-200'>{val.Country}</td>
                            <td className='bg-lime-200'>{val.TotalConfirmed}</td>
                            <td className='bg-orange-300'>{val.TotalDeaths}</td>
                            <td className='bg-lime-100'>{val.NewConfirmed}</td>
                            <td className='bg-red-300'>{val.NewDeaths}</td>
                            <td className='bg-gray-50'>{val.Date.split('T')[0]}</td>
                        </tr>
                    )
                })}
                    </tbody>
                </table>                
            </div>
        </div>
    );
};

export default Home;