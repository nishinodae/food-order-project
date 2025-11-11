import { Box, Grid, Typography } from '@mui/material';
import headerImg1 from '../assets/nasi-lemak-illustration-resized.webp';
import headerImg2 from '../assets/laksa-resized.webp';
import headerImg3 from '../assets/nasigoreng-resized.webp';

const Headline = ({ firstLine, secondLine }) => {
    return (<Grid container sx={{
        position: 'relative', bgcolor: 'primary.main', p: '100px 15px 50px 25px',
        background: 'radial-gradient(farthest-side at 110% 1%, #000, #E60071)'
    }}>
        <Box>
            <Typography sx={{ color: 'secondary.main' }} fontSize='20px'>{firstLine}</Typography>
            <Typography sx={{ color: 'secondary.main' }} fontSize='14px'>{secondLine}</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <img src={headerImg1} alt='nasi-lemak'
                className='overlay-first'
            ></img>
            <img src={headerImg2} alt='nasi-lemak'
                className='overlay-second'
            ></img>
            <img src={headerImg3} alt='nasi-lemak'
                className='overlay-third'
            ></img>
        </Box>

    </Grid>);
};

export default Headline;