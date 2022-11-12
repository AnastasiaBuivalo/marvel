import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';
//import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [ended, setEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(()=>onRequest(offset, true),[]);


    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let isEnd = false;
        if(newComicsList.length < 8)
            isEnd = true;
        setComicsList((comicsList)=>[...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset)=>offset+8);
        setEnded(isEnd);
    }




    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let classItem = (props.selectedId === item.id)? "comics__item comics__item_selected":"comics__item";
            console.log(classItem);
            return (
                <li 
                    className= {classItem}
                    key={item.id}
                    onClick={() => props.onComicsSelected(item.id)}>
                    <img className ={'comics__item-img'} src={item.thumbnail} alt={item.name} 
                    />
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.price}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    };

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    //const content = !(loading || error) ? items : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            disabled = {newItemLoading}
            onClick={()=>{onRequest(offset)}}
            style = {{'display': ended ? 'none':'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

ComicsList.propTypes = {
    onComicsSelected: PropTypes.func.isRequired
}

//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default ComicsList;