document.getElementById('search-button').addEventListener('click', function() {
    const input = document.getElementById('formId1').value.trim();
    if (input === "") {
        alert("Please enter a Pokemon name.");
        return;
    }
    
    localStorage.setItem('pokemonName', input.toLowerCase())

    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    getPokemonData(input.toLowerCase())

    
    async function getPokemonData(pokemon) {
        try {
            const response = await fetch(`${apiUrl}${pokemon}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
                console.log(response)
            }
            const data = await response.json();
            console.log(data);
            generateHTML(data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function capitalizeWords(string) {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    function getTypes(data){
        text = ''

        for (x in data.types) {
            console.log(data.types[x].type.name)
            text += capitalizeWords( data.types[x].type.name ) + ' '
        }
        return text
    }
    async function getSpecies(data){
        const apiUrl = data.species.url
        try {
            const response = await fetch(`${apiUrl}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
                
            }
            const species = await response.json();
            for(let x in species.genera){
                if (species.genera[x].language.name === 'en'){
                    return species.genera[x].genus
                }
            }
            
        } catch (error) {
            console.error('Error:', error);
        }

    }
    async function generateHTML(data){
        const species = await getSpecies(data)
        document.getElementById('main-content').innerHTML = `
        <div class="pokemon-card">
            <div class="pokemon-name-and-btn-container">
                    <div class="pokemon-name">
                        <h1>${capitalizeWords(data.name)}</h1>
                    </div>
                    <div class="back-btn">
                        <a href="search.html" class="btn btn-primary">
                            Go Back
                        </a>
                    </div>
                </div>
            <div class="sprite-and-data-container">
                <div class="sprite-container">
                    <div class="sprite">
                        <img class="img-fluid" src="${data.sprites.front_default}" alt="Pokemon sprite">
                    </div>
                </div>
                <div class="pokedex-data-container">
                    <div class="left">
                        <div class="pokemon-id">
                            <h2>ID:</h2><span>${data.id}</span>
                        </div>
                        <div class="pokemon-type">
                            <h2>Type:</h2><span>${getTypes(data)}</span>
                        </div>
                        <div class="pokemon-species"><h2>Species:</h2><span>${capitalizeWords(species)}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="pokemon-height">
                            <h2>Height:</h2><span>${data.height}</span>
                        </div>
                        <div class="pokemon-weight">
                            <h2>Weight:</h2><span>${data.weight}</span>
                        </div>
                        <div class="details-button">
                            <a href="/html/details.html">
                                <button id="details-button" class="btn btn-primary" type="button">More details</button>
                            </a>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    
});


