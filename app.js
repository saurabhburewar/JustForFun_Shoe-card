// Shoe Model
// "Nike Air Zoom Pegasus 36" by quaz30 is licensed under Creative Commons Attribution. 
// https://skfb.ly/6QWO6 To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.


//intro page animations
const tl = gsap.timeline({ defaults: { ease: "power1.out" }});

tl.to(".text", { y: '0%', duration: 1, stagger: 0.25 });
tl.to('.intro', { y: "-100%", duration: 1.5, delay: 1 });

//Variables
let container;
let scene;
let camera;
let renderer;
let shoe;

function init() {
    container = document.querySelector('.shoe');

    //Scene
    scene = new THREE.Scene();

    //Camera
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.set(0, 0, 3.5);

    //Ambient light
    const ambient = new THREE.AmbientLight(0x404040, 6);
    scene.add(ambient);

    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load('./shoe_model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        shoe = gltf.scene.children[0];
        shoe.rotation.z = 1.5;
        renderer.render(scene, camera);
    })
}

//Make shoe Responsive
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener("resize", onWindowResize);

const card = document.querySelector(".card");
const description = document.querySelector(".description");

//Rotate shoe
function animate() {
    animate_id = requestAnimationFrame(animate);
    shoe.rotation.z += 0.005;
    renderer.render(scene, camera);
}
card.addEventListener("mouseenter", () => {
    animate();
});
card.addEventListener("mouseleave", () => {
    cancelAnimationFrame(animate_id);
});

//Animate description
description.addEventListener("mouseenter", () => {
    description.style.transform = "translateZ(100px)";
});
description.addEventListener("mouseleave", () => {
    description.style.transform = "translateZ(0px)";
});

init();