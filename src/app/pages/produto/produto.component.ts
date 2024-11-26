import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent implements OnInit {
  @Input() produto: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.getProduto(id)
  }

  getProduto(id: string | null): void {
    this.http.get<any[]>(`http://localhost:3000/produtos/${id}`).subscribe({
      next: (data) => {
        this.produto = data
      },
      error: () => {
        console.error('Erro ao tentar carregar dados');
      }
    });
  }

  adicionarAoCarrinho(): void {
    if(this.produto) {
      const produtoComId = {
        ...this.produto,
        id: Date.now() + Math.floor(Math.random() * 1000).toString(), // Gera um ID único com base no tempo atual e número aleatório
      };

      this.http.post('http://localhost:3000/carrinho', produtoComId).subscribe({
        next: () => {
          console.log('Produto adicionado ao carrinho')
          this.router.navigate(['/carrinho'])
        },
        error: (error) => {
          console.error('Erro ao tentar adicionar produto: ', error);
        }
      })
    }
  }

}
