import Button from '@mui/material/Button';
import './Test_style.css';

export default function ButtonUsage() {
  return (
    <div>
        <Button variant="text"  className='custom-mui-button'>Text</Button>
        <Button variant="contained" disabled >Contained</Button>
        <Button variant="outlined" className='danger'>Outlined</Button> 
        <Button variant="outlined">
            Delete
        </Button>  
    </div>
  );
}