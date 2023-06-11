import React, { useState, useEffect } from "react";
import LinhaLivro from "../src/modelo/Livros";
import ControleLivros from "../src/controle/ControleLivros";

function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const controleLivros = new ControleLivros();
            const livros = await controleLivros.obterTodos();
            setLivros(livros);
            setCarregado(true);
        }

        fetchData();
    }, []);

    const excluir = async (codigo) => {
        const controleLivros = new ControleLivros();
        await controleLivros.excluir(codigo).then(() => {
            setCarregado(false);
        });
    };

    return (
        <div>
            {!carregado ? (
                <p>Carregando...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Título</th>
                            <th>Autores</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <LinhaLivro
                                key={index}
                                codigo={livro.codigo.toString()}
                                titulo={livro.titulo}
                                autores={livro.autores}
                                excluir={excluir}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LivroLista;