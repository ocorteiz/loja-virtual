import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CardProdutoComponent } from "../../components/card-produto/card-produto.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardProdutoComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  produtosPorCategoria: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.http.get<any[]>('http://localhost:3000/produtos').subscribe({
      next: (produtos) => {
        this.produtosPorCategoria = this.agruparPorCategoria(produtos);
      },
      error: () => {
        console.error('Erro ao tentar carregar dados');
      }
    });
  }

  agruparPorCategoria(produtos: any[]): any {
    return produtos.reduce((acc, produto) => {
      const categoria = produto.categoria;
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(produto);
      return acc;
    }, {});
  }

  categorias(): string[] {
    return Object.keys(this.produtosPorCategoria);
  }

}
