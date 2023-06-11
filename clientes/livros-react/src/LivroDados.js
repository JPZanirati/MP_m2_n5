import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ControleLivros from "../src/controle/ControleLivros";


function LivroDados() {
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [codEditora, setCodEditora] = useState("");
    const [autores, setAutores] = useState("");
    const navigate = useNavigate();

    const incluir = async () => {
        const livro = {
            _id: "",
            titulo: titulo,
            resumo: resumo,
            codEditora: codEditora,
            autores: autores.split(","),
        };

        const controleLivros = new ControleLivros();
        await controleLivros.incluir(livro).then(() => {
            navigate("/");
        });
    };

    return (
        <div className="container">
            <h1>Cadastro de Livro</h1>
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Resumo</label>
                <textarea
                    className="form-control"
                    id="resumo"
                    value={resumo}
                    onChange={(e) => setResumo(e.target.value)}
                />
            </div>
            <div className="mb-3 d-flex flex-column align-items-start">
                <label className="form-label">Editora</label>
                <select
                    className="form-select"
                    id="editora"
                    value={codEditora}
                    onChange={(e) => setCodEditora(parseInt(e.target.value))}
                >
                    <option value={1}>Alta Books</option>
                    <option value={2}>Pearson</option>
                    <option value={3}>Novatec Editora</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Autores (1 por linha)</label>
                <textarea
                    className="form-control"
                    id="autores"
                    value={autores}
                    onChange={(event) => setAutores(event.target.value)}
                />
            </div>

            <button type="submit" onClick={incluir} className="btn btn-primary">
                Incluir
            </button>
        </div>
    );
}

export default LivroDados;