// Wait for everything to load
window.addEventListener('load', function() {
  // Hide loading screen after models are loaded or timeout
  setTimeout(function() {
    document.querySelector('.loading-screen').style.display = 'none';
  }, 5000); // Longer timeout for 3D models to load
  
  // Set up tracking status indicators
  setupTrackingIndicators();
  
  // Set up dynamic glitch effects
  setupGlitchEffects();
  
  // Add click interaction to objects
  setupInteractions();
  
  // Setup model loading tracking
  setupModelTracking();
  
  // Setup debug tools for testing
  setupDebugTools();
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
    if (markerId === 'portal-marker') {
      instructions.textContent = 'Portal to another dimension detected!';
    } else if (markerId === 'impossible-marker') {
      instructions.textContent = 'Impossible geometry disrupting reality!';
    } else if (markerId === 'glitch-marker') {
      instructions.textContent = 'System error: Reality corruption detected!';
    } else {
      instructions.textContent = 'Reality glitch detected!';
    }
    
    log('Marker found: ' + markerId);
  });
  
  document.addEventListener('markerLost', function(e) {
    trackingStatus.style.backgroundColor = 'red';
    instructions.textContent = 'Scan markers to reveal glitches in reality';
    
    log('Marker lost: ' + e.target.id);
  });
}

// Enhanced glitch effects for 3D models
function setupGlitchEffects() {
  // Get the glitch model container
  const glitchContainer = document.querySelector('#glitch-container');
  const glitchObject = document.querySelector('#glitch-object');
  
  if (glitchContainer && glitchObject) {
    // Create more random and unpredictable glitches
    setInterval(() => {
      // Random position offset (jitter effect)
      const offsetX = (Math.random() - 0.5) * 0.1;
      const offsetY = (Math.random() - 0.5) * 0.1;
      const offsetZ = (Math.random() - 0.5) * 0.1;
      
      // Apply glitch transformation to the container
      glitchContainer.setAttribute('position', `${offsetX} ${offsetY} ${offsetZ}`);
      
      // Reset after short delay
      setTimeout(() => {
        glitchContainer.setAttribute('position', '0 0 0');
      }, 50 + Math.random() * 50);
      
      // Occasionally create more dramatic glitches
      if (Math.random() > 0.8) {
        // Scale distortion for the model
        const scaleX = 0.5 + Math.random() * 0.2;
        const scaleY = 0.5 + Math.random() * 0.2;
        const scaleZ = 0.5 + Math.random() * 0.2;
        glitchObject.setAttribute('scale', `${scaleX} ${scaleY} ${scaleZ}`);
        
        // Rotation jump
        const rotX = Math.random() * 15; // Less extreme to prevent model flipping
        const rotY = Math.random() * 15;
        const rotZ = Math.random() * 15;
        glitchContainer.setAttribute('rotation', `${rotX} ${rotY} ${rotZ}`);
        
        // Reset after a short delay
        setTimeout(() => {
          glitchObject.setAttribute('scale', '0.6 0.6 0.6');
          glitchContainer.setAttribute('rotation', '0 0 0');
        }, 150);
      }
    }, 1000);
  }
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
  setupModelInteractions('portal-marker');
  setupModelInteractions('impossible-marker');
  setupModelInteractions('glitch-marker');
}

// Setup interaction for a specific model
function setupModelInteractions(markerId) {
  const marker = document.querySelector(`#${markerId}`);
  if (marker) {
    marker.addEventListener('click', function() {
      log(`Clicked on ${markerId}`);
      
      // Find particle systems in this marker
      const particles = marker.querySelector('[particle-system]');
      if (particles) {
        // Increase particle emission on click
        const particleSystem = particles.getAttribute('particle-system');
        const currentCount = particleSystem.particleCount || 100;
        particles.setAttribute('particle-system', 'particleCount', currentCount * 2);
        
        // Reset after 2 seconds
        setTimeout(() => {
          particles.setAttribute('particle-system', 'particleCount', currentCount);
        }, 2000);
      }
      
      // Add different effects based on which model was clicked
      if (markerId === 'portal-marker') {
        // Make portal pulse
        const model = marker.querySelector('[gltf-model]');
        if (model) {
          model.setAttribute('animation__click', 'property: scale; from: 0.5 0.5 0.5; to: 0.7 0.7 0.7; dur: 1000; dir: alternate; loop: 2');
        }
      } else if (markerId === 'impossible-marker') {
        // Make impossible structure spin faster
        const container = marker.querySelector('a-entity[animation]');
        if (container) {
          const currentDur = container.getAttribute('animation').dur;
          container.setAttribute('animation', 'dur', currentDur / 2);
          
          // Reset after 2 seconds
          setTimeout(() => {
            container.setAttribute('animation', 'dur', currentDur);
          }, 2000);
        }
      }
    });
  }
}

// Track model loading
function setupModelTracking() {
  let modelsLoaded = 0;
  const totalModels = 3; 
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

// Call on document ready
document.addEventListener('DOMContentLoaded', function() {
  log('Document ready');
});

// Set up model interaction
function setupModelInteraction() {
    // Get our scene and models
    const scene = document.querySelector('a-scene');
    const model = document.querySelector('#interactive-model');
    const container = document.querySelector('#model-container');
    
    if (!model || !container) return;
    
    // Variables to track interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 5; // Adjust for faster/slower rotation
    
    // Desktop mouse events
    scene.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });
    
    scene.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        
        // Calculate rotation based on mouse movement
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        const currentRotation = container.getAttribute('rotation');
        
        // Update rotation (invert X and Y for intuitive control)
        container.setAttribute('rotation', {
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
    });
    
    // Mobile touch events
    scene.addEventListener('touchstart', function(event) {
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
        // Prevent default to avoid screen scrolling while interacting
        event.preventDefault();
    });
    
    scene.addEventListener('touchmove', function(event) {
        if (!isDragging) return;
        
        const deltaMove = {
            x: event.touches[0].clientX - previousMousePosition.x,
            y: event.touches[0].clientY - previousMousePosition.y
        };
        
        const currentRotation = container.getAttribute('rotation');
        
        container.setAttribute('rotation', {
            x: currentRotation.x + (deltaMove.y * 0.5),
            y: currentRotation.y + (deltaMove.x * 0.5),
            z: currentRotation.z
        });
        
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
        
        // Prevent default to avoid screen scrolling
        event.preventDefault();
    });
    
    scene.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Add pinch-to-zoom functionality
    let initialDistance = 0;
    let currentScale = 0.5; // Match your initial scale
    
    scene.addEventListener('touchstart', function(event) {
        if (event.touches.length === 2) {
            initialDistance = getDistance(
                event.touches[0].clientX, event.touches[0].clientY,
                event.touches[1].clientX, event.touches[1].clientY
            );
        }
    });
    
    scene.addEventListener('touchmove', function(event) {
        if (event.touches.length === 2) {
            const currentDistance = getDistance(
                event.touches[0].clientX, event.touches[0].clientY,
                event.touches[1].clientX, event.touches[1].clientY
            );
            
            const scaleFactor = 1 + ((currentDistance - initialDistance) / initialDistance) * 0.2;
            currentScale = Math.max(0.1, Math.min(currentScale * scaleFactor, 3.0));
            
            model.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);
            initialDistance = currentDistance;
        }
    });
    
    // Helper to calculate distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}

// Call this in your main initialization
document.addEventListener('DOMContentLoaded', function() {
    setupModelInteraction();
});