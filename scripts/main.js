// Wait for everything to load
window.addEventListener('load', function() {
  // Hide loading screen after models are loaded or timeout
  setTimeout(function() {
    document.querySelector('.loading-screen').style.display = 'none';
  }, 6000); // Longer timeout for 6 3D models to load
  
  // Set up tracking status indicators
  setupTrackingIndicators();
  
  // Set up dynamic effects
  setupDynamicEffects();
  
  // Add click interaction to objects
  setupInteractions();
  
  // Setup model loading tracking
  setupModelTracking();
  
  // Setup debug tools for testing
  setupDebugTools();
  
  // Setup model manipulation
  setupModelManipulation();

  // Setup sound system
  setupSoundSystem();
});

// Function to show tracking status
function setupTrackingIndicators() {
  const trackingStatus = document.querySelector('#tracking-status');
  const instructions = document.querySelector('.instructions');
  
  // Listen for marker found/lost events
  document.addEventListener('markerFound', function(e) {
    trackingStatus.style.backgroundColor = '#00ff00';
    
    // Show different instructions based on which marker was found
    const markerId = e.target.id;
    if (markerId === 'astronaut-marker') {
      instructions.textContent = 'Space Explorer: The journey begins with humanity reaching for the stars';
    } else if (markerId === 'space-marker') {
      instructions.textContent = 'The Vast Universe: Endless possibilities await exploration';
    } else if (markerId === 'ufo-marker') {
      instructions.textContent = 'Alien Visitor: We are not alone in this vast cosmos';
    } else if (markerId === 'travel-marker') {
      instructions.textContent = 'Warp Speed: Breaking the barriers of space and time';
    } else if (markerId === 'alien-marker') {
      instructions.textContent = 'Extraterrestrial Life: Different forms of existence beyond Earth';
    } else if (markerId === 'earth-marker') {
      instructions.textContent = 'Our Fragile Home: The blue marble that sustains all life as we know it';
    } else {
      instructions.textContent = 'Space anomaly detected!';
    }
    
    log('Marker found: ' + markerId);
  });
  
  document.addEventListener('markerLost', function(e) {
    trackingStatus.style.backgroundColor = 'red';
    instructions.textContent = 'Scan markers to continue your space journey';
    
    log('Marker lost: ' + e.target.id);
  });
}

// Enhanced dynamic effects
function setupDynamicEffects() {
  // Get all model containers
  const containers = document.querySelectorAll('[id$="-container"]');
  
  containers.forEach(container => {
    const modelId = container.id.replace('-container', '');
    
    // Add subtle hover effect to all models
    const model = container.querySelector('.interactive-model');
    if (model) {
      // Add subtle floating animation based on model type
      if (modelId === 'ufo') {
        // UFO already has floating animation
      } else if (modelId === 'astronaut') {
        model.setAttribute('animation__float', 'property: position; to: 0 0.1 0; loop: true; dir: alternate; dur: 2000; easing: easeInOutSine');
      } else if (modelId === 'alien') {
        model.setAttribute('animation__float', 'property: position; to: 0 0.15 0; loop: true; dir: alternate; dur: 3000; easing: easeInOutSine');
      }
    }
    
    // Add special effects based on model type
    if (modelId === 'earth') {
      // Add orbit satellite
      const satellite = document.createElement('a-sphere');
      satellite.setAttribute('radius', '0.05');
      satellite.setAttribute('color', '#FFFFFF');
      satellite.setAttribute('position', '0.7 0 0');
      satellite.setAttribute('animation', 'property: rotation; to: 0 0 360; loop: true; dur: 5000; easing: linear');
      
      const orbit = document.createElement('a-entity');
      orbit.setAttribute('position', '0 0 0');
      orbit.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear');
      orbit.appendChild(satellite);
      
      container.appendChild(orbit);
    }
  });
}

// Add interactivity to objects
function setupInteractions() {
  // Help card functionality
  const closeHelpBtn = document.getElementById('close-help');
  if (closeHelpBtn) {
    closeHelpBtn.addEventListener('click', function() {
      document.querySelector('.help-card').style.display = 'none';
    });
  }
  
  // Make all models interactive
  document.querySelectorAll('.interactive-model').forEach(model => {
    model.addEventListener('click', function(e) {
      const modelId = e.target.id.split('-')[0];
      log(`Clicked on ${modelId} model`);
      
      // Different effects based on which model was clicked
      if (modelId === 'astronaut') {
        // Astronaut waves or jumps
        model.setAttribute('animation__click', 'property: position; to: 0 0.3 0; dur: 300; easing: easeOutQuad');
        setTimeout(() => {
          model.setAttribute('animation__click', 'property: position; to: 0 0 0; dur: 300; easing: easeInQuad');
        }, 300);
      } else if (modelId === 'ufo') {
        // UFO brightens and spins faster
        const beam = model.parentElement.querySelector('a-cone');
        if (beam) {
          beam.setAttribute('animation__click', 'property: opacity; to: 0.8; dur: 1000; easing: easeInOutQuad');
          setTimeout(() => {
            beam.removeAttribute('animation__click');
          }, 1000);
        }
        
        model.setAttribute('animation__spin', 'property: rotation; to: 0 720 0; dur: 2000; easing: easeInOutQuad');
        setTimeout(() => {
          model.removeAttribute('animation__spin');
        }, 2000);
      } else if (modelId === 'earth') {
        // Earth pulses
        const atmosphere = model.parentElement.querySelector('a-sphere');
        if (atmosphere) {
          atmosphere.setAttribute('animation__click', 'property: opacity; to: 0.4; dur: 1000; easing: easeInOutQuad');
          setTimeout(() => {
            atmosphere.removeAttribute('animation__click');
          }, 1000);
        }
      } else if (modelId === 'space') {
        // Space intensifies
        const stars = model.parentElement.querySelector('[particle-system]');
        if (stars) {
          const currentSettings = stars.getAttribute('particle-system');
          if (currentSettings.particleCount) {
            stars.setAttribute('particle-system', 'particleCount', parseInt(currentSettings.particleCount) * 2);
            setTimeout(() => {
              stars.setAttribute('particle-system', 'particleCount', parseInt(currentSettings.particleCount));
            }, 2000);
          }
        }
      } else if (modelId === 'alien') {
        // Alien glows
        const aura = model.parentElement.querySelector('a-sphere');
        if (aura) {
          aura.setAttribute('animation__click', 'property: opacity; to: 0.5; dur: 1000; easing: easeInOutQuad');
          setTimeout(() => {
            aura.removeAttribute('animation__click');
          }, 1000);
        }
      } else if (modelId === 'travel') {
        // Travel speeds up
        model.setAttribute('animation__click', 'property: rotation; to: 0 720 30; dur: 2000; easing: easeInOutQuad');
        
        const particles = model.parentElement.querySelector('[particle-system]');
        if (particles) {
          const currentSettings = particles.getAttribute('particle-system');
          if (currentSettings.velocityValue) {
            particles.setAttribute('particle-system', 'velocityValue', '0.6 0 0.6');
            setTimeout(() => {
              particles.setAttribute('particle-system', 'velocityValue', '0.3 0 0.3');
            }, 2000);
          }
        }
      }
    });
  });
}

// Track model loading
function setupModelTracking() {
  let modelsLoaded = 0;
  const totalModels = 6; // We have 6 models now
  const loader = document.querySelector('.loader');
  
  // Listen for model loading events
  document.addEventListener('model-loaded', function(e) {
    modelsLoaded++;
    log(`Model loaded: ${modelsLoaded}/${totalModels}`);
    
    if (loader) {
      const progress = (modelsLoaded / totalModels) * 100;
      loader.style.width = `${progress}%`;
    }
    
    if (modelsLoaded >= totalModels) {
      document.querySelector('.loading-screen').style.display = 'none';
    }
  });
  
  // Also track gltf-model loaded events
  document.querySelectorAll('[gltf-model]').forEach(model => {
    model.addEventListener('loaded', function() {
      log(`GLTF model loaded: ${model.id || 'unnamed'}`);
    });
  });
}

// Debugging tools (helpful for mobile testing)
function setupDebugTools() {
  const debugPanel = document.getElementById('debug');
  
  // Show debug panel on triple tap
  let tapCount = 0;
  document.addEventListener('click', function() {
    tapCount++;
    
    if (tapCount === 3) {
      debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
      tapCount = 0;
    }
    
    // Reset tap count after delay
    setTimeout(() => {
      tapCount = 0;
    }, 1000);
  });
}

// Debug logging function
function log(message) {
  console.log(message);
  const debug = document.getElementById('debug');
  if (debug) {
    debug.innerHTML += message + '<br>';
    debug.scrollTop = debug.scrollHeight;
  }
}

// Set up model manipulation (rotation, scaling)
function setupModelManipulation() {
  // Get our scene
  const scene = document.querySelector('a-scene');
  
  // Variables to track interaction
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let activeContainer = null;
  
  // Desktop mouse events
  scene.addEventListener('mousedown', function(event) {
    // Find which model container was clicked
    activeContainer = findActiveContainer(event);
    if (activeContainer) {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  });
  
  scene.addEventListener('mousemove', function(event) {
    if (!isDragging || !activeContainer) return;
    
    // Calculate rotation based on mouse movement
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };
    
    const currentRotation = activeContainer.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    
    // Update rotation (invert X and Y for intuitive control)
    activeContainer.setAttribute('rotation', {
      x: currentRotation.x + (deltaMove.y * 0.5),
      y: currentRotation.y + (deltaMove.x * 0.5),
      z: currentRotation.z
    });
    
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  });
  
  scene.addEventListener('mouseup', function() {
    isDragging = false;
    activeContainer = null;
  });
  
  // Mobile touch events
  scene.addEventListener('touchstart', function(event) {
    // Find which model container was touched
    activeContainer = findActiveContainer(event);
    if (activeContainer) {
      isDragging = true;
      previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
    // Do not prevent default here as it might interfere with other touch events
  });
  
  scene.addEventListener('touchmove', function(event) {
    if (!isDragging || !activeContainer) return;
    
    // Calculate movement
    const deltaMove = {
      x: event.touches[0].clientX - previousMousePosition.x,
      y: event.touches[0].clientY - previousMousePosition.y
    };
    
    const currentRotation = activeContainer.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    
    // Update rotation
    activeContainer.setAttribute('rotation', {
      x: currentRotation.x + (deltaMove.y * 0.5),
      y: currentRotation.y + (deltaMove.x * 0.5),
      z: currentRotation.z
    });
    
    previousMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
    
    // Prevent default scrolling only when manipulating models
    event.preventDefault();
  });
  
  scene.addEventListener('touchend', function() {
    isDragging = false;
    activeContainer = null;
  });
  
  // Add pinch-to-zoom functionality
  let initialDistance = 0;
  let currentScale = {};
  
  scene.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
      initialDistance = getDistance(
        event.touches[0].clientX, event.touches[0].clientY,
        event.touches[1].clientX, event.touches[1].clientY
      );
      
      // Find which model was touched
      activeContainer = findActiveContainer(event);
      if (activeContainer) {
        const model = activeContainer.querySelector('.interactive-model');
        if (model) {
          // Store current scale
          const scale = model.getAttribute('scale');
          currentScale = {
            x: scale.x,
            y: scale.y,
            z: scale.z
          };
        }
      }
    }
  });
  
  scene.addEventListener('touchmove', function(event) {
    if (event.touches.length === 2 && activeContainer) {
      const model = activeContainer.querySelector('.interactive-model');
      if (!model) return;
      
      const currentDistance = getDistance(
        event.touches[0].clientX, event.touches[0].clientY,
        event.touches[1].clientX, event.touches[1].clientY
      );
      
      const scaleFactor = 1 + ((currentDistance - initialDistance) / initialDistance) * 0.2;
      const newScale = {
        x: Math.max(0.05, Math.min(currentScale.x * scaleFactor, 2.0)),
        y: Math.max(0.05, Math.min(currentScale.y * scaleFactor, 2.0)),
        z: Math.max(0.05, Math.min(currentScale.z * scaleFactor, 2.0))
      };
      
      model.setAttribute('scale', `${newScale.x} ${newScale.y} ${newScale.z}`);
      
      // Update for next move
      initialDistance = currentDistance;
      currentScale = newScale;
      
      // Prevent default to avoid screen zooming
      event.preventDefault();
    }
  });
  
  // Helper to calculate distance between two points
  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  // Helper to find the active container based on touch/click
  function findActiveContainer(event) {
    // Check if any model was clicked
    const element = event.target;
    
    // Navigate up the DOM to find container entity
    let container = null;
    let current = element;
    
    while (current && !container) {
      if (current.id && current.id.includes('-container')) {
        container = current;
      }
      current = current.parentElement;
    }
    
    return container;
  }
}

// Call on document ready
document.addEventListener('DOMContentLoaded', function() {
  log('Document ready');
});

// Sound management system
function setupSoundSystem() {
  // List of all sound entities
  const soundEntities = {
    'astronaut-marker': document.querySelector('#astronaut-sound'),
    'space-marker': document.querySelector('#space-sound'),
    'ufo-marker': document.querySelector('#ufo-sound'),
    'travel-marker': document.querySelector('#travel-sound'),
    'alien-marker': document.querySelector('#alien-sound'),
    'earth-marker': document.querySelector('#earth-sound')
  };
  
  // Play sound when marker is found
  document.addEventListener('markerFound', function(e) {
    const markerId = e.target.id;
    const soundEntity = soundEntities[markerId];
    
    if (soundEntity) {
      log(`Playing sound for ${markerId}`);
      
      // Create a slight delay to prevent sound glitches
      setTimeout(() => {
        soundEntity.components.sound.playSound();
      }, 300);
    }
  });
  
  // Stop sound when marker is lost
  document.addEventListener('markerLost', function(e) {
    const markerId = e.target.id;
    const soundEntity = soundEntities[markerId];
    
    if (soundEntity) {
      log(`Stopping sound for ${markerId}`);
      
      // Only stop after a delay to prevent sound rapidly starting/stopping
      // when marker detection flickers
      setTimeout(() => {
        // Check if marker is still lost before stopping
        if (!e.target.object3D.visible) {
          soundEntity.components.sound.stopSound();
        }
      }, 1000);
    }
  });
}