import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  @Input() produto: any;

  constructor(private router: Router) {}

  verificarLogin(): boolean {
    const cliente = localStorage.getItem('user');
    return cliente !== null;
  }

  redirecionar(id: string): void {
    if (this.verificarLogin()) {
      this.router.navigate(['/produto', id]);
    } else {
      console.log('Cliente não está logado');
      this.router.navigate(['/register']);
    }
  }
}
