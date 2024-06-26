import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import ActionButtons from "../ActionButtons/ActionButtons";
import FeatureButtons from "../FeatureButtons/FeatureButtons";

export default function Table(props) {
    const { tableBasicColumns } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(
                    "http://localhost/pokedex-app/php/pokemons.php",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const pokemonsData = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: "Tabla de pokemones actualizada",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Asignar un id único a cada fila
                    const dataWithIds = pokemonsData.map((row) => ({
                        ...row,
                        id: row.pok_id,
                    }));

                    setData(dataWithIds);
                } else {
                    // Mostrar alerta de error utilizando SweetAlert2
                    await Swal.fire({
                        title: "Error",
                        text: pokemonsData.error,
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

        fetchPokemonData();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminarlo",
            cancelButtonText: "No, cancelar",
            confirmButtonColor: "#0A8B5E",
            cancelButtonColor: "#DE3C14",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `http://localhost/pokedex-app/php/deletePokemon.php?id=${id}`,
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );
                    const result = await response.json();

                    if (response.ok) {
                        setData(data.filter((item) => item.id !== id));

                        Swal.fire({
                            icon: "success",
                            title: result.success,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: result.error,
                            confirmButtonText: "OK",
                            confirmButtonColor: "gray",
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un error al intentar eliminar el elemento.",
                    });
                }
            }
        });
    };

    const columns = [
        ...tableBasicColumns,
        {
            field: "features",
            headerName: "Características",
            flex: 1,
            renderCell: (params) => {
                const selectedElement = data.find(
                    (element) => element.id === params.row.id
                );
                return <FeatureButtons selectedElement={selectedElement} />;
            },
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params) => {
                const selectedElement = data.find(
                    (element) => element.id === params.row.id
                );
                return (
                    <ActionButtons
                        selectedElement={selectedElement}
                        handleDelete={() => handleDelete(selectedElement.id)}
                    />
                );
            },
        },
    ];
    return (
        <div
            style={{
                background: "white",
                margin: 20,
            }}
        >
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 6 },
                    },
                }}
                pageSizeOptions={[6]}
            />
        </div>
    );
}
