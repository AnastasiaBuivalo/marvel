import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

import {lazy, Suspense} from "react"

const Page404 = lazy(()=>import('../pages/404'));
const MainPage = lazy(()=>import('../pages/MainPage'));
const ComicsPage = lazy(()=>import('../pages/ComicsPage'));
const SingleComicPage = lazy(()=>import('../pages/SingleComicPage'));

const App = ()=> {

    return (
         <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback = {<Spinner/>}>
                        <Switch>
                            <Route exact path = "/" component={MainPage} />
                            <Route exact path = "/comics" component={ComicsPage}/>
                            <Route exact path="/comics/:comicId" component={SingleComicPage}/>
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                 </main> 
             </div>
        </Router>
       
    )
}

export default App;