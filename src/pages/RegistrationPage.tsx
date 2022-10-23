import React, {useState} from 'react';
import '../styles/InPages.css'
import {Link, useNavigate} from "react-router-dom";
import RequestService from "../API/RequestService";

const RegistrationPage = () => {
    const [registerData, setRegisterData] = useState<{name: string, surname: string, groupName: string, role: string,
        email: string, password: string}>({email: '', password: '', name: '', surname: '', role: '', groupName: ''});
    const navigate = useNavigate();

    const register = (e: SubmitEvent) => {
        e.preventDefault();
        const response = RequestService.registration(registerData.name, registerData.surname, registerData.role,
            registerData.email, registerData.password, registerData.groupName);

        response.then((value) => {
            if (value.status === 200) {
                navigate("/login")
            } else {
                alert("Ошибка регистрации, пожалуйста, попробуйте позже");
                navigate("/registration")
            }
        })
    }
    return (
        //@ts-ignore
        <form onSubmit={register} className="login">
            <h3>EduNews</h3>
            <input onChange={(e) => setRegisterData({...registerData, name: e.target.value})} type="text" placeholder="Имя"/>
            <input onChange={(e) => setRegisterData({...registerData, surname: e.target.value})} type="text" placeholder="Фамилия"/>
            <input onChange={(e) => setRegisterData({...registerData, groupName: e.target.value})} type="text" placeholder="Учебная группа(при отстутствии не заполнять)"/>
            <input onChange={(e) => setRegisterData({...registerData, email: e.target.value})} type="email" placeholder="Email"/>
            <input onChange={(e) => setRegisterData({...registerData, password: e.target.value})} type="password" placeholder="Пароль"/>
            <p><input onChange={(e) => setRegisterData({...registerData, role: e.target.value})} type="radio" id="student" value="Студент" name="role"/>Студент</p>
            <p><input onChange={(e) => setRegisterData({...registerData, role: e.target.value})} type="radio" id="teacher" value="Преподаватель" name="role"/>Преподаватель</p>
            <p><input onChange={(e) => setRegisterData({...registerData, role: e.target.value})} type="radio" id="worker" value="Сотрудник" name="role"/>Сотрудник</p>
            <button type={"submit"}>SIGN UP</button>
            <Link to={"/login"}>Уже зарегестрированы?</Link>
        </form>
    );
};

export default RegistrationPage;