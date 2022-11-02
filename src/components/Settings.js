import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './charts';


// const graphData = [
//     {
//       name: "Page A",
//       uv: 4000,
//       pv: 2400,
//       amt: 2400
//     },
//     {
//       name: "Page B",
//       uv: 3000,
//       pv: 1398,
//       amt: 2210
//     },
//     {
//       name: "Page C",
//       uv: 2000,
//       pv: 9800,
//       amt: 2290
//     },
//     {
//       name: "Page D",
//       uv: 2780,
//       pv: 3908,
//       amt: 2000
//     },
//     {
//       name: "Page E",
//       uv: 1890,
//       pv: 4800,
//       amt: 2181
//     },
//     {
//       name: "Page F",
//       uv: 2390,
//       pv: 3800,
//       amt: 2500
//     },
//     {
//       name: "Page G",
//       uv: 3490,
//       pv: 4300,
//       amt: 2100
//     }
//   ];

const Settings = () => {

    const [ graphTime, setGraphTime ] = useState( '7' );
    
    const [graphData, setGraphData] = useState([]);

    const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

    useEffect( () => {
        axios.get( url )
        .then( ( res ) => {
            let respData = JSON.parse(res.data);
            setGraphData(respData.map((e => {
                return {
                    name: e.name,
                    uv: Number(e.uv),
                    pv: Number(e.pv),
                    amt: Number(e.amt)
                  }
            })))
        } )
    }, [] )

    return(
        <React.Fragment>
            <div style={{
                width: "70%",
            }}>
                <h2>
                        Graph Widget

                        <select 
                        onChange={(e) => setGraphTime(e.target.value)}
                        style={{
                            'float': 'right'
                        }}>
                            <option value="7">Last 7 days</option>
                            <option value="15">Last 15 days</option>
                            <option value="30">One Month</option>
                    </select>
                </h2>
            </div>
            <div style={{
                width: "70%",
                margin: 'auto;',
                alignContent: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}>
                {
                    graphData.length > 0 ? <Chart data = {graphData}/>: null
                }
            </div>
        </React.Fragment>
    )
}

export default Settings;