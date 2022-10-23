import React, {useState} from 'react';
import MyModal from "./UI/modal/MyModal";
import RedactNewsForm from "./RedactNewsForm";

interface NewsItemProps {
    id: number, title: string, text: string, tag: string, date_of_create: string, deleteNewsById: (id: number) => void;
}

const NewsItem = ({id, title, text, tag, date_of_create, deleteNewsById}: NewsItemProps) => {
    const [redactModal, setRedactModal] = useState<boolean>(false);
    return (

            <div className="news__item">
                <MyModal visible={redactModal} setVisible={setRedactModal}>
                    {
                        <RedactNewsForm id={id}/>
                    }
                </MyModal>
                <span className="news__item__date">{date_of_create}</span>
                <h2 className="news__item__heading">{title}</h2>
                <p className="news__item__text">
                    {text}
                </p>
                <div className="news__item__tag">{tag}</div>
                {localStorage.getItem('isAdmin') === 'true' &&
                    <button onClick={() => setRedactModal(true)} className="news__item__redact__btn">Редактировать</button>
                }
                {localStorage.getItem('isAdmin') === 'true' &&
                    <button onClick={() => deleteNewsById(id)} className="news__item__delete__btn">Удалить</button>
                }
            </div>

    );
};

export default NewsItem;