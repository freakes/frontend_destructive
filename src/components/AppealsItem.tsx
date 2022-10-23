import React, {useEffect, useState} from 'react';
import {unlinkSync} from "fs";
import MyModal from "./UI/modal/MyModal";
import CreateAppealForm from "./CreateAppealForm";
import CreateAnswerForm from "./CreateAnswerForm";
import {useFetching} from "../hooks/useFetching";
import RequestService from "../API/RequestService";
import {log} from "util";

interface AppealsItemProps {
    id: number, name: string, text: string, date_of_create: string;
}

const AppealsItem = ({id, name, text, date_of_create}: AppealsItemProps) => {
    const [answerModal, setAnswerModal] = useState<boolean>(false);
    const [answer, setAnswer] = useState<{appealId: string, text: string}>({appealId: '', text: ''});

    const [fetchAnswer, isAnswersLoading, answersError] = useFetching(async () => {
        const response = await RequestService.getAnswers(id.toString());
        console.log(response)
        if (response.data !== '') {
            setAnswer(response.data);
        }
    });

    useEffect(() => {
        //@ts-ignore
        fetchAnswer();
    }, []);


    return (
        <div className="appeals__item__center">
            <MyModal visible={answerModal} setVisible={setAnswerModal}>
                <CreateAnswerForm/>
            </MyModal>
            <div className="appeals__item">
                <div className="appeals__item__name">{name}</div>
                <div className="appeals__item__surname">{text}</div>
                {localStorage.getItem('isAdmin') === 'true' &&
                    <button className="create__news__button" onClick={() => {
                        setAnswerModal(true);
                        localStorage.setItem('appealId', id.toString())
                    }}>Ответить</button>
                }    <div className="appeals__item__date">{date_of_create}</div>
            </div>
            {answer.text !== ''?
                <div className="answer__text">
                    {answer.text}
                </div>
                : ''}
        </div>
    );
};

export default AppealsItem;