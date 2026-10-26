#!/bin/bash
# Clips del sitio con Wan 2.2 TI2V-5B (Apache-2.0) en whitebox, desde fotos reales del taller (Immich) o
# imágenes de Lumina. Uso: videos.sh <clave.png> <prompt.txt> <salida.mp4> <cuadros> <ancho> <alto>
# las rutas deben ser absolutas: el script se mueve a ~/videogen
cd ~/videogen && . .venv/bin/activate
PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True flock ~/videogen/gpu.lock python wan_i2v.py "$1" "$2" "$3" "$4" 40 "$5" "$6"
