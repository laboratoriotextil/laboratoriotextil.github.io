#!/usr/bin/env python3
"""
Script to automate adding a new product to the static site.
Generates a studio-style image via OpenAI, creates a description, updates the JS data file,
saves images, and stages changes for git.
"""
import os
import re
import sys
import argparse
import json
import shutil
import subprocess

import openai
import requests


def slugify(text):
    # Lowercase, keep alphanum and spaces, replace spaces with underscore
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '_', text).strip('_')

def generate_studio_image(input_path, output_path):
    """Use OpenAI Image Variation endpoint to create a studio-like image."""
    with open(input_path, 'rb') as img_file:
        response = openai.Image.create_variation(
            image=img_file,
            n=1,
            size="1024x1024"
        )
    url = response['data'][0]['url']
    r = requests.get(url, stream=True)
    r.raise_for_status()
    with open(output_path, 'wb') as out:
        shutil.copyfileobj(r.raw, out)
    return output_path

def generate_description(name, materials, price, labor_hours, product_type):
    prompt = (
        f"Escribe en español una descripción breve y persuasiva para un {product_type[:-1]} llamado '{name}', "
        f"confeccionado con {materials}, con un precio de {price} CLP y {labor_hours} horas de trabajo artesanal. "
        "Máximo dos frases."
    )
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.choices[0].message.content.strip().replace('"', '\\"')

def update_data_file(data_file, entry_text):
    # Read lines
    with open(data_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    # Find closing array
    close_idx = None
    for i, line in enumerate(lines):
        if line.strip() == '];':
            close_idx = i
            break
    if close_idx is None:
        print(f"Couldn't find closing bracket in {data_file}")
        sys.exit(1)
    # Ensure previous entry ends with comma
    j = close_idx - 1
    while j >= 0 and lines[j].strip() == '':
        j -= 1
    if not lines[j].rstrip().endswith(','):
        lines[j] = lines[j].rstrip() + ',\n'
    # Insert new entry
    indent = '  '
    entry_lines = [indent + line for line in entry_text.splitlines(keepends=True)]
    # prepend comma if not present
    entry_lines[0] = entry_lines[0].lstrip()
    lines.insert(close_idx, '\n')
    for idx, l in enumerate(entry_lines, start=close_idx+1):
        lines.insert(idx, l)
    # Write back
    with open(data_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)

def main():
    parser = argparse.ArgumentParser(description="Add a new product to the PUA site.")
    parser.add_argument('--type', required=True, choices=['polerones', 'frajackets', 'colets', 'hogar'],
                        help='Product category')
    parser.add_argument('--name', required=True, help='Product name')
    parser.add_argument('--price', type=int, required=True, help='Price in CLP')
    parser.add_argument('--materials', required=True, help='Materials description')
    parser.add_argument('--labor', type=float, required=True, help='Labor hours')
    parser.add_argument('--in-stock', action='store_true', help='Mark product as in stock')
    parser.add_argument('--image', required=True, help='Path to input image')
    args = parser.parse_args()

    openai.api_key = os.getenv('OPENAI_API_KEY')
    if not openai.api_key:
        print('Please set the OPENAI_API_KEY environment variable')
        sys.exit(1)

    prod_id = slugify(args.name)
    images_dir = os.path.join(os.getcwd(), 'images')
    os.makedirs(images_dir, exist_ok=True)

    # Copy original image
    ext = os.path.splitext(args.image)[1] or '.png'
    orig_dest = os.path.join(images_dir, f"{prod_id}{ext}")
    shutil.copyfile(args.image, orig_dest)

    # Generate studio image
    studio_dest = os.path.join(images_dir, f"{prod_id}_studio{ext}")
    print('Generating studio image...')
    generate_studio_image(orig_dest, studio_dest)

    # Generate description
    print('Generating product description...')
    desc = generate_description(args.name, args.materials, args.price, args.labor, args.type)

    # Build JS entry
    entry = json.dumps({
        "id": prod_id,
        "name": args.name,
        "description": desc,
        "price": args.price,
        "materials": args.materials,
        "labor_hours": args.labor,
        "in_stock": args.in_stock,
        "images": [f"images/{prod_id}_studio{ext}", f"images/{prod_id}{ext}"]
    }, ensure_ascii=False, indent=4)

    data_file = os.path.join(os.getcwd(), 'js', 'data', f"{args.type}.js")
    print(f'Updating data file: {data_file}')
    update_data_file(data_file, entry + '\n')

    # Stage files
    subprocess.run(['git', 'add', orig_dest, studio_dest, data_file], check=False)
    print('Product added and staged for commit.')

if __name__ == '__main__':
    main()