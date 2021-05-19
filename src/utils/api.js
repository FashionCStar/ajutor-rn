import axios from "axios";
import { SERVER_URL } from "../config";

export function sendRequest(url, data) {
  return new Promise((resolve, reject) => {
    url = `${SERVER_URL}${url}`;
    console.log('sendRequest', url);
    axios({
      method: 'POST',
      url,
      data,
    }).then((response) => {
      resolve(response.data);
    }).catch(error => {
      console.log('Axios Error', error);
      reject(error);
    })
  });
}