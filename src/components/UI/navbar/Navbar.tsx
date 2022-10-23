import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {brotliCompress} from "zlib";
import MyModal from "../modal/MyModal";
import CreateAppealForm from "../../CreateAppealForm";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <header>

        {localStorage.getItem('isLogin') === 'true'
            ?
            <nav className="header__nav">
                <ul className="header__list-link">
                    <li className="header__item-list-link">
                        <Link to='/news' className="header__link">Новости</Link>
                    </li>
                    {localStorage.getItem('isAdmin') !== 'true' &&
                        <li className="header__item-list-link">
                            <Link to="/profile" className="header__link">Профиль</Link>
                        </li>
                    }
                    {localStorage.getItem('role') !== 'Сотрудник' &&
                        <li className="header__item-list-link">
                            <Link to="/schedule" className="header__link">Расписание</Link>
                        </li>
                    }
                    {localStorage.getItem('isAdmin') === 'true'?
                        <li className="header__item-list-link">
                            <Link to="/allUsers" className="header__link">Пользователи</Link>
                        </li>
                        : <br/>
                    }

                        <li className="header__item-list-link">
                            <Link to="/appeals" className="header__link">Обращения</Link>
                        </li>


                </ul>
                <div className="header__right-side">
                    {localStorage.getItem('isAdmin') !== 'true' &&
                        //@ts-ignore
                        <img className="header__img__user" src={localStorage.getItem('img')} alt="lilIcon"/>
                    }
                        <div className="header__user-name">{localStorage.getItem('userName')}</div>
                    <div onClick={(e) => {
                        localStorage.setItem('isLogin', 'false');
                        navigate("/login");
                    }}>
                        <img
                        src="https://www.svgrepo.com/show/423724/exit.svg"
                        alt="logout"
                        className="header__img-logout"
                        />
                    </div>
                </div>
            </nav>

            : <div></div>}
        </header>
    );
};

export default Navbar;