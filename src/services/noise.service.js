import axios from "axios";

const API_URL = "http://localhost:8080/record/denoise";

class NoiseService {

    denoise(file) {  // return comment id
    
        const data = new FormData();
        data.append('file', file);

        return axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
      }



}

export default new NoiseService();
