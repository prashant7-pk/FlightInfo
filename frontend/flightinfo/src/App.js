
import { Box } from '@mui/material';
import './App.css';
import { MainPage } from './LandingPage/mainPage';
import NavigationAppBar from './LandingPage/NavBar';
import FlightDataTable from './flight/dataTable';
import SideBar from './LandingPage/SideBar';

function App() {
  return (
    <>
     <div className="app-container">
      <NavigationAppBar />
      <div className="main-content">
        {/*<SideBar />*/}
        <FlightDataTable />
      </div>
    </div>
      
      </>
  );
}

export default App;
