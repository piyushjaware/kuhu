import React from "react";

export function reactIsInDevMode() {
    return '_self' in React.createElement('div');
}

