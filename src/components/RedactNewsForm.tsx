import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import RequestService from "../API/RequestService";
import {useFetching} from "../hooks/useFetching";

interface RedactNewsFormProps {
    id: number
}

const RedactNewsForm = ({id}: RedactNewsFormProps) => {

    const [newsData, setNewsData] = useState<{title: string, text: string, tag: string}>({title: '', text: '', tag: ''});
    const redactNews = (e: SubmitEvent) => {
        e.preventDefault();
        const response = RequestService.redactNews(id, newsData.title, newsData.text, newsData.tag);
        response.then(value => {
            if (value.status === 200) {
                window.location.reload();
            }
        })
    }

    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        const response = await RequestService.getNewsById(id);
        setNewsData({title: response.data.title, text: response.data.text, tag: response.data.tag});
    });

    useEffect(() => {
        //@ts-ignore
        fetchData();
    }, []);


    return (
        //@ts-ignore
        <form onSubmit={redactNews} className={"create__news__form"}>
            <h4>Редактирование новости</h4>
            <input className="news__input" value={newsData.title} placeholder="Название новости" type="text" onChange={(e) => setNewsData({...newsData, title: e.target.value})}/>
            <input className="news__input" value={newsData.text} placeholder="Текст новости" type="text" onChange={(e) => setNewsData({...newsData, text: e.target.value})}/>
            <Select
                //@ts-ignore
                onChange={(e) => setNewsData({...newsData, tag: e.value})}
                closeMenuOnSelect={true}
                name={"tags"}
                defaultValue={"Выберите тэг"}
                //@ts-ignore
                options={[{value: 'Социальная жизнь', label: 'Социальная жизнь'}, {value: 'Учебные новости', label: 'Учебные новости'},
                    //@ts-ignore
                    {value: 'Жизнь ВУЗа', label: 'Жизнь ВУЗа'}
                ]}
            />
            <br/>

            <button className={"create__news__button"}>Сохранить изменения</button>
        </form>
    );
};

export default RedactNewsForm;