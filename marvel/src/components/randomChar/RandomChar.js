import { useState, useEffect, useRef} from 'react';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props)=> {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(()=>{
        console.log('вызов2  mount');
        updateChar();
        return  () => {clearInterval(timerRef?.current)};
    }, []);


    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () =>{
        console.log('update');
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    };
    
    const timerRef = useRef(setInterval(updateChar, 5000000));

    //const timer = setInterval(updateChar, 5000000);
    const marvelService = new MarvelService();





   const onRandomChar = () => {
        console.log('вызов');
        updateChar();
        clearInterval(timerRef?.current);
        timerRef.current = setInterval(updateChar, 5000000);
        //timer= setInterval(updateChar, 5000000);
    }

    console.log('render');
    const errorMessage = error? <ErrorMessage/>: null;
    const load = loading? <Spinner/> : null;
    const content = !(loading||error) ? <View char = {char}/>: null;

    return (
        <div className="randomchar">
            {errorMessage}
            {load}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick = {onRandomChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
};


const View = ({char}) =>{
    const {thumbnail, name, description, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};;
    if (thumbnail.indexOf('image_not_available') !== -1){
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style = {imgStyle}/>
                    <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>x
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;
