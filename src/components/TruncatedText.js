import React from "react";

export default function TruncatedText({len, children}) {

    const truncate = function (str, len) {
        return str.length > len ? str.substring(0, len - 3) + '...' : str
    }
    
    return (
        <React.Fragment>
            {truncate(children || '',  len|| 55)}
        </React.Fragment>
    );
}