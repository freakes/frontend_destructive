import axios from "axios";

export default class RequestService {

    static async registration(name: string, surname: string, role: string,
                              email: string, password: string, groupName: string) {
        const response = await axios({method: 'post', url: 'http://localhost:8080/users/register', headers: {}, data: {
            name: name, surname: surname, role: role, email: email, password: password, groupName: groupName
            }})
        return response
    }

    static async authorization(email: string, password: string) {
        const response = await axios({method: 'post', url: 'http://localhost:8080/users/autorization', headers: {}, data: {
            email: email, password: password}})
        return response
    }

    static async getUsers() {
        const response = await axios.get('http://localhost:8080/users/all');
        return response
    }

    static async getNews() {
        const response = await axios.get('http://localhost:8080/news');
        return response
    }

    static async getNewsById(id: number) {
        const response = await axios.get(`http://localhost:8080/news/${id}`);
        return response
    }


    static async createNews(title: string, text: string, tag: string) {
        const response = await axios({method: 'post', url: 'http://localhost:8080/news/add', headers: {}, data: {
                title: title, text: text, tag: tag
            }});
        return response
    }
    static async deleteNews(id: number) {
        const response = await axios({method: 'delete', url: `http://localhost:8080/news/${id}`, headers: {}, data: {

            }});
        return response
    }
    static async redactNews(id: number, title?: string, text?: string, tag?: string) {
        const response = await axios({method: 'put', url: `http://localhost:8080/news/${id}`, headers: {}, data: {
                title: title, text: text, tag: tag
            }});
        return response
    }

    static async getAppeals() {
        const response = await axios.get('http://localhost:8080/users/appeals');
        return response
    }
    static async getUserAppeals(userId: string) {
        const response = await axios.get(`http://localhost:8080/users/appeals/${userId}`);
        return response
    }

    static async createAppeal(text: string) {
        const response = await axios({method: 'post' , url: `http://localhost:8080/users/appeals/add${localStorage.getItem('userId')}`, headers: {}, data: {
                text: text
            }});
        return response
    }
    static async createAnswer(text: string) {
        const response = await axios({method: 'post' , url: `http://localhost:8080/users/appeals/answer`, headers: {}, data: {
                appealId: localStorage.getItem('appealId'),
                text: text
            }});
        return response
    }

    static async getAnswers(appealId: string) {
        const response = await axios({method: 'get' , url: `http://localhost:8080/users/appeals/answers${appealId}`});
        return response
    }

    static async changeImage(userId: string, url: string) {
        const response = await axios({method: 'put', url: `http://localhost:8080/users/icon${userId}?filename=${url}`});
        return response
    }

    static async deleteImage(userId: string) {
        const response = await axios({method: 'delete', url: `http://localhost:8080/users/icon${userId}`});
        return response
    }
    static async getSchedule(groupName: string) {
        const response = await axios({method: 'get', url: `http://localhost:8080/schedule/${groupName}`});
        return response
    }
    static async getTeacherSchedule(teacher: string) {
        const response = await axios({method: 'get', url: `http://localhost:8080/schedule/teacher/${teacher}`});
        return response
    }

    static async createSchedule(groupName: string, day: string, subjects: {name: string, time: string, place: string}[]) {
        const response = await axios({method: 'post', url: 'http://localhost:8080/schedule/add', headers: {}, data: {
                groupName: groupName, day: day, subjects: subjects
            }});
        return response
    }

    static async redactAbout(userId: string, about: string) {
        const response = await axios.put(`http://localhost:8080/users/${userId}?about=${about}`)
        return response
    }
}