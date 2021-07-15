/* eslint-disable no-undef */
import React from "react";

export function reactIsInDevMode() {
    return '_self' in React.createElement('div');
}

export function truncate(str, len) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str
}


export class LocalStorage {


    read = (key) => {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping readFromStorage')
            return Promise.resolve('')
        }
        return new Promise((resolve, reject) =>
            chrome.storage.sync.get(key, result =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve(result[key])
            )
        )
    }


    save(keyToSave, valueToSave) {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping saveToStorage')
            return;
        }
        let data = {}
        data[keyToSave] = valueToSave;

        return new Promise((resolve, reject) =>
            chrome.storage.sync.set(data, () =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve()
            )
        )
    }
}

