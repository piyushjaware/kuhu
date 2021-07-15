import '../styles/error.scss'

const Error = ({errors = [], name}) => {

    let error = errors.find(err => err.name === name) || {}
    
    console.debug("Error Component", errors, error)
    
    return (
        <div className="error">
            {error.msg}
        </div>
    );
};

export default Error;