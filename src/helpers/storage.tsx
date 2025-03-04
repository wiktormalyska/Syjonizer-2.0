interface StorageAPI {
    get: (key: string, callback: (data: { [key: string]: string | null }) => void) => void;
    set: (data: { [key: string]: string }, callback: () => void) => void;
}

let storage: StorageAPI;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
if (import.meta.env.VITE_MODE === 'dev') {
    storage = {
        get: (key: string, callback: (data: { [key: string]: string | null }) => void) => {
            const value = localStorage.getItem(key);
            callback({[key]: value});
        },
        set: (data: { [key: string]: string }, callback: () => void) => {
            for (const key in data) {
                localStorage.setItem(key, data[key]);
            }
            callback();
        },
    };
} else {
    storage = {
        get: (key: string, callback: (data: { [key: string]: string | null }) => void) => {
            chrome.storage.local.get(key, callback);
        },
        set: (data: { [key: string]: string }, callback: () => void) => {
            chrome.storage.local.set(data, callback);
        },
    };
}

export default storage;
