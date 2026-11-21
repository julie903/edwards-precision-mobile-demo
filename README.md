# Edwards Precision Mobile - secured staging build (21-11-2026)

**Status: NOT DEPLOYED. NOT connected to live data.** This package contains only fictional work orders. It is a staging scaffold for Azure Static Web Apps, not a functioning production app.

## What changed
- Removed the demonstration Office/Factory role switch. Display role now comes from Azure Static Web Apps `/.auth/me` and must include `office` or `factory`.
- Removed demo service worker and offline caches. Do **not** re-enable offline caching for business data without a security review.
- Added a Microsoft Entra tenant-specific identity provider config template. The default Azure provider is broader than company-only and is **not suitable**.
- Static route access requires named `office` or `factory` role. This is only a **staging UI access gate**, not a backend data authorisation mechanism.
- No real data, Microsoft 365 documents, Smartsheet token or API endpoints are present.

## Administrator prerequisites (do not email or paste secrets into ChatGPT)
1. Control of the Edwards Precision **Microsoft Entra tenant** and approved Azure subscription.
2. An Azure Static Web App created for a **staging** environment.
3. A **single-tenant** Microsoft Entra App Registration configured for that web app; register the Azure Static Web Apps login callback `https://YOUR-SITE/.auth/login/aad/callback` in the approved identity app.
4. Configure application settings `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` in Azure. Set the secret only in Azure settings, not in the app folder, source control, a message or ZIP.
5. Run `python3 make_config.py <TENANT_UUID>` to produce the deployment config; inspect it before uploading. If the file has not been generated, **do not deploy**.
6. Assign users the named `office` or `factory` roles with an approved role-management approach, after testing revocation. Do not grant the `office` role to factory users by default. Finance and SDNR authorisation require separate server checks, not just these roles.
7. Deploy this folder as static content to the staging Static Web App (using your approved CI/CD process or latest SWA CLI). Keep the environment private to test users.
8. Test sign-in, tenant restriction, an unauthorised account, role switching attempts, sign-out, revoke-user access, and physical iPhone Safari before installing with **Share > Add to Home Screen**.

## Hard release gates
- This build contains **no live API**. Server-side policy must validate user identity, job-level access, write permissions, and audit all mutations before Smartsheet data is exposed.
- **SDNR issue/sign** remains a distinct Julie-only permission, checked server-side against a specific identity; no client role is sufficient.
- **Personal devices**: agree Microsoft Conditional Access / app protection, device-loss response and employee exit policy before processing real customer/employee data.
- Only after an administrator confirms secure hosting can the app be installed on an iPhone; ZIP files cannot be directly installed as iOS apps.

## Verified in this environment
JSON and Python syntax, JavaScript syntax with Node (when available), absence of secret values and live endpoints, reference assets, archive extraction and checksums.
Not verified: actual Azure sign-in, roles, tenant app registration, deployed HTTPS behaviour or physical iPhone.
