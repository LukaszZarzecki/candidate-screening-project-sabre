import { useState } from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const TaskForm = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    const [taskNameError, setTaskNameError] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState(moment().add(1, 'days').toDate());
    const [taskDeadlineError, setTaskDeadlineError] = useState(false);

    const handleTaskNameChange = evt => {
        setTaskNameError(false);
        setTaskName(evt.target.value);
    };

    const handleTaskDeadlineChange = date => {
        setTaskDeadline(date);

        const isDateValid = !isNaN(date.getTime());
        setTaskDeadlineError(!isDateValid);
    };

    const handleSubmit = () => {
        if (!taskName.trim().length) {
            setTaskNameError(true);
            return;
        }

        onAdd({
            id: nanoid(),
            name: taskName.trim(),
            complete: false,
            deadline: taskDeadline.getTime(),
        });

        setTaskNameError(false);
        setTaskName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={2}>
                <Grid item>
                    <TextField
                        required
                        label="New task name"
                        aria-label="New Task name"
                        error={taskNameError}
                        value={taskName}
                        onChange={handleTaskNameChange}
                        fullWidth
                        autoFocus
                    />
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Deadline"
                            error={taskDeadlineError}
                            value={taskDeadline}
                            onChange={handleTaskDeadlineChange}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        disabled={taskDeadlineError || taskNameError || taskName.trim().length === 0}
                        fullWidth
                    >
                        Add task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskForm;