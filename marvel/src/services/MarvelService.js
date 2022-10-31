class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '9d851f6efd5df6e480d7941531979b70';

    getResource = async(url) => {
        let res = await fetch(url);
        if(!res.ok)
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        return await res.json();
    }

    getAllCharacters = async ()=>{
        //return this.getResource(`${this._apiBase}characters?limit=9&apikey=${this._apiKey}`);
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=110&apikey=${this._apiKey}`)
        return res.data.results.map(this._tranformCharacter);
    }

    getCharacter = async (id)=>{
        //return this.getResource('https://gateway.marvel.com:443/v1/public/characters/1010829?apikey=9d851f6efd5df6e480d7941531979b70');
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
        return this._tranformCharacter(res.data.results[0]);
    }

    _tranformCharacter= (char)=> {
        return {
            name: char.name, 
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url
        }
    }
};

export default MarvelService;