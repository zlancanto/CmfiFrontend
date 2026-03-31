import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  CORE_TRANSVERSAL_ERRORS_BY_SLUG,
  CoreTransversalErrorDefinition,
  CoreTransversalErrorSlug
} from './core-transversal-errors';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink, ButtonModule],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss'
})
export class ErrorPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly error = this.resolveError();

  private resolveError(): CoreTransversalErrorDefinition {
    const routeSlug = this.route.snapshot.data['slug'] as CoreTransversalErrorSlug | undefined;

    if (routeSlug && routeSlug in CORE_TRANSVERSAL_ERRORS_BY_SLUG) {
      return CORE_TRANSVERSAL_ERRORS_BY_SLUG[routeSlug];
    }

    return CORE_TRANSVERSAL_ERRORS_BY_SLUG['internal-error'];
  }
}
