import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import {  setConfig, FormControl, FrappeUI, frappeRequest } from "frappe-ui";

const app = createApp(App)

// Set the resource fetcher for frappe-ui to use frappeRequest
setConfig("resourceFetcher", frappeRequest);

// Use the FrappeUI plugin in the Vue app
app.use(FrappeUI);

// Register the FormControl component globally
app.component("FormControl", FormControl);

app.mount('#app')