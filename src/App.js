import './styles/style.css';

import React, { useEffect, useState } from "react";
import GeneralData from "./components/GeneralData";
import Header from "./components/Header";

function App() {
    const [data, setData] = useState(null);
    // Add error detector that could tell user whats wrong

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/data.json');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log(error);
            // Signalize to error detector
        }
        }
        fetchData();
    }, [])
  
    return (
        <div className="App">
        {
            data && data.length > 0 &&
            <React.Fragment>
                <Header data={data[0].data} padding={0} />
            {
                data.map((el, index) => (
                <GeneralData
                    key={`${el.data.ID}-${index}`} // Not unique ID, so use combination with index, not ideal -> index changes when something's deleted
                                                   // Solution: make unique ID (with no duplicates), or create other identifier for every record
                    data={el}
                    onDelete={(toDelete) => {
                        setData((data) => data.filter((el) => el !== toDelete))
                    }}
                    padding={0}
                />
                ))
            }
            </React.Fragment>
        }
        {
            // If error display whats wrong
        }
        </div>
    );
}

export default App;
