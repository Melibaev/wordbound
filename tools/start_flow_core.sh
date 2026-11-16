#!/bin/bash
# Start the flow-mcp core standalone with short pauses between Flow jobs (default is 25-70 s = slow for videos).
# Usage: bash tools/start_flow_core.sh   (then pipeline.py talks to http://127.0.0.1:8787)
cd /c/Users/Laptop/flow-mcp
export FLOW_MCP_PAUSE_MIN_S=6 FLOW_MCP_PAUSE_MAX_S=14 FLOW_MCP_PIPELINE=1 FLOW_MCP_DEBUG=1
(tail -f /dev/null | node dist/index.js > "${TEMP:-/tmp}/flowcore.log" 2>&1 &)
sleep 8; curl -s -m 5 http://127.0.0.1:8787/api/health; echo
