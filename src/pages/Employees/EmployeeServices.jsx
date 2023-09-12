import axios from 'axios';

export function CallApiTest() {
    return axios.get('http://localhost:8080/empList')
        .then((response) => {
            return response; // Return the response data if needed
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error; // Throw the error if needed
        });
}