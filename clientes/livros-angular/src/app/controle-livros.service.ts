import { Injectable } from '@angular/core';
import { Livro } from './livro';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

const baseURL = 'http://localhost:3030/livros';

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  constructor() {}

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL);
    const data: LivroMongo[] = await response.json();
    return data.map((livroMongo) => {
      return {
        codigo: livroMongo._id ? livroMongo._id.toString() : '',
        codEditora: livroMongo.codEditora,
        titulo: livroMongo.titulo,
        resumo: livroMongo.resumo,
        autores: livroMongo.autores,
      };
    });
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(_id: string | null): Promise<boolean> {
    const url = `${baseURL}/${_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    return response.ok;
  }
}
