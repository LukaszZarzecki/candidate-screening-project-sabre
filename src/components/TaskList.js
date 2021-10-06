import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Task from './Task';

const TaskList = ({ list, onTaskChange, onTaskRemove }) => {
    if (list.length === 0) {
        return (
            <Typography fontSize="2em">Your task list is empty!</Typography>
        );
    }

    return (
        <List>
            {list.map(task => {
                return (
                    <Task key={task.id} task={task} onChange={onTaskChange} onRemove={onTaskRemove} />
                )
            })}
        </List>
    );
};

export default TaskList;