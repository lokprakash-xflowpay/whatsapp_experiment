

## Flow Endpoint Docs

Refer to the [docs here for implementing your Flow Endpoint](https://developers.facebook.com/docs/whatsapp/flows/guides/implementingyourflowendpoint)
```
node src/keyGenerator.js {passphrase}
```
1. Click on the file ".env" on the left sidebar, **then click on `✏️ Plain text` on top. Do not edit it directly from UI as it will break your key formatting.**
2. Edit it with your private key and passphrase. Make sure a multiline key has the same line breaks like below. Env variables are only visible to the owner of the Glitch project. **Use a separate private key for testing only, and not your production key.**
```
PASSPHRASE="my-secret"

PRIVATE_KEY="-----[REPLACE THIS] BEGIN RSA PRIVATE KEY-----
MIIE...
...
...xyz
-----[REPLACE THIS] END RSA PRIVATE KEY-----"
```

3. Edit `src/flow.js` with your logic to navigate between the Flow screens.
4. Click on the `Logs` tab at the bottom to view server logs. The logs section also has a button to attach a debugger via Chrome devtools.
