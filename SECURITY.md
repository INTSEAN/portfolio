# Credential security

This is a static Vite portfolio. The contact form submits to Web3Forms; it does
not require Gmail SMTP credentials or a Node email server. The obsolete SMTP
server has been removed, including its hardcoded credential and credential
logging. Do not restore it or create a replacement Gmail app password for this
website.

Keep secrets in the deployment provider's server-side secret store when a future
server-side feature needs them. Local `.env` files are ignored. Any variable
prefixed with `VITE_` is exposed to visitors in the built frontend and must not
contain a password, private API key, or other secret. Web3Forms access keys are
designed for use in public forms; enable its domain restrictions and spam
protection in the Web3Forms dashboard.

## Previously exposed credential

Removing a secret from the current source does not remove it from earlier Git
commits, forks, downloaded copies, or provider logs. Revocation is the essential
containment step. The previously exposed Gmail app password has been revoked;
never reuse it. Also review any retained hosting logs that may have captured the
old server's credential logging and remove those logs through the provider.

History cleanup, if needed, requires a coordinated Git history rewrite and force
push. Prepare a backup, coordinate with collaborators, and follow GitHub's
sensitive-data removal process before doing it. A rewrite cannot make a leaked
credential safe to reuse.
