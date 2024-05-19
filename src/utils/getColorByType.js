// Función que asigna un color dependiendo del valor de 'type_name'
export const getColorByType = (typeName) => {
    switch (typeName) {
        case "water":
            return "#5090D6"; // Color para 'water'
        case "dragon":
            return "#0B6DC3"; // Color para 'dragon'
        case "electric":
            return "#F4D23C"; // Color para 'electric'
        case "fairy":
            return "#EC8FE6"; // Color para 'fairy'
        case "ghost":
            return "#5269AD"; // Color para 'ghost'
        case "fire":
            return "#FF9D55"; // Color para 'fire'
        case "ice":
            return "#73CEC0"; // Color para 'ice'
        case "grass":
            return "#63BC5A"; // Color para 'grass'
        case "bug":
            return "#91C12F"; // Color para 'bug'
        case "fighting":
            return "#C22E28"; // Color para 'fighting'
        case "normal":
            return "#919AA2"; // Color para 'normal'
        case "dark":
            return "#5A5465"; // Color para 'dark'
        case "steel":
            return "#5A8EA2"; // Color para 'steel'
        case "rock":
            return "#C5B78C"; // Color para 'rock'
        case "psychic":
            return "#FA7179"; // Color para 'psychic'
        case "ground":
            return "#D97845"; // Color para 'ground'
        case "poison":
            return "#B567CE"; // Color para 'poison'
        case "flying":
            return "#89AAE3"; // Color para 'flying'
        default:
            return "#A8A77A"; // Color por defecto
    }
};
