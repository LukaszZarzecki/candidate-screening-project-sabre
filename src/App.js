import './App.css';

import useTaskList from './useTaskList';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ClearCompletedTasksButton from './components/ClearCompletedTasksButton';

function App() {
    const taskList = useTaskList();

    const handleTaskChange = newTask => {
        taskList.updateTask(newTask);
    };

    const onTaskRemove = taskId => {
        taskList.removeTask(taskId);
    };

    const onTaskAdd = newTask => {
        taskList.addTask(newTask);
    };

    const handleClearCompletedTaskButtonClick = () => {
        taskList.removeCompleted();
    };

    return (
        <Container sx={{ textAlign: 'center' }}>
            <Grid
                container
                spacing={4}
                alignItems="flex-start"
            >
                <Grid item xs={12}>
                    <Header>Todo App</Header>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <TaskList
                            list={taskList.list}
                            onTaskChange={handleTaskChange}
                            onTaskRemove={onTaskRemove} />
                        <ClearCompletedTasksButton
                            disabled={!taskList.list.reduce((complete, task) => {
                                return complete || task.complete;
                            }, false)}
                            onClick={handleClearCompletedTaskButtonClick} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <TaskForm onAdd={onTaskAdd} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
