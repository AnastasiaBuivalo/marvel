// import {useEffect, useState} from 'react'
// import { useParams, Link} from 'react-router-dom'
// import useMarvelService from '../../services/MarvelService'
// import ErrorMessage from '../errorMessage/ErrorMessage'
// import Spinner from '../spinner/Spinner'

// import './singleComicPage.scss';
// import xMen from '../../resources/img/x-men.png';


// const SingleComicPage =()=>{
    
//     const [comic, setComic] = useState(null);
//     const {error, loading, getComic, clearError} = useMarvelService();
//     const {comicId} = useParams();

//     console.log(1);
//     console.log(comicId)
//     useEffect(()=>updateChar(), 
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [comicId]);

//     const updateChar = () => {
//         clearError()
//         //const {comicId} = props;
//         if (!comicId) {
//             return;
//         }

//         getComic(comicId)
//             .then(onComicLoaded)
//     }

//     const onComicLoaded = (char) => {
//         setComic(char);
//     }

//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading ? <Spinner/> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

//     return(
//         <>
//             {errorMessage}
//             {spinner}
//             {/* {content} */}
//         </>
//     )
// }

// const View =({comic})=>{

//     return (
//         <div className="single-comic">
//         <img src={xMen} alt="x-men" className="single-comic__img"/>
//         <div className="single-comic__info">
//             <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
//             <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
//             <p className="single-comic__descr">144 pages</p>
//             <p className="single-comic__descr">Language: en-us</p>
//             <div className="single-comic__price">9.99$</div>
//         </div>
//         <Link to= "/comics" className="single-comic__back">Back to all</Link>
//     </div>
//     )
// }

// export default SingleComicPage;

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;