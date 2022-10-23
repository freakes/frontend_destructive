import React from 'react';
import {useUsers} from "../hooks/useUsers";
import {useNavigate} from "react-router-dom";
import {Container, Row} from "react-bootstrap";

const UsersPage = () => {
    const [users, usersError] = useUsers();
    console.log(users)
    const navigate = useNavigate();

    if (localStorage.getItem('isAdmin') !== 'true') {
        navigate('/news')
    }

    return (
        <div className="container">
        <table className="table__users" border={3} >
            <tr className="table__row__header">
                <th className="table__th">id</th>
                <th className="table__th">Имя</th>
                <th className="table__th">Фамилия</th>
                <th className="table__th">Группа</th>
                <th className="table__th">Роль</th>
                <th className="table__th">Email</th>
            </tr>
            {usersError
            ? <h1>Ошибка загрузки пользователей!</h1>
                //@ts-ignore
            : users.map((user) => (
                    //@ts-ignore


                        <tr className="table__row">
                            <td className="table__column">{user.id}</td>
                            <td className="table__column">{user.name}</td>
                            <td className="table__column">{user.surname}</td>
                            <td className="table__column">{user.groupName}</td>
                            <td className="table__column">{user.role}</td>
                            <td className="table__column">{user.email}</td>
                        </tr>
                ))}
        </table>
        </div>
    );
};

export default UsersPage;