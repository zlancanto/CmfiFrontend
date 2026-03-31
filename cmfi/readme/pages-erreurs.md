# Pages d'erreurs a implementer

Ce document recense les pages d'erreurs a prevoir pour une plateforme complete de gestion de concerts.

Convention proposee:
- `slug` = identifiant fonctionnel de la page
- `route` = route UI suggeree (ex: `/error/<slug>`)

## 1) Noyau transversal (web, backoffice, scanner)

- `bad-request` - Requete invalide (`400`)
- `unauthenticated` - Non authentifie ou session expiree (`401`)
- `forbidden` - Acces interdit (`403`)
- `not-found` - Ressource introuvable (`404`)
- `conflict` - Conflit de donnees ou de version (`409`)
- `gone` - Ressource supprimee (`410`)
- `validation-error` - Donnees invalides (`422`)
- `locked` - Ressource verrouillee (`423`)
- `rate-limited` - Trop de requetes (`429`)
- `legal-restriction` - Indisponible pour raison legale (`451`)
- `internal-error` - Erreur interne (`500`)
- `bad-gateway` - Dependance indisponible (`502`)
- `service-unavailable` - Maintenance ou surcharge (`503`)
- `gateway-timeout` - Timeout service (`504`)
- `offline` - Pas de reseau
- `unsupported-browser` - Navigateur non supporte
- `feature-disabled` - Fonction desactivee (feature flag/licence)

## 2) Auth, identite, roles, tenant

- `login-failed` - Identifiants invalides
- `account-unverified` - Compte non verifie
- `account-locked` - Compte verrouille
- `account-suspended` - Compte suspendu
- `account-deleted` - Compte supprime ou anonymise
- `mfa-required` - MFA obligatoire
- `mfa-failed` - Echec MFA
- `passkey-failed` - Passkey indisponible ou en echec
- `oauth-cancelled` - OAuth annule
- `oauth-failed` - OAuth en erreur
- `password-reset-invalid` - Lien de reset invalide ou expire
- `invite-invalid` - Invitation invalide ou expiree
- `rbac-denied` - Role insuffisant
- `tenant-not-found` - Tenant introuvable
- `tenant-access-denied` - Acces tenant refuse
- `tenant-disabled` - Tenant desactive

## 3) Catalogue concerts, salles, capacite

- `event-not-found` - Concert introuvable
- `event-unpublished` - Concert non publie
- `event-sales-not-open` - Vente pas encore ouverte
- `event-sales-ended` - Vente terminee
- `event-cancelled` - Concert annule
- `event-postponed` - Concert reporte
- `festival-day-unavailable` - Jour ou seance indisponible
- `venue-not-available` - Salle indisponible
- `seatmap-unavailable` - Plan de salle indisponible
- `seat-unavailable` - Siege ou place non disponible
- `seat-hold-expired` - Reservation temporaire expiree
- `zone-quota-exceeded` - Quota zone ou canal depasse
- `vip-allocation-exceeded` - Allocation VIP/invites/presse epuisee
- `accessibility-restricted` - Place PMR non eligible selon regles

## 4) Billetterie, pricing, promo, checkout

- `ticket-type-unavailable` - Type de billet indisponible
- `ticket-limit-reached` - Limite d'achat atteinte
- `price-changed` - Prix mis a jour pendant le panier
- `promo-invalid` - Code promo invalide
- `promo-expired` - Code promo expire
- `promo-limit-reached` - Usage promo atteint
- `giftcard-invalid` - Gift card invalide
- `giftcard-insufficient` - Solde gift card insuffisant
- `wallet-insufficient` - Solde wallet insuffisant
- `bundle-unavailable` - Bundle ou pass indisponible
- `waitlist-full` - Liste d'attente complete
- `waitlist-token-invalid` - Jeton waitlist invalide
- `cart-expired` - Panier expire
- `queue-required` - File d'attente obligatoire
- `queue-token-invalid` - Jeton de file invalide ou expire
- `checkout-session-expired` - Session checkout expiree
- `bot-detected` - Activite suspecte anti-bot

## 5) Paiements et finance

- `payment-declined` - Paiement refuse
- `payment-auth-failed` - 3DS/SCA echoue ou annule
- `payment-provider-unavailable` - PSP indisponible
- `payment-timeout` - Paiement en timeout
- `payment-duplicate` - Tentative de double paiement
- `payment-pending` - Paiement en attente de confirmation
- `refund-failed` - Remboursement echoue
- `refund-not-eligible` - Remboursement non autorise
- `chargeback-locked` - Commande bloquee (chargeback/fraude)
- `invoice-unavailable` - Facture ou avoir indisponible
- `payout-blocked` - Reversement bloque (KYC/compliance)

## 6) Jour J et controle d'acces (scanner)

- `ticket-invalid` - Ticket invalide
- `ticket-already-used` - Ticket deja scanne
- `ticket-refunded-or-cancelled` - Ticket rembourse ou annule
- `ticket-wrong-event` - Ticket non valable pour cet evenement/date
- `zone-access-denied` - Zone ou porte non autorisee
- `reentry-denied` - Re-entree refusee
- `blacklisted-attendee` - Participant blacklist
- `capacity-reached` - Capacite atteinte
- `scanner-offline` - Scanner hors ligne
- `sync-conflict` - Conflit de synchronisation scanner

## 7) Support, conformite, data, integrations, plateforme

- `order-not-found` - Commande introuvable
- `support-action-denied` - Action support non autorisee
- `audit-log-unavailable` - Journal d'audit indisponible
- `privacy-request-in-progress` - Requete RGPD deja en cours
- `privacy-export-failed` - Export donnees perso echoue
- `privacy-deletion-failed` - Suppression compte echouee
- `retention-policy-restricted` - Donnee non accessible (retention)
- `campaign-send-failed` - Campagne email/SMS/push en echec
- `api-key-invalid` - Cle API invalide ou revoquee
- `api-scope-denied` - Scope API insuffisant
- `partner-quota-exceeded` - Quota partenaire depasse
- `webhook-signature-invalid` - Signature webhook invalide
- `integration-unavailable` - Integration externe indisponible
- `schema-version-unsupported` - Version API non supportee
- `degraded-mode` - Mode degrade (incident plateforme)
- `read-only-mode` - Plateforme temporairement en lecture seule

