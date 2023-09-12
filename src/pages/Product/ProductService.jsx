import axios from 'axios';

export function CallApiTest2() {
    return axios.get('http://localhost:8080/pdList')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        })
}