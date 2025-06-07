const Header = ({data, padding}) => {
    return (
        <div className="header-container">
            {
                Array.from({length: padding}).map((el, index) => (
                    <div key={index} className="table-padding"></div>
                ))
            }
            <div className="header">
                <div className="value"></div>
                {
                    Object.entries(data).map(([key, value]) => (
                        <div key={key} className="value">
                            {key}
                        </div>
                    ))
                }
                <div className="value">delete</div>
            </div>
        </div>
    );
}
 
export default Header;