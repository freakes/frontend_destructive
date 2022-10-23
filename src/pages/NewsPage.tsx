import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import RequestService from "../API/RequestService";
import NewsList from "../components/NewsList";
import {Container, Row} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import CreateNewsForm from "../components/CreateNewsForm";
import CreateAppealForm from "../components/CreateAppealForm";


const NewsPage = () => {

    const [news, setNews] = useState<{id: number, title: string, text: string, tag: string, date_of_create: string}[]>([]);
    const [modalNews, setModalNews] = useState<boolean>(false);
    const [appealModal, setAppealModal] = useState<boolean>(false);

    const [fetchNews, isNewsLoading, newsError] = useFetching(async () => {
        const response = await RequestService.getNews();
        setNews(response.data);
    });

    useEffect(() => {
        //@ts-ignore
        fetchNews();
    }, []);




    const deleteNewsById = (id: number) => {
        const response = RequestService.deleteNews(id);
        response.then(value => {
            if (value.status !== 200) {
                alert("Ошибка удаления! Попробуйте позднее.")
            }
        })        //@ts-ignore
        fetchNews();
        //@ts-ignore
        fetchNews();
        //@ts-ignore
        fetchNews();
    }


    return (
            <div className="container">
                <MyModal visible={appealModal} setVisible={setAppealModal}>
                    <CreateAppealForm/>
                </MyModal>
                <MyModal visible={modalNews} setVisible={setModalNews}>
                    {
                     //@ts-ignore
                    <CreateNewsForm/>
                    }
                </MyModal>
                {newsError && <h1>Произошла ошибка!</h1>}

                {isNewsLoading
                    ? <h1>Идёт загрузка...</h1>
                    : <NewsList deleteNewsById={deleteNewsById} newsList={news}/>
                }
                {localStorage.getItem('isAdmin') === 'true' &&
                    < button onClick={() => setModalNews(true)} className="news__item__add__btn">Добавить</button>
                }
                {localStorage.getItem('isAdmin') !== 'true'?

                        <button onClick={() => setAppealModal(true)} className="create__appeal_ico"><img src="https://www.svgrepo.com/show/331733/message.svg"
                                                                                                         alt="message"/></button>

                    : <br/>
                }
            </div>
    );
};

export default NewsPage;