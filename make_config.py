#!/usr/bin/env python3
"""Locally generate tenant-restricted Azure SWA config. No secrets accepted or saved."""
import json,sys,uuid
from pathlib import Path
if len(sys.argv)!=2:
    sys.exit('Usage: python3 make_config.py <Microsoft Entra tenant ID>')
try: tenant=str(uuid.UUID(sys.argv[1]))
except ValueError: sys.exit('Tenant ID must be a valid UUID')
root=Path(__file__).parent
config=json.loads((root/'staticwebapp.config.TEMPLATE.json').read_text())
config['auth']['identityProviders']['azureActiveDirectory']['registration']['openIdIssuer']=f'https://login.microsoftonline.com/{tenant}/v2.0'
(root/'staticwebapp.config.json').write_text(json.dumps(config,indent=2)+'\n')
print('Created staticwebapp.config.json for supplied tenant. No credentials saved.')
