import { NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to= "/" exact>
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                   <li> 
                        <NavLink to= "/" exact activeStyle={{'color':'#9f0013'}}>Characters          
                        </NavLink>
                    </li>

                    /
                    <li>
                        <NavLink to= "/comics" exact activeStyle={{'color':'#9f0013'}}>Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;