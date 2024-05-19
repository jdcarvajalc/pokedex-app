import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./StatsCard.module.css";
import { modifyNumberByID } from "../../../utils/modifyNumberByID";

const StatsCard = ({ setOpen, selectedElement }) => {
    const [stats, setStats] = useState(null);
    const [sprite, setSprite] = useState(null);

    useEffect(() => {
        const fetchPokemonStats = async () => {
            try {
                const response = await fetch(
                    `http://localhost/pokedex-app/php/pokemonStats.php?id=${selectedElement.id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const statsData = await response.json();

                if (response.ok) {
                    setStats(statsData);
                } else {
                    setOpen(false);
                    await Swal.fire({
                        title: "Error",
                        text: statsData.error,
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

        fetchPokemonStats();
        fetchPokeAPISprite();
    }, [selectedElement]);

    return (
        <div className={styles.statsCard}>
            {stats ? (
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
                            <p> {stats.pok_height} dm</p>
                        </div>
                        <div className="statContainer">
                            <label>Peso</label>
                            <p> {stats.pok_weight} hg</p>
                        </div>
                        <div className="statContainer">
                            <label>Puntos de experiencia base</label>
                            <p> {stats.pok_base_experience}</p>
                        </div>
                        <div className="statContainer">
                            <label>Puntos de vida</label>
                            <p> {stats.b_hp}</p>
                        </div>
                        <div className="statContainer">
                            <label>Puntos de ataque</label>
                            <p> {stats.b_atk}</p>
                        </div>
                        <div className="statContainer">
                            <label>Puntos de defensa</label>
                            <p> {stats.b_def}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Espere por favor</p>
            )}
        </div>
    );
};

export default StatsCard;
