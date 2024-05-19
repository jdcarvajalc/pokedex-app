// src/utils/getIconByType.js
import bug from "../icons/bug.svg";
import dark from "../icons/dark.svg";
import dragon from "../icons/dragon.svg";
import electric from "../icons/electric.svg";
import fairy from "../icons/fairy.svg";
import fighting from "../icons/fighting.svg";
import fire from "../icons/fire.svg";
import flying from "../icons/flying.svg";
import ghost from "../icons/ghost.svg";
import grass from "../icons/grass.svg";
import ground from "../icons/ground.svg";
import ice from "../icons/ice.svg";
import normal from "../icons/normal.svg";
import poison from "../icons/poison.svg";
import psychic from "../icons/psychic.svg";
import rock from "../icons/rock.svg";
import steel from "../icons/steel.svg";
import water from "../icons/water.svg";

const icons = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
};

export const getIconByType = (type) => icons[type] || null;
