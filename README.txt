EDWARDS PRECISION MOBILE - MICROSOFT SIGN-IN TEST

Purpose:
- Test Microsoft Entra single-tenant sign-in and display account + app role.
- Separate from the existing working public demonstration.
- No Smartsheet, QuickBooks, company data, user management or backend access.

Steps:
1. Entra > App registrations > Edwards Precision Mobile > Authentication (Preview)
   Add another Single-page application redirect URI (retain existing root URI):
   https://julie903.github.io/edwards-precision-mobile-demo/auth-test.html
2. GitHub repo julie903/edwards-precision-mobile-demo > Add file > Upload files:
   Upload ONLY auth-test.html to repository root. Commit changes.
3. Open:
   https://julie903.github.io/edwards-precision-mobile-demo/auth-test.html
4. Click Sign in with Microsoft 365.
5. Check displayed account and roles. Expected role: SDNR.Authoriser.
6. If consent/assignment errors appear, stop and inspect rather than approving new permissions.

IMPORTANT:
- GitHub Pages is PUBLIC. This page displays only the account name and role in the local browser.
- This does not implement protected backend access or enforce authorisation.
- This MSAL v2 Microsoft-hosted CDN is used for a limited sign-in test, not a production dependency.
- Do not upload secrets, token screenshots, work data or any employee list.
