import axios from 'axios';

const API_URL = 'http://localhost:8080/members/1/records';

//test
class S3Service {
    getFile(record, file) {
        return axios.post(API_URL, {
            memberId: record.memberId,
            musicId: null,
            instrument: null,
            searchable: null,
            access: null,
            fileName: null,
            file: file,
        })
    }
}
export default new S3Service();