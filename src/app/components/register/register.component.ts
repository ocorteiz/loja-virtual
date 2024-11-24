import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'cliente'
  };

  errors: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errors = []

    if (!this.user.nome) {
      this.errors.push("Nome não pode estar vazio")
      return
    }

    if (!this.user.email) {
      this.errors.push("Email não pode estar vazio")
      return
    }

    if (!this.user.senha) {
      this.errors.push("Senha não pode estar vazia")
      return
    }

    this.http.post('http://localhost:3000/usuarios', this.user).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso:', response);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('Erro ao cadastrar o usuário:', err);
      }
    });
  }

  nextPage() {
    this.router.navigate(["/login"])
  }
}
