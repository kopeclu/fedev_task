import { useState } from "react";
import Header from "./Header";

const GeneralData = ({data, child, padding}) => {
    const [showChild, setShowChild] = useState(false);

    return (
        <>
            {/* Main data */}
            <div className="data-container">
                {
                    Array.from({length: padding}).map((el, index) => (
                        <div key={index} className="table-padding"></div>
                    ))
                }
                <div className="data">
                    <div className="value">
                    {
                        Object.keys(data.children).length !== 0 &&
                        <button
                        onClick={() => (showChild ? setShowChild(false) : setShowChild(true))}>
                            show
                        </button>
                    }
                    </div>
                    {
                        Object.entries(data.data).map(([key, value]) => (
                            <div key={key} className="value">
                                {value}
                            </div>
                        ))
                    }
                    <div className="value">del</div>
                </div>
            </div>
            {/* Nemesis children */}
            {
                showChild &&
                Object.keys(data.children).includes('has_nemesis') &&
                <>
                    <Header data={data.children.has_nemesis.records[0].data} padding={padding+1} />
                    {
                        data.children.has_nemesis.records.map((el, index) => (
                            <GeneralData key={index} data={el} child={child+1} padding={padding+1}  />
                        ))
                    }
                </>
            }
            {/* Secrete children */}
            {
                showChild &&
                Object.keys(data.children).includes('has_secrete') &&
                <>
                    <Header data={data.children.has_secrete.records[0].data} padding={padding+1} />
                    {
                        data.children.has_secrete.records.map((el, index) => (
                            <GeneralData key={index} data={el} child={child+1} padding={padding+1} />
                        ))
                    }
                </>
            }
        </>
    );
}
 
export default GeneralData;