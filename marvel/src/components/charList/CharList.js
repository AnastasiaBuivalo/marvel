import {Component} from 'react'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
//import App from '../app/App'

import './charList.scss';



class CharList extends Component {


    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1550,
        ended: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () =>{
        this.setState({newItemLoading:true});
    }

    onCharListLoaded = (newCharList) => {
        let isEnd = false;
        if(newCharList.length < 9)
            isEnd = true
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            ended: isEnd
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let classItem = (this.props.selectedId === item.id)? "char__item char__item_selected":"char__item";
            return (
                <li 
                    className= {classItem}
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
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

    render() {

        const {charList, loading, error, newItemLoading, offset, ended} = this.state;
        
        const items = this.renderItems(charList);

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
                onClick={()=>{this.onRequest(offset)}}
                style = {{'display': ended ? 'none':'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;