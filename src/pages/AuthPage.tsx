import React, {useState} from 'react';
import RequestService from "../API/RequestService";
import {useFetching} from "../hooks/useFetching";
import {Link, useNavigate} from "react-router-dom";
import '../styles/InPages.css'

const AuthPage = () => {
    localStorage.setItem('isLogin', 'false');
    const [loginData, setLoginData] = useState<{ email: string, password: string }>({email: '', password: ''});

    const navigate = useNavigate();

    const [logIn, isEventsLoading, eventError] = useFetching(async () => {
        const response = await RequestService.authorization(loginData.email, loginData.password);
        console.log(response)
        if (response.status === 200) {
            console.log(response.data.icon);
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('about', '');
            localStorage.setItem('img', response.data.icon);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('groupName', response.data.groupName);
            localStorage.setItem('userId', response.data.id.toString());
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('userName', response.data.surname + ' ' + response.data.name);
            localStorage.setItem('isAdmin', response.data._Admin.toString());
            navigate("/news");
        } else {
            alert("Ошибка авторизации, проверьте логин и пароль на правильность!");
            navigate("/login")
        }
    });


    const login = (e: SubmitEvent) => {
        e.preventDefault();
        //@ts-ignore
        logIn();
    }

    return (
        //@ts-ignore
        <form onSubmit={login} className="login">
            <h3>EduNews</h3>
            <br/>
            <input onChange={(e) => setLoginData({...loginData, email: e.target.value})} type="email"
                   placeholder="Email"/>
            <input onChange={(e) => setLoginData({...loginData, password: e.target.value})} type="password"
                   placeholder="Пароль"/>
            <button type={"submit"}>LOG IN</button>
            <Link to={"/registration"}>Ещё не зарегестрированы?</Link>
        </form>
)};

export default AuthPage;