import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

    private userService = inject(UserService);
    private router =inject(Router);
    private route = inject(ActivatedRoute);

    users: Iuser[] = [];
    loading = false;
    currentPage: number = 1;
    perPage: number = 10;
    totalPages: number = 1;
    total: number = 0;

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.currentPage = Number(params['page']) || 1;
  this.loadUsers();
        });
    }

    loadUsers(): void {
        this.loading = true;
        this.userService.getUsers(this.currentPage).subscribe({
            next: (response) => {
                this.users = response.results;
                this.total = response.total;
                this.perPage = response.per_page;
                this.totalPages = response.total_pages;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error cargando usuarios', err);
                this.loading = false;
            }
        });
        }
      goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) {
            return;
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: page },
            queryParamsHandling: 'merge',
        });
      }}
