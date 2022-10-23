import React, {useEffect, useState} from 'react';
import RequestService from "../API/RequestService";
import * as XLSX from "xlsx"
import {groupCSS} from "react-select/dist/declarations/src/components/Group";
import {useFetching} from "../hooks/useFetching";
import {isValidDateValue} from "@testing-library/user-event/dist/utils";

const SchedulePage = () => {
    const [drag, setDrag] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<{id: number, groupName: string, day: string, subjects: {id: number, name: string,
        time: string, place: string, teacher: string}[]}[]>()
    const [teacherSchedule, setTeacherSchedule] = useState<{id: number, groupName: string, day: string, subjects: {id: number, name: string,
        time: string, place: string, teacher: string}[]}[]>()


    const [fetchSchedule, isScheduleLoading, scheduleError] = useFetching(async () => {
        console.log(localStorage.getItem('groupName'))
        //@ts-ignore
        const response = await RequestService.getSchedule(localStorage.getItem('groupName'));
        setSchedule(response.data)
    });
    const [fetchTeacherSchedule, isTeacherScheduleLoading, teacherScheduleError] = useFetching(async () => {
        //@ts-ignore
        const teacherName = localStorage.getItem('userName').split(' ')[0]
        const response = await RequestService.getTeacherSchedule(teacherName);
        console.log(response)
        setTeacherSchedule(response.data)
    });

    useEffect(() => {
        //@ts-ignore
        fetchSchedule();
        //@ts-ignore
        fetchTeacherSchedule();
        // console.log(teacherSchedule)
    }, []);



    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(false);
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.dataTransfer.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                //@ts-ignore
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                json.splice(0, 1)
                let i = 0
                json.map((day) => {
                    //@ts-ignore
                    for (let k in day) {
                        //@ts-ignore
                        json[i][k] = [json[i][k].split(',').slice(0, 4), json[i][k].split(',').slice(4, 8)];
                    }
                    i = i + 1;
                })
                console.log(json);
                // @ts-ignore
                json.map((day) => {
                    console.log(day)
                    //@ts-ignore
                    const EducationDay = day.__EMPTY[0][0]
                    //@ts-ignore
                    for (let gr in day) {
                        //@ts-ignore
                        if (day[gr][0].length !== 1) {
                            //@ts-ignore
                            const subjectsTemp = day[gr];
                            let subjects: {name: string, time: string, place: string, teacher: string}[] = []
                            subjectsTemp.map((el: [name: string, time: string, place: string, teacher: string]) => {
                                subjects.push({name: el[0], time: el[1], place: el[2], teacher: el[3]});
                            })
                            console.log(subjects)

                            const response = RequestService.createSchedule(gr, EducationDay, subjects)
                            response.then(value => {
                                console.log(value)
                            })
                        }
                    }
                })

            };
            reader.readAsArrayBuffer(e.dataTransfer.files[0]);
        }
        alert('Файл загружен успешно!')
        setDrag(false)

        console.log();
    }
    if (localStorage.getItem('isAdmin') === 'true') {
    return (

        <div className="container">

            {drag
                ? <div className="drop__area"
                       onDragStart={e => dragStartHandler(e)}
                       onDragLeave={e => dragLeaveHandler(e)}
                       onDragOver={e => dragStartHandler(e)}
                       onDrop={e => onDropHandler(e)}
                >Отпустите файл, чтобы загрузить его.</div>
                : <div className="drop__area_false"
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >Перетащите файл, чтобы загрузить его.</div>

            }
            <a href="/../files/template.xlsx" download="template.xlsx">Скачать шаблон вида расписания(.xlsx)</a>

        </div>
    );} else if (localStorage.getItem('role') !== 'Преподаватель') {
        {
            schedule?.sort((a, b) => a.id - b.id);

        }
        return (
            <div className="container">
                <div className="schedule__group__name">{localStorage.getItem('groupName')}</div>
                {schedule?.map((day) => (
                    <div className="schedule__center">
                    <div className="schedule__container">
                        <div className="schedule__day">
                            {day.day}
                        </div>
                        {day.subjects.map((subject) => (
                            <div className="schedule__lesson__box">
                                <div className="schedule__lesson__name">
                                    {subject.name}
                                </div>
                                <div className="schedule__lesson__time">
                                    {subject.time}
                                </div>
                                <div className="schedule__lesson__place">
                                    Преподаватель: {subject.teacher}
                                </div>
                                <div className="schedule__lesson__place">
                                    Аудитория: {subject.place}
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                ))}
                <br/>
            </div>
            );
    } else {
        {
            teacherSchedule?.sort((a, b) => a.id - b.id);

        }
        return (
            <div className="container">

                <div className="schedule__group__name">{localStorage.getItem('userName')}</div>
                {teacherSchedule?.map((day) => (
                    <div className="schedule__center">
                        <div className="schedule__container">
                            <div className="schedule__day">
                                {day.day}
                            </div>
                            {day.subjects.map((subject) => (
                                //@ts-ignore
                                <div className={(subject.teacher.split(' ')[0] === localStorage.getItem('userName').split(' ')[0]) ? "schedule__lesson__box" : ""}>

                                        {/*@ts-ignore*/}
                                        {(subject.teacher.split(' ')[0] === localStorage.getItem('userName').split(' ')[0])
                                            ? <div className="schedule__lesson__name">
                                                {subject.name}
                                            </div>
                                                : ''}


                                        {/*@ts-ignore*/}
                                        {(subject.teacher.split(' ')[0] === localStorage.getItem('userName').split(' ')[0])
                                            ?<div className="schedule__lesson__time">
                                                {subject.time}
                                            </div>
                                            : ''}

                                        {/*@ts-ignore*/}
                                        {(subject.teacher.split(' ')[0] === localStorage.getItem('userName').split(' ')[0])
                                            ?<div className="schedule__lesson__place">
                                            Группа: {day.groupName}
                                            </div>
                                            : ''}



                                        {/*@ts-ignore*/}
                                        {(subject.teacher.split(' ')[0] === localStorage.getItem('userName').split(' ')[0])
                                            ? <div className="schedule__lesson__place">
                                                Аудитория: {subject.place}
                                            </div>
                                            : ''}



                                </div>
                            ))}
                        </div>
                    </div>

                ))}
                <br/>
            </div>
        );
    }
};

export default SchedulePage;