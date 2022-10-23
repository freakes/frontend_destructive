import React, {useState} from 'react';
import RequestService from "../API/RequestService";
import {handleInputChange} from "react-select/dist/declarations/src/utils";

const UploadProfileIconForm = () => {

    const [image, setImage] = useState<{url: string}>({url: ''});

    const changeImage = (e: SubmitEvent) => {
        e.preventDefault();
        //@ts-ignore
        const response = RequestService.changeImage(localStorage.getItem('userId'), image.url)
        response.then(value => {
            if (value.status === 200) {
                localStorage.setItem('img', image.url);
                window.location.reload();
            }
        })
    }

    return (
        //@ts-ignore
        <form onSubmit={changeImage} className={"create__news__form"}>
            <h4>Смена фото профиля</h4>
            <input placeholder="Введите ссылку на изображение" className="news__input" type="url" onChange={(e) =>
                //@ts-ignore
                setImage({url: e.target.value})}/>
            <br/>
            <button className={"create__news__button"}>Сменить фото</button>
        </form>
    );
};

export default UploadProfileIconForm;