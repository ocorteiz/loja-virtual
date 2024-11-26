import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  produtos: any[] = [];
  total: number = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProdutos()
  }

  getProdutos(): void {
    this.http.get<any[]>('http://localhost:3000/carrinho').subscribe({
      next: (data) => {
        this.produtos = data
        this.calcularTotal()
      },
      error: () => {
        console.error('Erro ao tentar carregar dados');
      }
    });
  }

  removerProduto(id: string): void {
    this.http.delete(`http://localhost:3000/carrinho/${id}`).subscribe({
      next: () => {
        console.log(`Produto com ID ${id} removido do carrinho.`);
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        this.calcularTotal();
        this.getProdutos()
      },
      error: (error) => {
        console.error('Erro ao tentar remover o produto: ', error);
      }
    });
  }

  incrementarQuantidade(produto: any): void {
    produto.quantidade += 1;
    this.atualizarProduto(produto);
  }

  atualizarProduto(produto: any): void {
    this.http.put(`http://localhost:3000/carrinho/${produto.id}`, produto).subscribe({
      next: () => {
        this.calcularTotal();
        this.getProdutos();
        console.log(`Produto com ID ${produto.id} atualizado.`);
      },
      error: (err) => {
        console.error('Erro ao tentar atualizar o produto:', err);
      }
    })
  }

  calcularTotal(): void {
    this.total = this.produtos.reduce((sum, produto) => sum + produto.preco * produto.quantidade, 0);
  }
}
