import { useEffect, useState } from 'react';

const TASK_LOCALSTORAGE_KEY = 'TASK_LOCALSTORAGE';

const useTaskList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const listRaw = localStorage.getItem(TASK_LOCALSTORAGE_KEY);
        if (!listRaw) {
            return;
        }

        try {
            const listParsed = JSON.parse(listRaw);

            setList(listParsed);
        } catch (e) {
            return;
        }
    }, []);

    useEffect(() => {
        console.log(list);
        localStorage.setItem(TASK_LOCALSTORAGE_KEY, JSON.stringify(list));
    }, [list]);

    const addTask = newTask => {
        const newList = [...list, newTask];
        setList(newList);
    };

    const removeTask = taskId => {
        const newList = list.filter(task => {
            if (task.id === taskId) {
                return false;
            }

            return true;
        });

        setList(newList);
    };

    const updateTask = newTask => {
        const newList = list.map(task => {
            if (task.id === newTask.id) {
                return newTask;
            }

            return task;
        });

        setList(newList);
    };

    const removeCompleted = () => {
        const newList = list.filter(task => {
            return !task.complete;
        });

        setList(newList);
    }

    return {
        list,
        addTask,
        removeTask,
        updateTask,
        removeCompleted,
    };
}

export default useTaskList;