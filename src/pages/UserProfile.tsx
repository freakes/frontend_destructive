import React, {HTMLAttributeAnchorTarget, useState} from 'react';
import '../styles/Profile.css'
import MyModal from "../components/UI/modal/MyModal";
import UploadProfileIconForm from "../components/UploadProfileIconForm";
import RequestService from "../API/RequestService";

const UserProfile = () => {
    const [uploadModal, setUploadModal] = useState<boolean>(false);
    const [aboutInput, setAboutInput] = useState<boolean>(false);
    const [aboutText, setAboutText] = useState<{text: string }>({text: ''})
    const about = aboutText.text;

    function deleteImg(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        //@ts-ignore
        const response = RequestService.deleteImage(localStorage.getItem('userId'))
        response.then(value => {
            if (value.status === 200) {
                localStorage.setItem('img', value.data)
                window.location.reload();
            }
        })
    }

    const saveAbout = (e: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        const response = RequestService.redactAbout(localStorage.getItem('userId'), aboutText.text);
        response.then(value => {
            console.log(value.status)
            if (value.status === 200) {
                localStorage.setItem('about', aboutText.text);
                window.location.reload();
            }
        })
    }


    return (
        <div className="container">
            <MyModal visible={uploadModal} setVisible={setUploadModal}>
                <UploadProfileIconForm/>
            </MyModal>
        <div className="profile__user__info">
            <div className="profile__photo__block">
                <img
                    //@ts-ignore
                    src={localStorage.getItem('img')}
                    alt="Фото профиля"
                    className="profile__photo"
                />
                <button onClick={() => setUploadModal(true)} className="profile__photo__btn">Сменить фото</button>

                <button onClick={(e) => deleteImg(e)} className="profile__photo__btn">Удалить фото</button>
            </div>
            <ul className="profile__user__block__text">
                <li className="profile__user__info__text">
                    {localStorage.getItem('userName')}<span className="profile__user__role"> ({localStorage.getItem('role')})</span>
                </li>
                <li className="profile__user__info__text"> <span className="email__label">Почта: </span>
                    <a href={"mailto:" + localStorage.getItem('email')} className="profile__user__info__link"
                    >{localStorage.getItem('email')}</a
                    >
                </li>
                <br/>
                <li className="email__label">
                    Группа: {localStorage.getItem('groupName')}
                </li>
                <br/>
                <li className="email__label">
                        {"О себе: " + localStorage.getItem('about')}
                    <div className={aboutInput ? "about__area__show" : "about__area__hide"}>
                        <textarea className="news__input" onChange={(e) => setAboutText({text: e.target.value})}/>
                        <button onClick={(e) => {
                            saveAbout(e);
                            setAboutInput(false)
                        }} className="create__button__area">Сохранить</button>
                    </div>
                    <div onClick={() => setAboutInput(!aboutInput)}>
                        <img className="redact__about" src="https://www.svgrepo.com/show/14541/pencil.svg" alt="pencil"/>
                    </div>
                </li>
            </ul>
        </div>
        </div>
    );
};

export default UserProfile;