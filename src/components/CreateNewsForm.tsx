import React, {useState} from 'react';
import Select from 'react-select'
import RequestService from "../API/RequestService";

const CreateNewsForm = () => {

    const [newsData, setNewsData] = useState<{title: string, text: string, tag: string}>({title: '', text: '', tag: ''});

    const createNews = (e: SubmitEvent) => {
        e.preventDefault();
        const response = RequestService.createNews(newsData.title, newsData.text, newsData.tag);
        response.then(value => {
            if (value.status === 200) {
                window.location.reload();
            }
        })
    }

    return (
        //@ts-ignore
        <form onSubmit={createNews} className={"create__news__form"}>
            <h4>Добавление новости</h4>
            <input className="news__input" placeholder="Название новости" type="text" onChange={(e) => setNewsData({...newsData, title: e.target.value})}/>
            <input className="news__input" placeholder="Текст новости" type="text" onChange={(e) => setNewsData({...newsData, text: e.target.value})}/>
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

            <button className={"create__news__button"}>Создать новость</button>
        </form>
    );
};

export default CreateNewsForm;