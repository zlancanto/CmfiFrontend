export const ROLE_USERS = ['CUSTOMER', 'ORGANIZER'] as const;

export type RoleUser = (typeof ROLE_USERS)[number];
