const joinPath = (...segments: string[]): string =>
  segments.filter((segment) => segment.length > 0).join('/');

const toUrl = (path: string): string => `/${path}`;

export const ERROR_ROUTE_SLUGS = {
  badRequest: 'bad-request',
  unauthenticated: 'unauthenticated',
  forbidden: 'forbidden',
  notFound: 'not-found',
  conflict: 'conflict',
  gone: 'gone',
  validationError: 'validation-error',
  locked: 'locked',
  rateLimited: 'rate-limited',
  legalRestriction: 'legal-restriction',
  internalError: 'internal-error',
  badGateway: 'bad-gateway',
  serviceUnavailable: 'service-unavailable',
  gatewayTimeout: 'gateway-timeout',
  offline: 'offline',
  unsupportedBrowser: 'unsupported-browser',
  featureDisabled: 'feature-disabled'
} as const;

export const CORE_TRANSVERSAL_ERROR_SLUGS = [
  ERROR_ROUTE_SLUGS.badRequest,
  ERROR_ROUTE_SLUGS.unauthenticated,
  ERROR_ROUTE_SLUGS.forbidden,
  ERROR_ROUTE_SLUGS.notFound,
  ERROR_ROUTE_SLUGS.conflict,
  ERROR_ROUTE_SLUGS.gone,
  ERROR_ROUTE_SLUGS.validationError,
  ERROR_ROUTE_SLUGS.locked,
  ERROR_ROUTE_SLUGS.rateLimited,
  ERROR_ROUTE_SLUGS.legalRestriction,
  ERROR_ROUTE_SLUGS.internalError,
  ERROR_ROUTE_SLUGS.badGateway,
  ERROR_ROUTE_SLUGS.serviceUnavailable,
  ERROR_ROUTE_SLUGS.gatewayTimeout,
  ERROR_ROUTE_SLUGS.offline,
  ERROR_ROUTE_SLUGS.unsupportedBrowser,
  ERROR_ROUTE_SLUGS.featureDisabled
] as const;

export type CoreTransversalErrorSlug = (typeof CORE_TRANSVERSAL_ERROR_SLUGS)[number];

export const APP_ROUTE_PATHS = {
  auth: {
    root: 'auth',
    register: 'register'
  },
  error: {
    root: 'error',
    ...ERROR_ROUTE_SLUGS
  },
  dashboard: 'dashboard',
  cms: 'cms',
  chat: 'chat',
  files: 'files',
  mail: 'mail',
  taskList: 'task-list',
  formLayout: 'form-layout',
  input: 'input',
  button: 'button',
  table: 'table'
} as const;

const authRegisterPath = joinPath(APP_ROUTE_PATHS.auth.root, APP_ROUTE_PATHS.auth.register);
const errorNotFoundPath = joinPath(APP_ROUTE_PATHS.error.root, APP_ROUTE_PATHS.error.notFound);
const errorInternalPath = joinPath(
  APP_ROUTE_PATHS.error.root,
  APP_ROUTE_PATHS.error.internalError
);

export const APP_ROUTE_REDIRECTS = {
  authDefault: APP_ROUTE_PATHS.auth.register,
  appDefault: APP_ROUTE_PATHS.dashboard,
  errorDefault: APP_ROUTE_PATHS.error.internalError,
  errorNotFound: APP_ROUTE_PATHS.error.notFound,
  fallbackNotFound: errorNotFoundPath
} as const;

export const APP_ROUTE_URLS = {
  root: '/',
  auth: {
    root: toUrl(APP_ROUTE_PATHS.auth.root),
    register: toUrl(authRegisterPath)
  },
  error: {
    root: toUrl(APP_ROUTE_PATHS.error.root),
    internalError: toUrl(errorInternalPath),
    notFound: toUrl(errorNotFoundPath),
    bySlug: (slug: CoreTransversalErrorSlug): string =>
      toUrl(joinPath(APP_ROUTE_PATHS.error.root, slug))
  },
  dashboard: toUrl(APP_ROUTE_PATHS.dashboard),
  cms: toUrl(APP_ROUTE_PATHS.cms),
  chat: toUrl(APP_ROUTE_PATHS.chat),
  files: toUrl(APP_ROUTE_PATHS.files),
  mail: toUrl(APP_ROUTE_PATHS.mail),
  taskList: toUrl(APP_ROUTE_PATHS.taskList),
  formLayout: toUrl(APP_ROUTE_PATHS.formLayout),
  input: toUrl(APP_ROUTE_PATHS.input),
  button: toUrl(APP_ROUTE_PATHS.button),
  table: toUrl(APP_ROUTE_PATHS.table)
} as const;

export const APP_PLACEHOLDER_ROUTE_DEFINITIONS = [
  { path: APP_ROUTE_PATHS.cms, title: 'CMS' },
  { path: APP_ROUTE_PATHS.chat, title: 'Chat' },
  { path: APP_ROUTE_PATHS.files, title: 'Files' },
  { path: APP_ROUTE_PATHS.mail, title: 'Mail' },
  { path: APP_ROUTE_PATHS.taskList, title: 'Task List' },
  { path: APP_ROUTE_PATHS.formLayout, title: 'Form Layout' },
  { path: APP_ROUTE_PATHS.input, title: 'Input' },
  { path: APP_ROUTE_PATHS.button, title: 'Button' },
  { path: APP_ROUTE_PATHS.table, title: 'Table' }
] as const;
