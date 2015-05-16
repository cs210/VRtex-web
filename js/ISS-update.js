$(function(){
  var container;

  var camera, scene, renderer, controls;

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var cx = -2500, cy = 2400;
  init();
  animate();

  function init() {

    container = document.getElementById( 'iss-container' );

    camera = new THREE.PerspectiveCamera( 45, container.clientWidth / 600, 1, 16000 );
    camera.position.z = 100;

    window.player = new THREE.Mesh(new THREE.SphereGeometry(40, 10, 10), new THREE.MeshBasicMaterial({color: 0xee0000}));
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
                  material.opacity = 0.8;
                  material.transparent = false;

//      var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ));
      var mesh = new THREE.Mesh( geometry, material);
      scene.add(mesh);
      scene.add(player);
      player.position = geometry.center();
      render();
    }

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];
    //        controls.target.lookAt( scene.position )


    controls.addEventListener( 'change', render );


    renderer = new THREE.WebGLRenderer({alpha: true, antialias: false, precision: "lowp"});
    renderer.setClearColor( 0xffffff, 0);

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.clientWidth, 600 );
    container.appendChild( renderer.domElement)

    camera.position.x = cx;
    camera.position.y = cy;


    //

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = container.clientWidth / 2;
    windowHalfY = 600 / 2;

    camera.aspect = container.clientWidth / 600;
    camera.updateProjectionMatrix();

    //        renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX - container.offsetLeft ) / 2;
    mouseY = ( event.clientY - windowHalfY - container.offsetTop ) / 2;
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
    t += 0.007;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );

  }

});
