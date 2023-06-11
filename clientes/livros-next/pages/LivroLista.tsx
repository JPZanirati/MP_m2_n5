import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Menu from "../components/Menu";
import Livro from "@/classes/modelo/Livros";
import LinhaLivro from "@/components/LinhaLivro";
import ControleLivros from "../classes/controle/ControleLivros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const carregarLivros = async () => {
      const controleLivros = new ControleLivros();
      const livros = await controleLivros.obterLivros();
      setLivros(livros);
      setCarregado(true);
    };

    carregarLivros();
  }, []);

  const excluir = async (codigo: string) => {
    const controleLivros = new ControleLivros();
    await controleLivros
      .excluir(codigo)
      .then(() => {
        setCarregado(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Lista de Livros</title>
      </Head>
      <div></div>
      <Menu />
      <main className="container">
        <h1>Catálogo de Livros</h1>

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro
                key={index.toString()}
                livro={livro}
                codigo={livro._id ?? ""}
                excluir={() => excluir(livro._id ? livro._id.toString() : "")}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
