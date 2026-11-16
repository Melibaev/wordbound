#!/bin/bash
# Self-healing tunnel for the status page. Reconnects forever and publishes the CURRENT tunnel host to the git branch
# `status-url` (file url.json) so https://melibaev.github.io/wordbound/status.html#k=KEY always finds it.
# Usage: bash tools/status_tunnel.sh   (needs tools/status_server.py running on 8790)
T="${TEMP:-/tmp}"; REPO="/d/English/.models/statusrepo"
if [ ! -d "$REPO/.git" ]; then
  git clone -q --depth 1 https://github.com/Melibaev/wordbound.git "$REPO" && cd "$REPO" && git checkout -q --orphan status-url && git rm -rfq . 2>/dev/null
fi
publish() { cd "$REPO" && echo "{\"url\":\"$1\",\"t\":$(date +%s)}" > url.json && git add url.json && git -c user.name=WORDBOUND -c user.email=noreply@example.com commit -qm "tunnel $(date +%H:%M)" && git push -q --force origin HEAD:status-url; }
while true; do
  rm -f "$T/tunnel.log"
  ssh -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=15 -o ServerAliveCountMax=2 -o ExitOnForwardFailure=yes -R 80:127.0.0.1:8790 nokey@localhost.run > "$T/tunnel.log" 2>&1 &
  SSHPID=$!
  for i in $(seq 1 30); do sed 's/\x1b\[[0-9;]*m//g' "$T/tunnel.log" | grep -aq "tunneled with" && break; sleep 2; done
  URL=$(sed 's/\x1b\[[0-9;]*m//g' "$T/tunnel.log" | grep -aoE "https://[a-z0-9]+\.(app\.)?lhr\.life" | head -1)
  [ -n "$URL" ] && publish "$URL" && echo "$URL" > "$T/tunnelurl.txt"
  # watchdog: leave when ssh dies or the public URL stops answering 3 times in a row
  BAD=0
  while kill -0 $SSHPID 2>/dev/null; do
    sleep 20
    if curl -s -m 12 -o /dev/null -w "%{http_code}" "$URL/status.json" | grep -q "^403$"; then BAD=0; else BAD=$((BAD+1)); fi
    [ $BAD -ge 3 ] && break
  done
  kill $SSHPID 2>/dev/null; sleep 3
done
