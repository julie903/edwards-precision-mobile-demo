Edwards Precision Mobile v0.9 - Office Home Screen integration

Upload only these four files into the ROOT of the public GitHub repository julie903/edwards-precision-mobile-demo, replacing existing same-named files:
- auth-test.html
- index.html
- manifest.webmanifest
- sw.js

Do not upload a containing folder. No changes to Render, Entra or the PRIVATE backend. No tokens or real jobs.
Open https://julie903.github.io/edwards-precision-mobile-demo/auth-test.html?v=09 to verify. The existing Home Screen icon should open the sign-in app after web app manifest refresh; if it is still cached, open the above direct link or reinstall the icon after checking.

This release reuses the already-registered auth-test.html redirect URI and the tested v0.8 backend.

No live Smartsheet connection or production operation editing. Factory security requires separate employee testing later.
