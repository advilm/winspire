import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene(); //displaying the scence = container

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
 //parameters: field of view in degrees, 
 //aspect ratio based of browers window, 
 //view frustrum (which objects are visable relative to camera position)

const renderer = new THREE.WebGLRenderer({ //renderer makes magic happen
  canvas: document. querySelector('#bg'), 
  //renderer needs to know which dom element to use - canvas with an ID of bg
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera); //rednder = draw

//background is black
//make object using geometry or a set of vectors to define the object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//make material, wrapping paper for object
const material = new THREE.MeshStandardMaterial({color: 0x6D326D});
//mesh geometry + material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); //bring the ring to the scene

//add light to screen  because MeshStandardMaterial allows for light to bounce off
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//listen to dom events on the mouse and update camera
// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.OctahedronGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xFF00FF})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('background3.jpg');
scene.background = spaceTexture;

const boxTexture = new THREE.TextureLoader().load('oprah.jpg');


const box = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: boxTexture }));

scene.add(box);



const gailTexture = new THREE.TextureLoader().load('Gail Hanson.webp');


const gail = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: gailTexture }));

scene.add(gail);


const obamaTexture = new THREE.TextureLoader().load('michelle_obama.jpg');


const obama = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: obamaTexture }));

scene.add(obama);



const ballTexture = new THREE.TextureLoader().load('earth5.jpg');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshPhongMaterial({map: ballTexture})
);
scene.add(ball);

// const g = new THREE.SphereGeometry(0.5,100,100);
// const m = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('eyeballmap.jpg',THREE.SphericalRefractionMapping) } );
// const eyeball = new THREE.Mesh( g, m );
// eyeball.overdraw = true;
// eyeball.castShadow = true;
// scene.add( eyeball );

box.position.z = 30;
box.position.setX(-10);

ball.position.z = -5;
ball.position.x = 2;

gail.position.z = 5;
gail.position.x = 4;
gail.position.y = -1;

obama.position.z = 20
obama.position.x = -5;
obama.position.y = -1;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  gail.rotation.y += 0.01;
  gail.rotation.z += 0.01;

  obama.rotation.y += 0.01;
  obama.rotation.z += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
//recursive function that calls render method automatically
  requestAnimationFrame(animate); //when brower repaints screen, it calls render method to update UI

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  ball.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera); 

  //game loop
}

animate();

