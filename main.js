import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- 1. Configuración de la Escena ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);
scene.fog = new THREE.Fog(0x202025, 10, 50);

// --- 2. Cámara ---
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

// --- 3. Renderizador ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// --- 4. Iluminación ---
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(3, 10, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// --- 5. Suelo (para recibir sombras) ---
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({ color: 0x1a1a1a, depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

// --- 6. Cargar Modelo 3D y Animaciones ---
let mixer;
const loader = new GLTFLoader();
loader.load('assets/Strafe.glb', function (gltf) {
    const model = gltf.scene;
    
    // Ajustar sombras en el modelo
    model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
    });

    // Escalar si el modelo es muy grande o pequeño
    model.scale.set(1, 1, 1); 
    scene.add(model);

    // --- Configurar Animación ---
    const animations = gltf.animations;
    if (animations && animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(animations[0]);
        action.play();
    }

    console.log('Modelo cargado exitosamente');

}, undefined, function (error) {
    console.error('Error cargando el modelo:', error);
});

// --- 7. Controles (OrbitControls) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);
controls.update();

// --- 8. Interacción UI (Botón) ---
document.getElementById('action-btn').addEventListener('click', () => {
    const originalPos = camera.position.clone();
    camera.position.z = 2;
    setTimeout(() => {
        camera.position.z = originalPos.z;
    }, 1000);
});

// --- 9. Bucle de Animación ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    controls.update();
    renderer.render(scene, camera);
}

animate();

// --- 10. Responsividad (Resize) ---
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}