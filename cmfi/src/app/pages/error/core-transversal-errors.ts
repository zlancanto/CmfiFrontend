export const CORE_TRANSVERSAL_ERROR_SLUGS = [
  'bad-request',
  'unauthenticated',
  'forbidden',
  'not-found',
  'conflict',
  'gone',
  'validation-error',
  'locked',
  'rate-limited',
  'legal-restriction',
  'internal-error',
  'bad-gateway',
  'service-unavailable',
  'gateway-timeout',
  'offline',
  'unsupported-browser',
  'feature-disabled'
] as const;

export type CoreTransversalErrorSlug = (typeof CORE_TRANSVERSAL_ERROR_SLUGS)[number];

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
    slug: 'bad-request',
    title: 'Requete invalide',
    description: 'La requete ne respecte pas le format attendu par le service.',
    httpCode: 400,
    severity: 'warn',
    icon: 'pi pi-exclamation-triangle'
  },
  {
    slug: 'unauthenticated',
    title: 'Non authentifie',
    description: 'La session est absente ou expiree, une nouvelle connexion est necessaire.',
    httpCode: 401,
    severity: 'warn',
    icon: 'pi pi-user-minus'
  },
  {
    slug: 'forbidden',
    title: 'Acces interdit',
    description: "L'utilisateur est authentifie mais n'a pas les permissions requises.",
    httpCode: 403,
    severity: 'danger',
    icon: 'pi pi-lock'
  },
  {
    slug: 'not-found',
    title: 'Ressource introuvable',
    description: "La ressource demandee n'existe pas ou n'est plus accessible.",
    httpCode: 404,
    severity: 'warn',
    icon: 'pi pi-search-minus'
  },
  {
    slug: 'conflict',
    title: 'Conflit de donnees',
    description: 'Un conflit de version ou de synchronisation empeche la validation.',
    httpCode: 409,
    severity: 'warn',
    icon: 'pi pi-sync'
  },
  {
    slug: 'gone',
    title: 'Ressource supprimee',
    description: 'La ressource a ete retiree de maniere definitive.',
    httpCode: 410,
    severity: 'warn',
    icon: 'pi pi-trash'
  },
  {
    slug: 'validation-error',
    title: 'Donnees invalides',
    description: 'Les informations transmises ne passent pas les controles metier.',
    httpCode: 422,
    severity: 'warn',
    icon: 'pi pi-times-circle'
  },
  {
    slug: 'locked',
    title: 'Ressource verrouillee',
    description: 'La ressource est temporairement verrouillee et ne peut pas etre modifiee.',
    httpCode: 423,
    severity: 'warn',
    icon: 'pi pi-lock'
  },
  {
    slug: 'rate-limited',
    title: 'Trop de requetes',
    description: "Le quota de requetes est depasse, merci de patienter avant de reessayer.",
    httpCode: 429,
    severity: 'warn',
    icon: 'pi pi-clock'
  },
  {
    slug: 'legal-restriction',
    title: 'Restriction legale',
    description: 'Le contenu est indisponible pour des raisons legales ou geographiques.',
    httpCode: 451,
    severity: 'danger',
    icon: 'pi pi-ban'
  },
  {
    slug: 'internal-error',
    title: 'Erreur interne',
    description: "Une erreur interne inattendue s'est produite sur la plateforme.",
    httpCode: 500,
    severity: 'danger',
    icon: 'pi pi-exclamation-circle'
  },
  {
    slug: 'bad-gateway',
    title: 'Dependance indisponible',
    description: 'Le service en amont repond de maniere invalide.',
    httpCode: 502,
    severity: 'danger',
    icon: 'pi pi-server'
  },
  {
    slug: 'service-unavailable',
    title: 'Service indisponible',
    description: 'La plateforme est en maintenance ou en surcharge temporaire.',
    httpCode: 503,
    severity: 'danger',
    icon: 'pi pi-wrench'
  },
  {
    slug: 'gateway-timeout',
    title: 'Timeout service',
    description: "Le delai d'attente depasse la limite de traitement du service.",
    httpCode: 504,
    severity: 'danger',
    icon: 'pi pi-stopwatch'
  },
  {
    slug: 'offline',
    title: 'Mode hors ligne',
    description: 'Aucune connexion reseau detectee pour contacter la plateforme.',
    severity: 'info',
    icon: 'pi pi-wifi'
  },
  {
    slug: 'unsupported-browser',
    title: 'Navigateur non supporte',
    description: 'Le navigateur actuel ne supporte pas les fonctionnalites requises.',
    severity: 'warn',
    icon: 'pi pi-desktop'
  },
  {
    slug: 'feature-disabled',
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
