import useHttp from "../hooks/http.hooks";

const useMarvelService = ()=>{
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '9d851f6efd5df6e480d7941531979b70';
    const _baseOffset = 110;
    const _limit = 9;
    const _comicslimit = 8;

    const {error, loading, clearError, request} = useHttp();
    // getResource = async(url) => {
    //     let res = await fetch(url);
    //     if(!res.ok)
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset)=>{
        //return this.getResource(`${this._apiBase}characters?limit=9&apikey=${this._apiKey}`);
        const res = await request(`${_apiBase}characters?limit=${_limit}&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_tranformCharacter);
    }

    const getCharacter = async (id)=>{
        //return this.getResource('https://gateway.marvel.com:443/v1/public/characters/1010829?apikey=9d851f6efd5df6e480d7941531979b70');
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
        return _tranformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) =>{
        const res = await request(`${_apiBase}comics?limit=${_comicslimit}&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        .catch(console.log('ошибка'));
        console.log(res.data.results[0]);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics= (comic)=>{
        return{
            id: comic.id,
            name: comic.title,
            description: comic.description,
            thumbnail: comic.thumbnail.path + '.' +  comic.thumbnail.extension,
            price: comic.prices[0].price
        }
    }

    const _tranformCharacter= (char)=> {
        return {
            id: char.id,
            name: char.name, 
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {error, loading, getAllCharacters, getCharacter, getAllComics, getComic,clearError}
};

export default useMarvelService;