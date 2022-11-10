import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
//import App from '../app/App'

import './charList.scss';



const CharList = (props)=>{

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1550);
    const [ended, setEnded] = useState(false);

    const marvelService = new MarvelService();
    useEffect(()=>onRequest(),[]);


    const onRequest = (offset) => {
        setNewItemLoading(true);
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoaded = (newCharList) => {
        let isEnd = false;
        if(newCharList.length < 9)
            isEnd = true;
        setCharList((charList)=>[...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset((offset)=>offset+9);
        setEnded(isEnd);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let classItem = (props.selectedId === item.id)? "char__item char__item_selected":"char__item";
            return (
                <li 
                    className= {classItem}
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    };


    //const {charList, loading, error, newItemLoading, offset, ended} = this.state;
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
            disabled = {newItemLoading}
            onClick={()=>{onRequest(offset)}}
            style = {{'display': ended ? 'none':'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;