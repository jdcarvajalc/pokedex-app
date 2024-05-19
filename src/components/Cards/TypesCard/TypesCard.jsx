import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./TypesCard.module.css";
import { getColorByType } from "../../../utils/getColorByType";
import { modifyNumberByID } from "../../../utils/modifyNumberByID";
import { getIconByType } from "../../../utils/getIconByType";

const TypesCard = ({ setOpen, selectedElement }) => {
    const [types, setTypes] = useState(null);
    const [sprite, setSprite] = useState(null);

    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch(
                    `http://localhost/pokedex-app/php/pokemonTypes.php?id=${selectedElement.id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setTypes(data);
                } else {
                    setOpen(false);
                    await Swal.fire({
                        title: "Error",
                        text: data.error,
                        icon: "error",
                        confirmButtonText: "OK",
                        confirmButtonColor: "gray",
                    });
                }
            } catch (error) {
                setOpen(false);
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error en la consulta",
                    confirmButtonColor: "gray",
                });
            }
        };

        const fetchPokeAPISprite = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${selectedElement.pok_name}`
                );
                const data = await response.json();

                if (response.ok) {
                    setSprite(
                        data.sprites.other["official-artwork"].front_default
                    );
                } else {
                    console.error("Error fetching sprite:", data);
                }
            } catch (error) {
                console.error("Error fetching sprite:", error);
            }
        };

        fetchPokemonTypes();
        fetchPokeAPISprite();
    }, [selectedElement]);

    return (
        <div className={styles.typesCard}>
            {types ? (
                <>
                    <div className={styles.pokemonName}>
                        <h2>
                            {selectedElement.pok_name} N°
                            {modifyNumberByID(selectedElement.pok_id)}
                        </h2>
                        <img src={sprite} alt="Sin imagen" />
                    </div>
                    <div className={styles.pokemonStats}>
                        <div className="statContainer">
                            <label>Altura</label>
                            <p> {types.pok_height} dm</p>
                        </div>
                        <div className="statContainer">
                            <label>Peso</label>
                            <p> {types.pok_weight} hg</p>
                        </div>
                        <div className="statContainer">
                            <label>Puntos de experiencia base</label>
                            <p> {types.pok_base_experience}</p>
                        </div>
                        <div className="statContainer">
                            <label>Tipos</label>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {types.types.map((type, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor:
                                                getColorByType(type),
                                            color: "white",
                                            fontSize: 24,
                                            fontWeight: "bold",
                                            margin: "5px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 8,
                                            borderRadius: 20,
                                            width: 130,
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "white",
                                                margin: "0 10px",
                                                padding: "5px",
                                                display: "flex",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <img
                                                src={getIconByType(type)}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    margin: 0,
                                                }}
                                            />
                                        </div>
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Espere por favor</p>
            )}
        </div>
    );
};

export default TypesCard;
