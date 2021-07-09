import React from "react";

export default function TruncatedText(props) {

    const truncate = function (str, len = props.len || 55) {
        return str.length > len ? str.substring(0, len - 3) + '...' : str
    }
    
    return (
        <React.Fragment>
            {truncate(props.children)}
        </React.Fragment>
    );
}