from PIL import Image, ImageDraw, ImageFont
import os

width, height = 1200, 630
img = Image.new('RGB', (width, height), color='#1a1a2e')
draw = ImageDraw.Draw(img)

# Load logo
logo = Image.open(os.path.join('public', 'images', 'logo.webp'))
logo_ratio = 180 / logo.width
logo_resized = logo.resize((int(logo.width * logo_ratio), int(logo.height * logo_ratio)))
logo_x = (width - logo_resized.width) // 2
logo_y = 120

if 'A' in logo_resized.getbands():
    img.paste(logo_resized, (logo_x, logo_y), logo_resized)
else:
    img.paste(logo_resized, (logo_x, logo_y))

# Subtitle
font_path = 'C:/Windows/Fonts/arial.ttf'
if os.path.exists(font_path):
    font_sub = ImageFont.truetype(font_path, 28)
    font_small = ImageFont.truetype(font_path, 16)
else:
    font_sub = ImageFont.load_default()
    font_small = font_sub

subtitle = 'Inteligencia Imobiliaria em Alto Padrao'
draw.text((width // 2, 380), subtitle, fill='#8899aa', font=font_sub, anchor='mt')

# Divider line
draw.line([(300, 460), (900, 460)], fill='#334455', width=1)

# Bottom text
bottom = 'SAO JOSE | CAMPINAS | FLORIANOPOLIS'
draw.text((width // 2, 490), bottom, fill='#556677', font=font_small, anchor='mt')

# Save
output_path = os.path.join('public', 'og-image.jpg')
img.save(output_path, 'JPEG', quality=85)
size = os.path.getsize(output_path)
print(f'OG image created: {output_path} ({size} bytes)')
