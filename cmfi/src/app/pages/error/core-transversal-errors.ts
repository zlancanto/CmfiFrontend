import {
  APP_ROUTE_PATHS,
  CoreTransversalErrorSlug
} from '@core/routing/app-route.constants';

export type CoreTransversalErrorDefinition = {
  slug: CoreTransversalErrorSlug;
  title: string;
  description: string;
  httpCode?: number;
  severity: 'info' | 'warn' | 'danger';
  icon: string;
};

export const CORE_TRANSVERSAL_ERRORS: ReadonlyArray<CoreTransversalErrorDefinition> = [
  {
    slug: APP_ROUTE_PATHS.error.badRequest,
    title: 'Requete invalide',
    description: 'La requete ne respecte pas le format attendu par le service.',
    httpCode: 400,
    severity: 'warn',
    icon: 'pi pi-exclamation-triangle'
  },
  {
    slug: APP_ROUTE_PATHS.error.unauthenticated,
    title: 'Non authentifie',
    description: 'La session est absente ou expiree, une nouvelle connexion est necessaire.',
    httpCode: 401,
    severity: 'warn',
    icon: 'pi pi-user-minus'
  },
  {
    slug: APP_ROUTE_PATHS.error.forbidden,
    title: 'Acces interdit',
    description: "L'utilisateur est authentifie mais n'a pas les permissions requises.",
    httpCode: 403,
    severity: 'danger',
    icon: 'pi pi-lock'
  },
  {
    slug: APP_ROUTE_PATHS.error.notFound,
    title: 'Ressource introuvable',
    description: "La ressource demandee n'existe pas ou n'est plus accessible.",
    httpCode: 404,
    severity: 'warn',
    icon: 'pi pi-search-minus'
  },
  {
    slug: APP_ROUTE_PATHS.error.conflict,
    title: 'Conflit de donnees',
    description: 'Un conflit de version ou de synchronisation empeche la validation.',
    httpCode: 409,
    severity: 'warn',
    icon: 'pi pi-sync'
  },
  {
    slug: APP_ROUTE_PATHS.error.gone,
    title: 'Ressource supprimee',
    description: 'La ressource a ete retiree de maniere definitive.',
    httpCode: 410,
    severity: 'warn',
    icon: 'pi pi-trash'
  },
  {
    slug: APP_ROUTE_PATHS.error.validationError,
    title: 'Donnees invalides',
    description: 'Les informations transmises ne passent pas les controles metier.',
    httpCode: 422,
    severity: 'warn',
    icon: 'pi pi-times-circle'
  },
  {
    slug: APP_ROUTE_PATHS.error.locked,
    title: 'Ressource verrouillee',
    description: 'La ressource est temporairement verrouillee et ne peut pas etre modifiee.',
    httpCode: 423,
    severity: 'warn',
    icon: 'pi pi-lock'
  },
  {
    slug: APP_ROUTE_PATHS.error.rateLimited,
    title: 'Trop de requetes',
    description: "Le quota de requetes est depasse, merci de patienter avant de reessayer.",
    httpCode: 429,
    severity: 'warn',
    icon: 'pi pi-clock'
  },
  {
    slug: APP_ROUTE_PATHS.error.legalRestriction,
    title: 'Restriction legale',
    description: 'Le contenu est indisponible pour des raisons legales ou geographiques.',
    httpCode: 451,
    severity: 'danger',
    icon: 'pi pi-ban'
  },
  {
    slug: APP_ROUTE_PATHS.error.internalError,
    title: 'Erreur interne',
    description: "Une erreur interne inattendue s'est produite sur la plateforme.",
    httpCode: 500,
    severity: 'danger',
    icon: 'pi pi-exclamation-circle'
  },
  {
    slug: APP_ROUTE_PATHS.error.badGateway,
    title: 'Dependance indisponible',
    description: 'Le service en amont repond de maniere invalide.',
    httpCode: 502,
    severity: 'danger',
    icon: 'pi pi-server'
  },
  {
    slug: APP_ROUTE_PATHS.error.serviceUnavailable,
    title: 'Service indisponible',
    description: 'La plateforme est en maintenance ou en surcharge temporaire.',
    httpCode: 503,
    severity: 'danger',
    icon: 'pi pi-wrench'
  },
  {
    slug: APP_ROUTE_PATHS.error.gatewayTimeout,
    title: 'Timeout service',
    description: "Le delai d'attente depasse la limite de traitement du service.",
    httpCode: 504,
    severity: 'danger',
    icon: 'pi pi-stopwatch'
  },
  {
    slug: APP_ROUTE_PATHS.error.offline,
    title: 'Mode hors ligne',
    description: 'Aucune connexion reseau detectee pour contacter la plateforme.',
    severity: 'info',
    icon: 'pi pi-wifi'
  },
  {
    slug: APP_ROUTE_PATHS.error.unsupportedBrowser,
    title: 'Navigateur non supporte',
    description: 'Le navigateur actuel ne supporte pas les fonctionnalites requises.',
    severity: 'warn',
    icon: 'pi pi-desktop'
  },
  {
    slug: APP_ROUTE_PATHS.error.featureDisabled,
    title: 'Fonction desactivee',
    description: 'Cette fonctionnalite est desactivee par configuration ou par licence.',
    severity: 'info',
    icon: 'pi pi-power-off'
  }
];

export const CORE_TRANSVERSAL_ERRORS_BY_SLUG: Record<
  CoreTransversalErrorSlug,
  CoreTransversalErrorDefinition
> = CORE_TRANSVERSAL_ERRORS.reduce(
  (accumulator, definition) => {
    accumulator[definition.slug] = definition;
    return accumulator;
  },
  {} as Record<CoreTransversalErrorSlug, CoreTransversalErrorDefinition>
);
