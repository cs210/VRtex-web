$(function(){
   var container;

   var camera, scene, renderer, controls;

   var mouseX = 0, mouseY = 0;

   var cx = -2500, cy = 2400;
   init();
   animate();

   function init() {

      container = document.getElementById( 'iss-container' );

      camera = new THREE.PerspectiveCamera( 45, $(container).parent().width() / 550, 1, 16000 );
      camera.position.z = 100;

      // scene
      scene = new THREE.Scene();

      var ambient = new THREE.AmbientLight( 0x404040 );
      scene.add( ambient );
      var hx = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8)
      scene.add(hx);
      scene.fog = new THREE.Fog(0x274297, 1200, 14000);

      var directionalLight = new THREE.DirectionalLight( 0xffeedd );
      directionalLight.position.set( 0, 0, 1 );
      scene.add( directionalLight );


      // load ascii model
      var jsonLoader = new THREE.JSONLoader();
      jsonLoader.load( "ISS_JS.js", createScene );
      // load binary model
      console.log("Loading Mesh");
      function createScene( geometry, materials ) {
         console.log("LOADED!");

         $("#helix").hide("slow" ,function(){ $("#helix").remove(); } );

         var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true});
         material.opacity = 0.2;
         material.transparent = true;

         //      var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ));
         var mesh = new THREE.Mesh( geometry, material);
         scene.add(mesh);
         jsonLoader.load("js/shuttle.js", function(geom, mat){
            var shuttleMat = new THREE.MeshBasicMaterial({color: 0xee0000});
            shuttleMat.opacity = 0.7;
            shuttleMat.transparent = true;
            window.player = new THREE.Mesh(geom, shuttleMat );
            window.player.scale.x = player.scale.y = 0.2;
            window.player.scale.z = 0.2

            window.player.rotateY(-Math.PI/2);

            scene.add(window.player);
            window.player.position = geometry.center();
            render();
         });
      }

      var astromat = new THREE.MeshBasicMaterial({color: 0xeeee00})
      astromat.opacity = 0.7;
      astromat.transparent = true;
      window.addAstronaut = function(PX, PY, PZ){
         var astro = new THREE.Mesh(new THREE.SphereGeometry(80, 4,5), astromat );
         astro.position.x = PX;
         astro.position.y = PY;
         astro.position.z = PZ;
         scene.add(astro);
         return astro;
      }


      renderer = new THREE.WebGLRenderer({alpha: true, antialias: false, precision: "lowp"});
      renderer.setClearColor( 0xffffff, 0);

      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( $(container).parent().width(), 550 );
      container.appendChild( renderer.domElement)

      camera.position.x = cx;
      camera.position.y = cy;
      //
      window.addEventListener( 'resize', onWindowResize, false );

   }

   function onWindowResize() {
      camera.aspect = $(container).parent().width() / 550;
      camera.updateProjectionMatrix();
      //        renderer.setSize( window.innerWidth, window.innerHeight );

   }


   //

   function animate() {
      requestAnimationFrame( animate );
      //controls.update();
      render();
   }

   var radius = 3600;
   var t = 0;
   function render() {
      camera.position.x = scene.position.x + radius * Math.cos(t);
      camera.position.z = scene.position.z + radius * Math.sin(t);
      t += 0.004;
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
   }

});
