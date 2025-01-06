#!/bin/bash

# Zatrzymaj procesy port-forward
if [ -f backend-port-forward.pid ]; then
    kill $(cat backend-port-forward.pid)
    rm backend-port-forward.pid
fi

if [ -f frontend-port-forward.pid ]; then
    kill $(cat frontend-port-forward.pid)
    rm frontend-port-forward.pid
fi

echo "Port forwarding zatrzymany"
