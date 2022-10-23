import {useEffect, useState} from "react";
import {useFetching} from "./useFetching";
import RequestService from "../API/RequestService";

interface UserType {
    name: string; surname: string; role: string; id: number; email: string; is_Admin: boolean; groupName: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    let temp_arr: UserType[] = []
    const [fetchUsers, isUsersLoading, userError] = useFetching(async () => {
        const response = await RequestService.getUsers();

        response.data.map((user: UserType) => {
            if (temp_arr.length !== response.data.length) {
                temp_arr.push({id: user.id, surname: user.surname, name: user.name, role: user.role,
                email: user.email, is_Admin: user.is_Admin, groupName: user.groupName});
            }
        })});

    useEffect(() => {
        //@ts-ignore
        fetchUsers();
        setUsers(temp_arr);
    }, [])
    return [users, userError]
}