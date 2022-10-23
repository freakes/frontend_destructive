import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import RequestService from "../API/RequestService";
import AppealsList from "../components/AppealsList";

const AppealsPage = () => {

    const [appeals, setAppeals] = useState<{id: number, name: string, text: string, date_of_create: string}[]>([]);
    const [userAppeals, setUserAppeals] = useState<{id: number, name: string, text: string, date_of_create: string}[]>([]);

    const [fetchAppeals, isAppealsLoading, appealsError] = useFetching(async () => {
        const response = await RequestService.getAppeals();
        setAppeals(response.data);
    });
    const [fetchUserAppeals, isUserAppealsLoading, userAppealsError] = useFetching(async () => {
        //@ts-ignore
        const response = await RequestService.getUserAppeals(localStorage.getItem('userId'));
        setUserAppeals(response.data);
    });

    useEffect(() => {
        //@ts-ignore
        fetchAppeals();
        //@ts-ignore
        fetchUserAppeals();
    }, []);

    return (
        <div className="container">
            {appealsError && <h1>Произошла ошибка!</h1>}
            {isAppealsLoading
                ? <h1>Идёт загрузка...</h1>
                : localStorage.getItem('isAdmin') === 'true'?  <AppealsList appeals={appeals}/>
                    :<AppealsList appeals={userAppeals}/>
            }
        </div>
    );
};

export default AppealsPage;