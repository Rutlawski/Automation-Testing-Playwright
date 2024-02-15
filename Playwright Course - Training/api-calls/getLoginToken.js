import * as nodeFetch from "node-fetch";
import { links } from "../lib/links";

export const getLoginToken = async (username, password) => {
    const response = await nodeFetch(links.ApiUrl, {
        method: "POST",
        body: JSON.stringify({"username": username, "password": password})
    });
    if(response.status !== 200) {
        throw new Error("Something went wrong, please contact IT");
    }
    const body = await response.json();
    return body.token;
}