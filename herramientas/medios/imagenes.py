#!/usr/bin/env python3
"""Genera las imágenes de imagenes.json con Lumina-Image-2.0 en la GPU de whitebox: salida/<id>-s<semilla>.png.
Las que ya existen se saltan. En whitebox, con el candado de la GPU:
  flock ~/videogen/gpu.lock ~/videogen/.venv-img/bin/python imagenes.py [id ...]"""
import json, os, sys, time, torch
from diffusers import Lumina2Pipeline
from diffusers.hooks import apply_group_offloading

AQUI = os.path.dirname(os.path.abspath(__file__))
cfg = json.load(open(os.path.join(AQUI, "imagenes.json")))
os.makedirs(os.path.join(AQUI, "salida"), exist_ok=True)
pedidas = set(sys.argv[1:])
destino = lambda i, s: os.path.join(AQUI, "salida", f"{i['id']}-s{s}.png")
trabajos = [(i, s) for i in cfg["imagenes"] for s in cfg["semillas"] if (not pedidas or i["id"] in pedidas) and not os.path.exists(destino(i, s))]
if not trabajos:
    sys.exit("nada que generar")
gpu, cpu = torch.device("cuda"), torch.device("cpu")
pipe = Lumina2Pipeline.from_pretrained("Alpha-VLLM/Lumina-Image-2.0", torch_dtype=torch.bfloat16)
pipe.transformer.enable_group_offload(onload_device=gpu, offload_device=cpu, offload_type="block_level", num_blocks_per_group=1, use_stream=True)
apply_group_offloading(pipe.text_encoder, onload_device=gpu, offload_device=cpu, offload_type="block_level", num_blocks_per_group=2)
pipe.vae.to(gpu)
for i, s in trabajos:
    t = time.time()
    img = pipe(prompt=i["prompt"], negative_prompt=cfg["neg"], width=i["w"], height=i["h"], num_inference_steps=40,
               guidance_scale=4.0, cfg_trunc_ratio=0.25, cfg_normalization=True, generator=torch.Generator("cpu").manual_seed(s)).images[0]
    img.save(destino(i, s))
    print(f"ok {i['id']}-s{s} {img.size} {time.time() - t:.0f}s", flush=True)
