Edwards Precision Mobile - Authenticated role-based UI test (21-11-2026)

UPLOAD ONLY auth-test.html to the root of the EXISTING GitHub repository:
  julie903/edwards-precision-mobile-demo
This replaces only the existing auth-test.html file.
DO NOT upload README.txt unless you want the instructions in a public repository.

Open in Safari:
  https://julie903.github.io/edwards-precision-mobile-demo/auth-test.html

Uses the previously configured Microsoft Entra SPA redirect URI.
No Microsoft Entra changes should be required for this test.

Expected behaviour:
- Sign in with existing Microsoft 365 company account.
- App verifies tid claim and supported role claim.
- SDNR.Authoriser sees Office preview + disabled SDNR authorisation placeholder.
- Office sees Office preview, without SDNR issue permission.
- Factory sees Factory preview, without Office-only features.
- Fictional jobs have details views, all read-only.
- More page provides sign-out.

SECURITY LIMITATIONS:
- Public GitHub Pages source is not an access-controlled hosting service.
- The role checks are UI-only, and MUST NOT be used as sole protection for sensitive data.
- No real customer data, Smartsheet, QBO, confidential documents, or API secrets are included.
- Any future API must independently validate access tokens, tenant, audience, roles and Julie-only SDNR authority.
- A user with JavaScript debugging tools can change their browser UI; there is nothing sensitive here to gain.
