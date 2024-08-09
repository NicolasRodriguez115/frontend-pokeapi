document.addEventListener('DOMContentLoaded', function() {
    const maxNumber = 120;
    const attributes = document.querySelectorAll('.attribute');

    attributes.forEach(attribute => {
        const percentNumberElement = attribute.querySelector('.attribute-percent-number');
        const percentElement = attribute.querySelector('.attribute-percent');

        const percentNumber = parseInt(percentNumberElement.textContent, 10);
        const widthPercentage = (percentNumber / maxNumber) * 100;


        percentElement.style.width = widthPercentage + '%';

        if (percentNumber < 29){
            percentElement.style.backgroundColor = "#f34444";
        } else if (percentNumber < 59){
            percentElement.style.backgroundColor = "#ff7f0f";
        } else if (percentNumber < 89){
            percentElement.style.backgroundColor = "#ffdd57";
        } else if (percentNumber < 119){
            percentElement.style.backgroundColor = "#a0e515";
        } else {
            percentElement.style.backgroundColor = "#23cd5e";
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const pokemonName = localStorage.getItem('pokemonName');
    if (!pokemonName) {
        console.error('No Pokemon name found in localStorage')
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error fetching data')
        }
        const data = await response.json();
        updatePokemonStats(data);
    } catch (error) {
        console.error('Error:', error);
    }

});

function updatePokemonStats(data) {
    document.querySelector('.pokemon-name h1').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.querySelector('.sprite img').src = data.sprites.front_default;

    const stats = data.stats;
    const statsMap = {
        'hp': 'HP',
        'attack': 'Attack',
        'defense': 'Defense',
        'special-attack': 'Sp. Atk',
        'special-defense': 'Sp. Def',
        'speed': 'Speed'
    }
    const maxNumber = 120;
    const attributes = document.querySelectorAll('.attribute');

    stats.forEach(stat => {
        const statName = statsMap[stat.stat.name];
        const statValue = stat.base_stat;
        const statElements = document.querySelectorAll(`.attribute-name`);

        statElements.forEach(statElement => {
            if (statElement.textContent.trim() === statName) {
                const parentElement = statElement.parentElement;
                const percentElement = parentElement.querySelector('.attribute-percent');
                const percentNumberElement = parentElement.querySelector('.attribute-percent-number');

                
                const widthPercentage = (statValue / maxNumber) * 100;

                percentElement.style.width = `${widthPercentage}%`;
                percentNumberElement.textContent = statValue;

                if (statValue < 29) {
                    percentElement.style.backgroundColor = "#f34444";
                } else if (statValue < 59) {
                    percentElement.style.backgroundColor = "#ff7f0f";
                } else if (statValue < 89) {
                    percentElement.style.backgroundColor = "#ffdd57";
                } else if (statValue < 119) {
                    percentElement.style.backgroundColor = "#a0e515";
                } else {
                    percentElement.style.backgroundColor = "#23cd5e";
                }
            }
        });
    });
}