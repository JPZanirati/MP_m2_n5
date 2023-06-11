import { Component, OnInit } from '@angular/core';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = [];

  constructor(
    private controleEditoraService: ControleEditoraService,
    private controleLivrosService: ControleLivrosService
  ) {}

  ngOnInit(): void {
    this.controleLivrosService.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir(codigo: string): void {
    this.controleLivrosService.excluir(codigo).then(() => {
      this.controleLivrosService.obterLivros().then((livros) => {
        this.livros = livros;
      });
    });
  }
  obterNome = (codEditora: number): string => {
    return this.controleEditoraService.getNomeEditora(codEditora);
  };
}
