import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./StatsCard.module.css";

const StatsCard = ({ selectedElement }) => {
    const [stats, setStats] = useState(null);

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
                    await Swal.fire({
                        title: "Error",
                        text: statsData.error,
                        icon: "error",
                        confirmButtonText: "OK",
                        confirmButtonColor: "gray",
                    });
                }
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error en la consulta",
                    confirmButtonColor: "gray",
                });
            }
        };

        fetchPokemonStats();
    }, [selectedElement]);

    return (
        <div className={styles.statsCard}>
            {stats ? (
                <>
                    <div className={styles.pokemonName}>
                        <h2>
                            {selectedElement.pok_name} #{selectedElement.pok_id}
                        </h2>
                        <img
                            src="https://i.pinimg.com/originals/ed/d7/2b/edd72be48d41170cc2ee61a6c8f46657.png"
                            alt="Sin imagen"
                        />
                    </div>
                    <p>Altura: {stats.pok_height} [dm]</p>
                    <p>Peso: {stats.pok_weight} [hg]</p>
                    <p>
                        Puntos de experiencia base: {stats.pok_base_experience}
                    </p>
                    <p>Puntos de vida: {stats.b_hp}</p>
                    <p>Puntos de ataque: {stats.b_atk}</p>
                    <p>Puntos de defensa: {stats.b_def}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StatsCard;
