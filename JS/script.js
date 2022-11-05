const namePokemon = document.querySelector('.pokemon_name')
const numberPokemon = document.querySelector('.pokemon_number')
const imagePokemon = document.querySelector('.pokemon_image')
const pokeTypes = document.querySelector(".pokemon_type")


const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttomPrev = document.querySelector('.btn-prev')
const buttomNext = document.querySelector('.btn-next')

const typeColors = {
    electric: '#FFFF0A',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

/** Variable paran incrementar con los botones*/
let searchPokemon= 1;


/* función para buskeda del pokemon en la api*/
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data=  await APIResponse.json();
        return data;
    }
}
/*Función para mostrar en el Html los datos del json*/
const renderPokemon = async (pokemon) => {
    namePokemon.innerHTML= "Loading..."
    const data = await fetchPokemon(pokemon);
    const{ types } = data;
    console.log(types)

    if(data){
        namePokemon.innerHTML = data.name;
        numberPokemon.innerHTML = data.id;
        imagePokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        renderPokemonTypes(types);
        searchPokemon = data.id;
       
    }else{
        namePokemon.innerHTML = "Not found";
        numberPokemon.innerHTML = "0";
        imagePokemon.src = "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
    }

    input.value=''
   
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ' ';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}


/*Funsion para enviar los pokemon  solicitados*/
form.addEventListener('submit',(event) =>{
    event.preventDefault(); 

    renderPokemon(input.value.toLowerCase());
   
});

buttomPrev.addEventListener('click',() =>{
    if (searchPokemon >1 ){
   searchPokemon -= 1;
   renderPokemon(searchPokemon);}

});

buttomNext.addEventListener('click',() =>{
   searchPokemon += 1;
    renderPokemon(searchPokemon);
 });

renderPokemon(searchPokemon);