import React, { useState } from "react";
import Header from "./Header";

const GeneralData = ({data, onDelete, padding}) => {
    const [showChild, setShowChild] = useState(false);
    const [, setForceUpdate] = useState(0);

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
                        Object.values(data.children).some(child => child.records.length > 0) &&
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
                    <div
                        className="value"
                        onClick={() => onDelete?.(data)}>
                        del
                    </div>
                </div>
            </div>

            {/* Children */}
            {
                showChild &&
                Object.entries(data.children).map(([key, childType]) => {
                    if (!childType.records.length) return null;
                    return (
                        <React.Fragment key={key}>
                        <Header data={childType.records[0].data} padding={padding+1} />
                        {
                            childType.records.map((el, index) => (
                                <GeneralData
                                    key={`${el.data.ID}-${index}`}
                                    data={el}
                                    onDelete={(toDelete) => {
                                        childType.records = childType.records.filter(
                                            (el) => el !== toDelete
                                        )
                                        // Rerender immediately
                                        setForceUpdate((v) => v + 1);
                                    }}
                                    padding={padding+1}
                                />
                            ))
                        }
                        </React.Fragment>
                    )
                })

            }
            
        </>
    );
}
 
export default GeneralData;