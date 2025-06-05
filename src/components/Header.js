const Header = ({data}) => {
    return (
        <div className="header">
            {
                Object.entries(data).map(([key, value]) => (
                    <div>
                        {key}
                    </div>
                  ))
            }
        </div>
    );
}
 
export default Header;