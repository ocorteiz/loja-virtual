import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    email: '',
    senha: ''
  };

  errors: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.errors = []

    if (!this.user.email) {
      this.errors.push("Email não pode estar vazio")
      return
    }

    if (!this.user.senha) {
      this.errors.push("Senha não pode estar vazia")
      return
    }

    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe({
      next: (users) => {
        console.log('Usuários retornados da API:', users);
        const foundUser = users.find(
          (user) => user.email == this.user.email && user.senha == this.user.senha
        );
        console.log(foundUser)
        if (foundUser) {
          localStorage.setItem('user', JSON.stringify(foundUser));
          this.router.navigate(['/']);
        } else {
          this.errors.push("Credenciais invalidas")
        }
      },
      error: () => {
        console.error('Erro ao acessar o servidor');
        alert('Erro ao tentar fazer login');
      }
    });
  }
}
