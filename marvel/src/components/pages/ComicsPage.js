import { useState } from "react";
import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import decoration from '../../resources/img/vision.png';

const ComicsPage = ()=>{
    const [selectedComics, setSelectedComics] = useState(null);

    const onComicsSelected = (id) =>{
        setSelectedComics(id);
    }
    return(
        <>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList onComicsSelected ={onComicsSelected} selectedId = {selectedComics}/>
            </ErrorBoundary>
            <img className="bg-decoration" src={decoration} alt="vision"/>  
        </>
    )
}

export default ComicsPage;