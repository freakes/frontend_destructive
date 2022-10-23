import React from 'react';
import NewsItem from "./NewsItem";

interface NewsListProps {
    newsList: {id: number, title: string, text: string, tag: string, date_of_create: string}[];
    deleteNewsById: (id: number) => void;
}

const NewsList = ({newsList, deleteNewsById}: NewsListProps) => {
    return (
        <div className="news__list">
            {newsList.map((news) => (
                <NewsItem
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    text={news.text}
                    tag={news.tag}
                    date_of_create={news.date_of_create}
                    deleteNewsById={deleteNewsById}
                />
            ))}
        </div>
    );
};

export default NewsList;