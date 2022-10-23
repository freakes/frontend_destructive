import React, {useState} from 'react';
import RequestService from "../API/RequestService";

const CreateAnswerForm = () => {

    const [appealAnswerText, setAppealAnswerText] = useState<{text: string}>({text: ''});

    const createAnswer = (e: SubmitEvent) => {
        e.preventDefault();
        console.log(e);
        const response = RequestService.createAnswer(appealAnswerText.text);
        response.then(value => {
            if (value.status === 200) {
                console.log(value)
                alert("Ответ успешно отправлен!")
                window.location.reload();
            }
        })
    }

    return (
        //@ts-ignore
        <form onSubmit={createAnswer} className={"create__news__form"}>
            <h4>Ответ на обращение</h4>
            <input className="input__rector" placeholder="Текст ответа" type="text" onChange={(e) => setAppealAnswerText({text: e.target.value})}/>
            <br/>
            <br/>
            <button className={"create__news__button"}>Отправить ответ</button>
        </form>
    );
};

export default CreateAnswerForm;