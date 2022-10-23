import React, {useState} from 'react';
import RequestService from "../API/RequestService";
import {useNavigate} from "react-router-dom";

const CreateAppealForm = () => {

    const [appealText, setAppealText] = useState<{text: string}>({text: ''});

    const navigate = useNavigate();
    const createAppeal = (e: SubmitEvent) => {
        e.preventDefault();
        const response = RequestService.createAppeal(appealText.text);
        response.then(value => {
            if (value.status === 200) {
                console.log(value)
                alert("Обращение успешно отправлено!")
                window.location.reload();
            }
        })
    }

    return (
        //@ts-ignore
        <form onSubmit={createAppeal} className={"create__news__form"}>
            <h4>Обращение к ректору</h4>
            <input className="input__rector" placeholder="Текст обращения" type="text" onChange={(e) => setAppealText({text: e.target.value})}/>
            <br/>
            <br/>

            <button className={"create__news__button"}>Отправить обращение</button>
        </form>
    );
};

export default CreateAppealForm;