import React from "react";

export function reactIsInDevMode() {
    return '_self' in React.createElement('div');
}

export function truncate(str, len) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str
}

