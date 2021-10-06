import { useEffect, useState } from 'react';

const useTaskList = (storage = localStorage, key = 'TASK_LOCALSTORAGE') => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const listRaw = storage.getItem(key);
        if (!listRaw) {
            return;
        }

        try {
            const listParsed = JSON.parse(listRaw);

            if (Array.isArray(listParsed)) {
                setList(listParsed);
            }
        } catch (e) {
            return;
        }
    }, [storage, key]);

    useEffect(() => {
        storage.setItem(key, JSON.stringify(list));
    }, [list, storage, key]);

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