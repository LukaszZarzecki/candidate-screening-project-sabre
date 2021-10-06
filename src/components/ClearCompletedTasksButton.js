import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const ClearCompletedTasksButton = ({ disabled, onClick }) => {
    return (
        <Button
            variant="outlined"
            startIcon={<CleaningServicesIcon />}
            onClick={onClick}
            disabled={disabled}
            fullWidth>
            Clear completed tasks
        </Button>
    );
};

export default ClearCompletedTasksButton;