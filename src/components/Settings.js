import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './charts';

const Settings = () => {

    const [ graphTime, setGraphTime ] = useState( '7' );
    
    const [graphData, setGraphData] = useState([]);
    const [currentViewGraphData, setCurrentViewGraphData] = useState([]);

    const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

    useEffect( () => {
        axios.get( url )
        .then( ( res ) => {
            let respData = JSON.parse(res.data);
            let data = respData.map((e => {
                return {
                    name: e.name,
                    uv: Number(e.uv),
                    pv: Number(e.pv),
                    amt: Number(e.amt)
                  }
            }));

            setGraphData(data)

            setCurrentViewGraphData(data.slice(0, 6))
        } )
    }, [] )

    const handleGraphTime = (time) => {
        // NOTE: this is only done because there is not enough data in the database. It's for demonstration purposes
        if(time === '15') {
            setCurrentViewGraphData(graphData.slice(0, 10))
        } else if(time === '30') {
            setCurrentViewGraphData(graphData.slice(0))

        } else {
            setCurrentViewGraphData(graphData.slice(0, 6))
        }

        setGraphTime(time)
    }

    return(
        <React.Fragment>
            <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    flexFlow: 'wrap',
                    justifyContent: 'space-between',
                    margin: "50px 5%"
                }}>
                    <h2>
                            Graph Widget
                    </h2>
                    <div>
                        <select 
                                onChange={(e) => handleGraphTime(e.target.value)}
                                style={{
                                    'float': 'right'
                                }}>
                                    <option value="7">Last 7 days</option>
                                    <option value="15">Last 15 days</option>
                                    <option value="30">One Month</option>
                            </select>
                    </div>
                </div>

            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                flexFlow: 'wrap',
                alignContent: 'center',
                justifyContent: 'center'

            }}>
                <div>
                    {
                        currentViewGraphData.length > 0 ? <Chart data = {currentViewGraphData}/>: null
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

export default Settings;