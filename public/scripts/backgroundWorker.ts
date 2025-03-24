import { handleMessage } from './messaging.js';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Syjonizer 2.0 Uruchomiony')
})

chrome.runtime.onMessage.addListener((message) => {
    console.log("Otrzymano akcję:", message.action)
    handleMessage(message)
    return true
})