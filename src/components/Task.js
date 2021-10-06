import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ task, onChange, onRemove }) => {
    const labelId = `checkbox-list-label-${task.id}`;

    const handleChange = (changesInTask = {}) => {
        const newTask = { ...task, ...changesInTask };

        onChange(newTask);
    };

    const handleRemove = (taskId) => {
        onRemove(taskId);
    };

    const handleCheckboxClick = () => {
        handleChange({
            complete: !task.complete,
        });
    };

    const handleRemoveClick = () => {
        handleRemove(task.id);
    };

    const deadlineFormattedDate = moment(task.deadline).format('llll');

    return (
        <>
            <ListItem>
                <ListItemButton role={undefined} onClick={handleCheckboxClick} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={task.complete}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        id={labelId}
                        primary={task.name}
                        secondary={deadlineFormattedDate}
                    />
                </ListItemButton>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={handleRemoveClick}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default Task;