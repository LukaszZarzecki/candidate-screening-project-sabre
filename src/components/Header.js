import Typography from '@mui/material/Typography';

const Header = ({ children }) => {
    return (
        <Typography variant="h1">{children}</Typography>
    );
};

export default Header;