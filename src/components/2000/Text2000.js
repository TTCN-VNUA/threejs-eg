import { Font, Vector2, Vector3, PMREMGenerator, UnsignedByteType, CubeTextureLoader, CanvasTexture, RepeatWrapping, MeshPhysicalMaterial, BackSide, Object3D } from 'https://cdn.skypack.dev/three@0.126.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1';
import React, { Suspense, useRef, useState, useMemo, useEffect, useCallback } from 'https://cdn.skypack.dev/react@17.0.1';
import reactThreeFiber, { Canvas, useFrame, useLoader, useUpdate, useThree } from 'https://cdn.skypack.dev/react-three-fiber@5.3.19';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from 'https://cdn.skypack.dev/@react-three/postprocessing@1.5.0';
console.clear();

const fontDef = JSON.parse('{"glyphs":{"0":{"ha":956,"x_min":0,"x_max":0,"o":"m 478 956 b 900 467 729 956 900 736 b 478 -22 900 197 729 -22 b 56 467 224 -22 56 197 b 478 956 56 736 225 956 m 478 222 b 633 467 563 222 633 332 b 478 711 633 601 563 711 b 322 467 393 711 322 601 b 478 222 322 332 393 222 "},"1":{"ha":644,"x_min":0,"x_max":0,"o":"m 544 956 l 544 0 l 278 0 l 278 657 l 78 618 l 78 844 "},"2":{"ha":911,"x_min":0,"x_max":0,"o":"m 56 600 b 435 956 56 769 183 956 b 833 613 676 956 833 814 b 569 244 833 490 742 354 l 856 244 l 856 0 l 56 0 l 456 422 b 564 600 547 519 564 563 b 444 711 564 669 514 711 b 315 578 375 711 315 661 l 56 600 "},"3":{"ha":911,"x_min":0,"x_max":0,"o":"m 722 493 b 856 289 800 456 856 379 b 456 -22 856 150 738 -22 b 56 311 239 -22 56 79 l 322 333 b 465 206 322 240 382 206 b 579 293 532 206 579 243 b 381 389 579 365 506 389 l 381 567 b 567 654 381 567 567 561 b 456 731 567 694 521 731 b 322 611 388 731 326 696 l 78 633 b 456 956 100 846 249 956 b 833 667 700 956 833 817 b 722 493 833 586 789 528 "},"4":{"ha":956,"x_min":0,"x_max":0,"o":"m 900 378 l 900 156 l 789 156 l 789 0 l 522 0 l 522 156 l 56 156 l 56 356 l 456 933 l 789 933 l 789 378 m 522 667 l 344 378 l 522 378 "},"5":{"ha":911,"x_min":0,"x_max":0,"o":"m 500 622 b 856 333 721 622 856 529 b 444 -22 856 111 689 -22 b 56 289 225 -22 56 89 l 332 306 b 456 200 340 246 392 200 b 582 322 525 200 582 254 b 456 422 582 390 525 422 b 344 378 407 422 367 404 l 76 378 l 147 933 l 767 933 l 767 689 l 367 689 l 358 600 b 500 622 404 622 500 622 "},"6":{"ha":911,"x_min":0,"x_max":0,"o":"m 528 667 b 856 356 749 667 856 506 b 456 -22 856 126 693 -22 b 56 364 207 -22 56 115 b 393 933 56 432 71 688 l 789 933 b 438 653 789 933 569 836 b 528 667 438 653 467 667 m 456 222 b 589 333 529 222 589 272 b 456 444 589 394 529 444 b 322 333 382 444 322 394 b 456 222 322 272 382 222 "},"7":{"ha":867,"x_min":0,"x_max":0,"o":"m 878 933 l 456 0 l 144 0 l 478 689 l 56 689 l 56 933 "},"8":{"ha":911,"x_min":0,"x_max":0,"o":"m 736 493 b 856 289 808 458 856 379 b 456 -22 856 118 715 -22 b 56 289 196 -22 56 118 b 175 493 56 379 103 458 b 75 667 103 536 75 603 b 456 956 75 831 233 956 b 836 667 681 956 836 828 b 736 493 836 603 808 536 m 456 733 b 333 644 389 733 333 694 b 456 556 333 594 389 556 b 578 644 522 556 578 594 b 456 733 578 694 522 733 m 456 200 b 589 300 529 200 589 244 b 456 400 589 356 529 400 b 322 300 382 400 322 356 b 456 200 322 244 382 200 "},"9":{"ha":911,"x_min":0,"x_max":0,"o":"m 383 267 b 56 578 163 267 56 428 b 456 956 56 807 218 956 b 856 569 704 956 856 818 b 518 0 856 501 840 246 l 122 0 b 474 281 122 0 342 97 b 383 267 474 281 444 267 m 456 711 b 322 600 382 711 322 661 b 456 489 322 539 382 489 b 589 600 529 489 589 539 b 456 711 589 661 529 711 "},"A":{"ha":1000,"x_min":0,"x_max":0,"o":"m 1011 0 l 740 0 l 681 156 l 319 156 l 260 0 l -11 0 l 375 933 l 625 933 m 603 356 l 500 622 l 397 356 "},"B":{"ha":911,"x_min":0,"x_max":0,"o":"m 721 501 b 878 281 839 475 878 374 b 558 0 878 119 758 0 l 78 0 l 78 933 l 478 933 b 833 689 692 933 833 850 b 721 501 833 596 786 525 m 344 578 l 456 578 b 567 656 526 578 567 601 b 456 733 567 708 526 733 l 344 733 m 478 200 b 611 289 558 200 611 228 b 478 378 611 350 558 378 l 344 378 l 344 200 l 478 200 "},"C":{"ha":911,"x_min":0,"x_max":0,"o":"m 565 222 b 776 317 650 222 726 260 l 878 90 b 558 -22 794 18 668 -22 b 33 467 269 -22 33 197 b 558 956 33 736 269 956 b 878 844 668 956 794 917 l 776 617 b 565 711 726 674 650 711 b 300 467 419 711 300 601 b 565 222 300 332 419 222 "},"D":{"ha":978,"x_min":0,"x_max":0,"o":"m 454 933 b 944 467 775 933 944 725 b 454 0 944 208 767 0 l 78 0 l 78 933 l 454 933 m 478 244 b 678 467 569 244 678 344 b 478 689 678 589 569 689 l 344 689 l 344 244 l 478 244 "},"E":{"ha":756,"x_min":0,"x_max":0,"o":"m 344 689 l 344 578 l 633 578 l 633 356 l 344 356 l 344 244 l 700 244 l 700 0 l 78 0 l 78 933 l 700 933 l 700 689 "},"F":{"ha":733,"x_min":0,"x_max":0,"o":"m 78 0 l 78 933 l 700 933 l 700 689 l 344 689 l 344 578 l 633 578 l 633 356 l 344 356 l 344 0 "},"G":{"ha":1044,"x_min":0,"x_max":0,"o":"m 1003 556 b 1011 467 1008 525 1011 499 b 533 -22 1011 197 810 -22 b 33 467 257 -22 33 197 b 533 956 33 736 257 956 b 965 689 732 956 882 847 l 714 621 b 533 711 671 676 607 711 b 300 467 404 711 300 601 b 533 222 300 332 404 222 b 736 356 624 222 700 274 l 478 356 l 478 556 l 1003 556 "},"H":{"ha":1000,"x_min":0,"x_max":0,"o":"m 922 933 l 922 0 l 656 0 l 656 344 l 344 344 l 344 0 l 78 0 l 78 933 l 344 933 l 344 589 l 656 589 l 656 933 "},"I":{"ha":422,"x_min":0,"x_max":0,"o":"m 78 0 l 78 933 l 344 933 l 344 0 "},"J":{"ha":711,"x_min":0,"x_max":0,"o":"m 656 933 l 656 356 b 261 -22 656 101 500 -22 b 33 67 176 -22 79 15 l 149 276 b 256 222 172 243 211 222 b 389 356 329 222 389 264 l 389 933 "},"K":{"ha":978,"x_min":0,"x_max":0,"o":"m 967 0 l 633 0 l 344 400 l 344 0 l 78 0 l 78 933 l 344 933 l 344 578 l 611 933 l 944 933 l 589 489 "},"L":{"ha":733,"x_min":0,"x_max":0,"o":"m 700 244 l 700 0 l 78 0 l 78 933 l 344 933 l 344 244 "},"M":{"ha":1222,"x_min":0,"x_max":0,"o":"m 1189 0 l 922 0 l 878 489 l 722 0 l 500 0 l 344 489 l 300 0 l 33 0 l 122 933 l 389 933 l 611 378 l 833 933 l 1100 933 "},"N":{"ha":1044,"x_min":0,"x_max":0,"o":"m 967 933 l 967 0 l 700 0 l 344 511 l 344 0 l 78 0 l 78 933 l 344 933 l 700 422 l 700 933 "},"O":{"ha":1089,"x_min":0,"x_max":0,"o":"m 544 956 b 1056 467 826 956 1056 736 b 544 -22 1056 197 826 -22 b 33 467 263 -22 33 197 b 544 956 33 736 263 956 m 544 222 b 789 467 679 222 789 332 b 544 711 789 601 679 711 b 300 467 410 711 300 601 b 544 222 300 332 410 222 "},"P":{"ha":889,"x_min":0,"x_max":0,"o":"m 500 933 b 856 622 743 933 856 803 b 544 289 856 442 742 289 l 344 289 l 344 0 l 78 0 l 78 933 l 500 933 m 475 511 b 589 611 538 511 589 542 b 475 711 589 679 538 711 l 344 711 l 344 511 l 475 511 "},"Q":{"ha":1089,"x_min":0,"x_max":0,"o":"m 1078 0 l 811 0 l 785 35 b 544 -22 713 -1 631 -22 b 33 467 263 -22 33 197 b 544 956 33 736 263 956 b 1056 467 826 956 1056 736 b 935 151 1056 347 1010 236 m 756 343 b 789 467 776 379 789 421 b 544 711 789 601 679 711 b 300 467 410 711 300 601 b 544 222 300 332 410 222 b 629 238 575 222 603 228 l 522 378 l 722 378 l 756 343 "},"R":{"ha":933,"x_min":0,"x_max":0,"o":"m 900 0 l 589 0 l 396 289 l 344 289 l 344 0 l 78 0 l 78 933 l 500 933 b 856 622 743 933 856 803 b 671 314 856 485 789 364 m 475 511 b 589 611 538 511 589 542 b 475 711 589 679 538 711 l 344 711 l 344 511 l 475 511 "},"S":{"ha":889,"x_min":0,"x_max":0,"o":"m 444 610 b 856 304 628 586 856 540 b 433 -22 856 124 733 -22 b 33 117 185 -22 33 117 l 132 329 b 433 222 271 222 433 222 b 589 279 507 219 589 228 b 418 347 589 319 540 328 b 56 653 164 388 56 492 b 458 956 56 817 182 956 b 811 844 458 956 685 956 l 706 644 b 433 711 706 644 619 711 b 322 667 346 711 322 692 b 444 610 322 636 346 622 "},"T":{"ha":822,"x_min":0,"x_max":0,"o":"m 789 933 l 789 689 l 544 689 l 544 0 l 278 0 l 278 689 l 33 689 l 33 933 "},"U":{"ha":1000,"x_min":0,"x_max":0,"o":"m 944 933 l 944 400 b 500 -22 944 154 778 -22 b 56 400 222 -22 56 154 l 56 933 l 344 933 l 344 397 b 500 222 344 281 422 222 b 656 397 578 222 656 281 l 656 933 "},"V":{"ha":1000,"x_min":0,"x_max":0,"o":"m -11 933 l 300 933 l 500 375 l 700 933 l 1011 933 l 633 0 l 367 0 "},"W":{"ha":1422,"x_min":0,"x_max":0,"o":"m 967 378 l 1122 933 l 1422 933 l 1111 0 l 833 0 l 711 444 l 589 0 l 311 0 l 0 933 l 300 933 l 456 378 l 589 933 l 833 933 "},"X":{"ha":1022,"x_min":0,"x_max":0,"o":"m 1011 0 l 697 0 l 511 294 l 325 0 l 11 0 l 328 489 l 35 933 l 349 933 l 511 672 l 674 933 l 988 933 l 694 489 "},"Y":{"ha":956,"x_min":0,"x_max":0,"o":"m 967 933 l 611 378 l 611 0 l 344 0 l 344 378 l -11 933 l 300 933 l 478 644 l 656 933 "},"Z":{"ha":889,"x_min":0,"x_max":0,"o":"m 33 0 l 422 689 l 56 689 l 56 933 l 856 933 l 467 244 l 833 244 l 833 0 "}},"familyName":"Noir Pro Bold","ascender":1311,"descender":-356,"underlinePosition":-104,"underlineThickness":69,"boundingBox":{"yMin":-422,"xMin":-267,"yMax":1600,"xMax":1656},"resolution":1000,"original_font_information":{"format":0,"copyright":"Copyright (c) Milos Mitrovic, 2016. All rights reserved.","fontFamily":"Noir Pro Bold","fontSubfamily":"Regular","uniqueID":"1.000;UKWN;NoirPro-Bold","fullName":"Noir Pro Bold","version":"Version 1.000;PS 001.000;hotconv 1.0.70;makeotf.lib2.5.58329","postScriptName":"NoirPro-Bold","manufacturer":"Mindburger","designer":"Milos Mitrovic","manufacturerURL":"http://www.mindburger.net","designerURL":"http://www.mindburger.net","preferredFamily":"Noir Pro","preferredSubfamily":"Bold"},"cssFontWeight":"normal","cssFontStyle":"normal"}');

const clamp = function(a, b, v) {
  return Math.min(b, Math.max(a, v));
}

const lerp = function(a, b, progress) {
  return a + progress * (b - a);
}

class FlakesTexture {

	constructor( width = 1024, height = 1024, flakes = 4000 ) {

		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		var context = canvas.getContext( '2d' );
		context.fillStyle = 'rgb(127,127,255)';
		context.fillRect( 0, 0, width, height );

		for ( var i = 0; i < flakes; i ++ ) {

			var x = Math.random() * width;
			var y = Math.random() * height;
			var r = Math.random() * 3 + 3;

			var nx = Math.random() * 2 - 1;
			var ny = Math.random() * 2 - 1;
			var nz = Math.random() * 2 - 1;

			var l = Math.sqrt( nx * nx + ny * ny + nz * nz );

			nx /= l; ny /= l; nz /= l;

			context.fillStyle = 'rgb(' + ( nx * 127 + 127 ) + ',' + ( ny * 127 + 127 ) + ',' + ( nz * 255 ) + ')';
			context.beginPath();
			context.arc( x, y, r, 0, Math.PI * 2 );
			context.fill();

		}

		return canvas;

	}

}

const Environment = () => {
  const { gl, scene } = useThree()
  let cubeMap;
  useEffect(() => {
    (async () => {
      const loader = new CubeTextureLoader();
      loader.setPath( 'https://assets.codepen.io/982762/' );
      const cubeMap = await loader.loadAsync( [
          'px.png',
          'nx.png',
          'py.png',
          'ny.png',
          'pz.png',
          'nz.png'
        ] );
      const gen = new PMREMGenerator(gl)
      gen.compileEquirectangularShader()
      const hdrCubeRenderTarget = gen.fromCubemap(cubeMap)
      cubeMap.dispose()
      gen.dispose()
      scene.environment = hdrCubeRenderTarget.texture
      return () => (scene.environment = scene.background = null)
    })()
  }, [cubeMap]);
  return null
}

const Text = ({ 
  children, 
  vAlign = 'center', 
  hAlign = 'center', 
  size = 1, 
  color = '#000000', 
  fontSize = 20,
  height = 5,
  ...props }) => {
  
  const font = new Font(fontDef);
  
  const config = useMemo(
    () => ({ 
      font, 
      size: fontSize, 
      height: height, 
      curveSegments: 32, 
      bevelEnabled: true, 
      bevelThickness: .4, 
      bevelSize: .4, 
      bevelOffset: 0, 
      bevelSegments: 8 }),
    [font]
  )
  
  var normalMap3 = new CanvasTexture( new FlakesTexture() );
  normalMap3.wrapS = RepeatWrapping;
  normalMap3.wrapT = RepeatWrapping;
  normalMap3.repeat.x = .2;
  normalMap3.repeat.y = .3;

  var materialProps = {
    clearcoat: 1.0,
    clearcoatRoughness: 0.125,
    metalness: 0.9,
    roughness: 0.6,
    color: 0x111118,
    normalMap: normalMap3,
    normalScale: new Vector2( 1.2, 2.2 ),
  };
  
  const mesh = useUpdate(
    (self) => {
      const size = new Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

const Boids = ({ count = 200, simspeed = 2 }) => {
  const mesh = useRef()
  const light = useRef()
  const { viewport, mouse } = useThree()
  
  var normalMap3 = new CanvasTexture( new FlakesTexture() );
  normalMap3.wrapS = RepeatWrapping;
  normalMap3.wrapT = RepeatWrapping;
  normalMap3.repeat.x = 5;
  normalMap3.repeat.y = 5;
  
  var emissiveMap = new CanvasTexture( new FlakesTexture() );
  emissiveMap.wrapS = RepeatWrapping;
  emissiveMap.wrapT = RepeatWrapping;
  emissiveMap.repeat.x = 5;
  emissiveMap.repeat.y = 5;

  var materialProps = {
    clearcoat: 1.0,
    clearcoatRoughness: 0.5,
    metalness: 0.9,
    roughness: 0.9,
    color: 0x111118,
    emissiveMap: emissiveMap,
    emissiveIntensity: 5,
    normalMap: normalMap3,
    normalScale: new Vector2( 1.2, 1.2 ),
  };

  const dummy = useMemo(() => new Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 10
      const speed = 0.01 + Math.random() / 20
      const x = -20 + Math.random() * 40
      const y = -10 + Math.random() * 20
      const z = -10
      const phase = Math.random();
      temp.push({ t, speed, phase, mx: 0, my: 0, x, y, z })
    }
    return temp
  }, [count])
  useFrame((state) => {
    light.current.position.set((mouse.x * viewport.width) / 2 * 4, (mouse.y * viewport.height) / 2 * 4, -10)
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, speed, phase, x, y, z } = particle
      particle.t += speed / 2
      const s = Math.cos(particle.t)
      const ph = (particle.t * simspeed * speed + phase) % 1;
      dummy.position.set(
        x + Math.sin(particle.t*10.*speed+phase)*2.,
        lerp(-10, 10, ph),
        z + Math.cos(particle.t*speed+phase)*5.
      );
      const scale = lerp(0, 1, clamp(0, 1, ph * 3)) * lerp(0, 1, clamp(0, 1, (1.-ph) * 3));
      dummy.scale.set(scale, scale, scale)
      dummy.rotation.set(t, t, t)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <pointLight ref={light} distance={10} intensity={10.} />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <octahedronBufferGeometry />
        <meshPhysicalMaterial {...materialProps} />
      </instancedMesh>
    </>
  )
}

let changed = false;
const TwoThousand = () => {
  const ref = useRef()
  useFrame(
    ({ clock }) => {
      ref.current.rotation.x = Math.cos(clock.getElapsedTime()) * 0.4;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.1;
    })
  const [text, setText] = useState("2000")
  
  const keys = ['0','1','2','3','4','5','6','7','8','9'];
  let a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0);
  for (; a <= z; ++a) {
      keys.push(String.fromCharCode(a).toUpperCase());
  }
  
  const addText = (key, add = true) => {
    setText((add&&changed?text:'')+key);
    changed = true;
  }
  const handleKeyDown = useCallback(e => {
    const { key } = e;
    if(keys.indexOf(key.toUpperCase()) > -1) {
      addText(key.toUpperCase());
    } else if(key === "Backspace") {
      addText(text.substr(0,text.length-1), false);
    }
  });
  
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  
  return (
    <group ref={ref} position={[0, 0, -.0]}>
      <Text hAlign="center" children={text} />
    </group>);
}

const Scene = () => {
  // const {
  //   camera,
  //   gl: { domElement }
  // } = useThree()
  return (
    <>
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 0, -10]} intensity={1} />
      <TwoThousand />
      <Boids />
    </>
  )
}

function Text2000(){
    return(
        <Canvas
    colorManagement
    camera={{ z: 3 }}
    gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false }}
    pixelRatio={window.devicePixelRatio} >
    <color 
      attach="background" 
      args={["#080808"]} />
    <fog 
      color="#000000" 
      attach="fog" 
      near={10} 
      far={15} />
    <Suspense fallback={<>Loading.</>}>
      <Environment />
      <Scene />
    </Suspense>
    <EffectComposer>
      <Vignette 
        offset={0.} 
        darkness={1.2} />
      <Bloom 
        luminanceThreshold={.5} 
        luminanceSmoothing={0.1} 
        opacity={2} />
      <Noise opacity={0.125} />
      <DepthOfField 
        focusDistance={.0} 
        focalLength={.02} />
    </EffectComposer>
  </Canvas>
    )
}

export default Text2000;
// ReactDOM.render(
//   <Canvas
//     colorManagement
//     camera={{ z: 3 }}
//     gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false }}
//     pixelRatio={window.devicePixelRatio} >
//     <color 
//       attach="background" 
//       args={["#080808"]} />
//     <fog 
//       color="#000000" 
//       attach="fog" 
//       near={10} 
//       far={15} />
//     <Suspense fallback={<>Loading.</>}>
//       <Environment />
//       <Scene />
//     </Suspense>
//     <EffectComposer>
//       <Vignette 
//         offset={0.} 
//         darkness={1.2} />
//       <Bloom 
//         luminanceThreshold={.5} 
//         luminanceSmoothing={0.1} 
//         opacity={2} />
//       <Noise opacity={0.125} />
//       <DepthOfField 
//         focusDistance={.0} 
//         focalLength={.02} />
//     </EffectComposer>
//   </Canvas>,
//   document.getElementById('root')
// )