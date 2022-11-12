import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";


import decoration from '../../resources/img/vision.png';

const App = ()=> {
    const [selectedChar, setSelectedChar] = useState(null);
    const [selectedComics, setSelectedComics] = useState(null);

    const onComicsSelected = (id) =>{
        setSelectedComics(id);
    }

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route exact path = "/" >
                        <MainPage/>
                    </Route>
                    <Route exact path = "/comics" >
                        <ComicsPage/>
                    </Route>
                </main>
            </div>
        </Router>
       
    )
}

export default App;