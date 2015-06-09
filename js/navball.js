$(function(){
  var container;

  var camera, scene, renderer, controls;


  var cx = 350, cy = 0;
  init();
  animate();


  function init() {

    container = document.getElementById( 'direction-container' );

    camera = new THREE.PerspectiveCamera( 42, 1, 1, 16000 );

    // scene
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x404040 );
    scene.add( ambient );
    var hx = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8)
    scene.add(hx);

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );


    // load ascii model
//    var jsonLoader = new THREE.JSONLoader();
//    jsonLoader.load( "ISS_JS.js", createScene );
    // load binary model
    console.log("Loading Mesh");
    var MLoader = new THREE.TextureLoader();
    MLoader.load('navballtex.png', function(mat){
      console.log("mat");
      var navmat = new THREE.MeshBasicMaterial({map: mat});
      window.sphere = new THREE.Mesh(new THREE.SphereGeometry(100,52, 32), navmat);
      scene.add(window.sphere);
      render();
    });



    renderer = new THREE.WebGLRenderer({alpha: true, antialias: false, precision: "lowp"});
    renderer.setClearColor( 0xffffff, 0);

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.clientWidth, 600 );
    container.appendChild( renderer.domElement)

    camera.position.x = cx;
    camera.position.y = cy;

    //        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setSize($(container).width(), $(container).width());
  }
  //

  function animate() {

    requestAnimationFrame( animate );
    //controls.update();
    render();
  }

  var radius = 200;
  function render() {
    camera.lookAt( scene.position );
    renderer.render( scene, camera );

  }

});
