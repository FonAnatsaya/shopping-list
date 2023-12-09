import axios from 'axios';

export default function CallApiForOccupation() {
    return axios.get('http://localhost:8080/occupationList')
        .then((response) => {
            return response; // Return the response data if needed
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error; // Throw the error if needed
        });
}