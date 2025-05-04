#!/usr/bin/env python3
"""
Streamlit app to add new products to the PUA site using OpenAI for image variations and descriptions.
"""
import os
import re
import json
import shutil
import subprocess

import streamlit as st
import openai
import requests


def slugify(text: str) -> str:
    """Generate a filesystem- and URL-safe slug from text."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '_', text).strip('_')


def generate_studio_image(input_path: str, output_path: str) -> None:
    """Call OpenAI Image Variation endpoint to generate a studio-style image."""
    with open(input_path, 'rb') as img_file:
        resp = openai.Image.create_variation(
            image=img_file,
            n=1,
            size='1024x1024'
        )
    url = resp['data'][0]['url']
    r = requests.get(url, stream=True)
    r.raise_for_status()
    with open(output_path, 'wb') as out:
        shutil.copyfileobj(r.raw, out)


def generate_description(name: str, materials: str, price: int, labor_hours: float, product_type: str) -> str:
    """Call OpenAI to generate a concise product description in Spanish."""
    prompt = (
        f"Escribe en español una descripción breve y persuasiva para un {product_type[:-1]} llamado '{name}', "
        f"confeccionado con {materials}, con un precio de {price} CLP y {labor_hours} horas de trabajo artesanal. "
        "Máximo dos frases."
    )
    resp = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': prompt}]
    )
    return resp.choices[0].message.content.strip()


def update_data_file(data_file: str, entry_text: str) -> None:
    """Insert a new JS entry before the closing bracket of the data array."""
    with open(data_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    # find closing '];'
    for i, line in enumerate(lines):
        if line.strip() == '];':
            close_idx = i
            break
    else:
        st.error(f"No se encontró el cierre del array en {data_file}")
        return
    # ensure trailing comma
    j = close_idx - 1
    while j >= 0 and not lines[j].strip():
        j -= 1
    if not lines[j].rstrip().endswith(','):
        lines[j] = lines[j].rstrip() + ',\n'
    # indent and insert
    indent = '  '
    entry_lines = [indent + l for l in entry_text.splitlines(keepends=True)]
    updated = lines[:close_idx] + ['\n'] + entry_lines + lines[close_idx:]
    with open(data_file, 'w', encoding='utf-8') as f:
        f.writelines(updated)


def main():
    st.title('PUA - Agregar Nuevo Producto')
    st.markdown('Usa la API de OpenAI para generar una imagen de estudio y descripción, luego actualiza el sitio.')

    openai.api_key = os.getenv('OPENAI_API_KEY', '')
    if not openai.api_key:
        st.error('Define la variable OPENAI_API_KEY antes de continuar.')
        return

    # Input fields
    product_type = st.selectbox('Categoría', ['polerones', 'frajackets', 'colets', 'hogar'])
    name = st.text_input('Nombre del producto')
    price = st.number_input('Precio (CLP)', min_value=0, step=100)
    materials = st.text_area('Materiales (separados por comas)')
    labor_hours = st.number_input('Horas de trabajo', min_value=0.0, step=0.5)
    in_stock = st.checkbox('En stock', value=True)
    uploaded = st.file_uploader('Sube imagen (PNG/JPG)', type=['png', 'jpg', 'jpeg'])

    if st.button('Generar vista previa'):
        if not (name and materials and uploaded):
            st.error('Completa todos los campos y sube una imagen.')
            return
        prod_id = slugify(name)
        ext = os.path.splitext(uploaded.name)[1] or '.png'
        images_dir = os.path.join(os.getcwd(), 'images')
        os.makedirs(images_dir, exist_ok=True)
        orig_path = os.path.join(images_dir, f'{prod_id}{ext}')
        with open(orig_path, 'wb') as f:
            f.write(uploaded.getbuffer())
        studio_path = os.path.join(images_dir, f'{prod_id}_studio{ext}')
        with st.spinner('Generando imagen de estudio...'):
            generate_studio_image(orig_path, studio_path)
        with st.spinner('Generando descripción...'):
            description = generate_description(name, materials, price, labor_hours, product_type)
        st.image([orig_path, studio_path], caption=['Original', 'Estudio'], use_column_width=True)
        st.markdown(f'**Descripción**: {description}')
        entry = json.dumps({
            'id': prod_id,
            'name': name,
            'description': description,
            'price': price,
            'materials': materials,
            'labor_hours': labor_hours,
            'in_stock': in_stock,
            'images': [f'images/{prod_id}_studio{ext}', f'images/{prod_id}{ext}']
        }, ensure_ascii=False, indent=4)
        st.code(entry, language='json')
        if st.button('Agregar al sitio'):
            data_file = os.path.join(os.getcwd(), 'js', 'data', f'{product_type}.js')
            update_data_file(data_file, entry + '\n')
            subprocess.run(['git', 'add', orig_path, studio_path, data_file])
            st.success('Producto agregado y listo para commit.')


if __name__ == '__main__':
    main()