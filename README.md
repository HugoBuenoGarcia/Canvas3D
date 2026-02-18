# 🧊 Canvas3D
Este proyecto es una exploración profunda de la **computación gráfica en tres dimensiones**. Utiliza el elemento `<canvas>` de HTML5 para renderizar entornos 3D, gestionando transformaciones espaciales, cámaras y proyecciones matemáticas.

## 🌟 Características principales
* **Renderizado 3D:** Visualización de geometrías complejas en un entorno tridimensional.
* **Proyección de Perspectiva:** Implementación de algoritmos para transformar coordenadas 3D  en un plano 2D .
* **Control de Cámara:** Sistema de navegación para rotar, trasladar y hacer zoom sobre la escena.
* **Sombreado y Luces:** (Si aplica) Implementación de modelos de iluminación básicos para dar volumen a los objetos.

## 🛠️ Stack Tecnológico
* **Motores:** WebGL / [Three.js](https://threejs.org/) (o Vanilla JS si es un motor propio).
* **Lenguaje:** JavaScript (ES6+).
* **Matemáticas:** Matrices de transformación, cuaterniones y vectores.

## 📐 Fundamentos Matemáticos
El núcleo de este proyecto se basa en la **matriz de proyección**, encargada de simular la profundidad en una pantalla plana:

## 📂 Estructura del Proyecto
* `/assets`: Archivos de mallas o definiciones de objetos 3D.
* `/`: Lógica principal del motor, cámaras y escena.

## 🚀 Instalación y Despliegue
1. **Clona el repo:**
```bash
git clone https://github.com/HugoBuenoGarcia/Canvas3D.git

```

2. **Lánzalo:**
Si usas módulos de JS, recuerda servirlo a través de un servidor local:
```bash
npx serve .

```

## ✒️ Autor
* **Hugo Bueno García** - [GitHub](https://www.google.com/search?q=https://github.com/HugoBuenoGarcia)
