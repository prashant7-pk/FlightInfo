import FlightDataTable from '../flight/dataTable';
import FlightGraph from '../flight/flightGraph';
import NavigationAppBar from './NavBar.jsx';
import SideBar from './SideBar.jsx';


export function MainPage() {
    return (
        <div>
            <NavigationAppBar />
            <SideBar />
        </div>
    )
}