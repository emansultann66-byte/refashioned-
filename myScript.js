
// homepage , interactive globewhich shows traditional clothes of different region when hovered over
let current = null; // tracks which tooltip is currently displayed
const globe = document.getElementById("globe");

if (globe) {
  globe.addEventListener("mousemove", function (e) {
    // get mouse position relative to the globe image
    const x = e.offsetX;
    const y = e.offsetY;
    const width = globe.offsetWidth;
    const height = globe.offsetHeight;
    
    // sees where the mouse is in the globe which quadrant
    const isLeft = x < width / 2;
    const isTop = y < height / 2;
    
    let show = null;
    
    // countries are mapped to quadrants one for each
    if (!isLeft && isTop) {
      show = "tooltip-japan";
    } else if (!isLeft && !isTop) {
      show = "tooltip-india";
    } else if (isLeft && isTop) {
      show = "tooltip-france";
    } else if (isLeft && !isTop) {
      show = "tooltip-nigeria";
    }

    // updates only needed if the mouse is moved to different quadrant
    if (show !== current) {
      // firtsly all tootips needs to be hidden
      document.querySelectorAll('.tooltip').forEach(function(tip) {
        tip.style.display = 'none';
      });
      
      // show the tooltip of current quadrant
      if (show) {
        document.getElementById(show).style.display = "block";
      }
      current = show;
    }
  });

  // when thw mouse isnt on globe no tooltips are shown theyre hidden
  globe.addEventListener("mouseout", function () {
    document.querySelectorAll('.tooltip').forEach(function(tip) {
      tip.style.display = 'none';
    });
    current = null;
  });
}
// global revival page interactive accordians that expands or collapses content by users click
document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(function(accordion) {
    const buttons = accordion.querySelectorAll('.accordion-btn');

    buttons.forEach(function(button) {
      // when user clicks an accordion button
      button.addEventListener('click', function () {
        const isOpen = this.classList.contains('active');

        // close all accordion panels first
        buttons.forEach(function(btn) {
          btn.classList.remove('active');
          const panel = btn.nextElementSibling;
          if (panel && panel.classList.contains('accordion-panel')) {
            panel.classList.remove('open');
          }
        });

        // opens the clicked panel if it wasn't already opened
        if (!isOpen) {
          this.classList.add('active');
          const panel = this.nextElementSibling;
          if (panel && panel.classList.contains('accordion-panel')) {
            panel.classList.add('open');
          }
        }
      });
    });
  });
});
// trend timeline page with scrollable timeline
/**
 * Scrolls the timeline horizontally when navigation buttons are clicked
 * @param {number} direction - Positive for right scroll, negative for left scroll
 */
function scrollTimeline(direction) {
  const container = document.getElementById('timelineContainer');
  if (container) {
    container.scrollLeft += direction * (container.offsetWidth * 0.8); // scrolls 80% of container width so that items are aligned well in all devices
  }
}

/**
 * Shows a modal popup with information about a specific fashion decade
 * @param {string} decade - The decade to display (e.g., '1980s', '1990s')
 */
function showModal(decade) // opens the decade information modal and fills it with the right content
  {
  const modal = document.getElementById('infoModal');
  const title = document.getElementById('modalTitle');
  const text = document.getElementById('modalText');
  const infoDiv = document.getElementById('info' + decade);

  if (modal && infoDiv)  //gives the modal the right content based on decade clicked
  { 
    title.textContent = decade;
    text.textContent = infoDiv.textContent;
    modal.style.display = 'block';
  }
}

// closes the decade information modal when user clicks the close button
function closeModal() { 
  const modal = document.getElementById('infoModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// close modal when clicking outside of it and not on the content this makes it more user friendly
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (modal && event.target == modal) {
    modal.style.display = 'none';
  }
}
//sustainable style page interactive toggle cards 
/**
 * toggles the expansion/collapse of fact cards on Sustainable Style page
 * @param {HTMLElement} header - The card header that was clicked
 */
function toggleCard(header) {
  const content = header.nextElementSibling;
  
  // one card at a time is opened all other cards are closed if user clicks on one 
  document.querySelectorAll('.fact-card-content.open').forEach(function(card) {
    if (card !== content) {
      card.classList.remove('open');
    }
  });
  
  // clicked card is toggled if open it closes and if close it opens
  content.classList.toggle('open');
}
//minimalist vs maximalist page interactive slider that compares both styles by dragging the slider
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('comparisonSlider');
  if (!slider) return; // exit if slider doesn't exist on this page
  
  const minimalistSection = document.getElementById('minimalistSection');
  const maximalistSection = document.getElementById('maximalistSection');
  const handle = document.getElementById('resizeHandle');
  const minimalistTrack = document.getElementById('minimalistTrack');
  const maximalistTrack = document.getElementById('maximalistTrack');
  let isDragging = false; // tracks whether user is currently dragging the handle or not

  /**
   * Updates slider position and image visibility based on mouse/touch position
   * @param {Event} e - Mouse or touch event
   */
  function updateSlider(e) {
    if (!isDragging) return; // only update if user is actively dragging
    
    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left; // get horizontal position within slider

    // handle touch events for mobile devices keeping accessibility in mind
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
    }
    
    // keep position within slider bounds
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    
    // calculate percentage (0-100) of slider width
    const percentage = (x / rect.width) * 100;
    
    // adjust section widths based on handle position
    minimalistSection.style.width = percentage + '%';
    maximalistSection.style.left = percentage + '%';
    maximalistSection.style.width = (100 - percentage) + '%';
    handle.style.left = percentage + '%';

    // three images for each style, images are shown based on slider position; different one at <33%, 33-66%, >66%
    let imageShift = 0;
    if (percentage < 33) {
      imageShift = 0; // first image is shown 
    } else if (percentage < 66) {
      imageShift = -33.333; // second image is shown
    } else {
      imageShift = -66.666; // third image is shown
    }

    // apply the image shift to both tracks
    minimalistTrack.style.transform = 'translateX(' + imageShift + '%)';
    maximalistTrack.style.transform = 'translateX(' + imageShift + '%)';
  }

  // start dragging when user moves the handle
  handle.addEventListener('mousedown', function() { isDragging = true; });
  handle.addEventListener('touchstart', function() { isDragging = true; });
  
  // stop dragging when user releases 
  document.addEventListener('mouseup', function() { isDragging = false; });
  document.addEventListener('touchend', function() { isDragging = false; });

  // update slider position while dragging
  document.addEventListener('mousemove', updateSlider);
  document.addEventListener('touchmove', updateSlider);
});

//east met west page carousel interactivity
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return; // exit if carousel doesn't exist on this page
  
  let currentSlide = 0; // track which slide is currently visible
  const items = document.querySelectorAll('.carousel-item').length;
  const dotsContainer = document.getElementById('dots');

  // navigation dots for each slide is created
  for (let i = 0; i < items; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.className += ' active'; // first dot starts active so its already red
    dot.onclick = function() { goToSlide(i); }; // click dot to jump to that slide
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    // width for each slide is 100%
    carousel.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    
    // current slide is shown by updating the dot indicators 
    const dots = document.querySelectorAll('.dot');
    dots.forEach(function(dot, i) {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // move to next slide while wrapping the first
  window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % items; // Wrap around to First after last slide
    updateCarousel();
  }

  // move to previous slide (with wrapping to last slide)
  window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + items) % items; // wrap around to last slide if at first
    updateCarousel();
  }

  /**
   * pump directly to a specific slide
   * @param {number} n - Index of slide to show (0-based)
   */
  window.goToSlide = function(n) {
    currentSlide = n;
    updateCarousel();
  }
});

// your style page buttons for choosing categories 
/**
 * handles style category button selection on Your Style page
 * @param {Event} event - Click event
 * @param {string} category - Selected category name
 */
function selectCategory(event, category) {
  // remove active class from all buttons
  const buttons = document.querySelectorAll('.style-btn');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  // add active class to clicked button which is shown by reg bg
  event.target.classList.add('active');
}

// helpers for form validation
/**
 * Validates email format by seeing if it contains . and @ 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

/**
 * checks if uploaded file is within size limit
 * @param {File} file - File object to check
 * @returns {boolean} True if file is 5MB or less
 */
function isValidFileSize(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  return file.size <= maxSize;
}

/**
 * checks if uploaded file is of proper format
 * @param {File} file - File object to check
 * @returns {boolean} True if file type is JPG, PNG, or WEBP
 */
function isValidFileType(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * clears error message and styling for a form field
 * @param {string} fieldId - ID of the field to clear errors from
 */
function clearError(fieldId) {
  const errorSpan = document.getElementById(fieldId + '-error');
  const field = document.getElementById(fieldId);
  if (errorSpan) errorSpan.textContent = '';
  if (field) field.classList.remove('invalid');
}

/**
 * shows error message and red border for a form field
 * @param {string} fieldId - ID of the field with error
 * @param {string} message - error message to display
 */
function showError(fieldId, message) {
  const errorSpan = document.getElementById(fieldId + '-error');
  const field = document.getElementById(fieldId);
  if (errorSpan) errorSpan.textContent = message;
  if (field) {
    field.classList.add('invalid'); // red border
    field.focus(); // move cursor to problem field
  }
}

/**
 * Shows a general error message at top of form
 * @param {string} message - error message to display
 */
function showGeneralError(message) {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // errors are hidden automatically after 5 seconds
    setTimeout(function() {
      errorDiv.style.display = 'none';
    }, 5000);
  }
}

// your style form submission, here everything is validated and submitted, errors are shown
/**
 * @param {Event} event - Form submit event
 * @returns {boolean} False to prevent default form submission
 */
function submitStyle(event) {
  event.preventDefault(); // prevent page from reloading

  // any existing error messages are cleared
  clearError('userName');
  clearError('userEmail');
  clearError('userImage');
  clearError('userDescription');
  
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) errorDiv.style.display = 'none';
  
  let isValid = true;
  let firstError = null; // first error is focused for fixinf
  
  // validate name field
  const userName = document.getElementById('userName').value.trim();
  if (userName === '') {
    showError('userName', 'Please enter your name');
    isValid = false;
    if (!firstError) firstError = 'userName';
  } else if (userName.length < 2) {
    showError('userName', 'Name must be at least 2 characters');
    isValid = false;
    if (!firstError) firstError = 'userName';
  } else if (userName.length > 50) {
    showError('userName', 'Name is too long (max 50 characters)');
    isValid = false;
    if (!firstError) firstError = 'userName';
  }
  
  // validate email field
  const userEmail = document.getElementById('userEmail').value.trim();
  if (userEmail === '') {
    showError('userEmail', 'Please enter your email');
    isValid = false;
    if (!firstError) firstError = 'userEmail';
  } else if (!isValidEmail(userEmail)) {
    showError('userEmail', 'Please enter a valid email (e.g., name@example.com)');
    isValid = false;
    if (!firstError) firstError = 'userEmail';
  }
  
  // validate image if uploaded as its optional
  const userImageInput = document.getElementById('userImage');
  const userImage = userImageInput.files[0];
  if (userImage) {
    if (!isValidFileType(userImage)) {
      showError('userImage', 'Please upload JPG, PNG, or WEBP image');
      isValid = false;
      if (!firstError) firstError = 'userImage';
    } else if (!isValidFileSize(userImage)) {
      showError('userImage', 'Image must be less than 5MB');
      isValid = false;
      if (!firstError) firstError = 'userImage';
    }
  }
  
  // validate description field
  const userDescription = document.getElementById('userDescription').value.trim();
  if (userDescription === '') {
    showError('userDescription', 'Please tell us about your look');
    isValid = false;
    if (!firstError) firstError = 'userDescription';
  } else if (userDescription.length < 20) {
    showError('userDescription', 'Description must be at least 20 characters (currently ' + userDescription.length + ')');
    isValid = false;
    if (!firstError) firstError = 'userDescription';
  } else if (userDescription.length > 500) {
    showError('userDescription', 'Description is too long (max 500 characters, currently ' + userDescription.length + ')');
    isValid = false;
    if (!firstError) firstError = 'userDescription';
  }
  
  // if validation fails we look for first error to occur and stop there to fix it first
  if (!isValid) {
    if (firstError) {
      document.getElementById(firstError).focus();
    }
    showGeneralError('Please fix the errors before submitting');
    return false;
  }
  
  // when form is valid a success message is displayed 
  const successMsg = document.getElementById('successMessage');
  if (successMsg) successMsg.style.display = 'block';
  
  // reset form fields
  document.getElementById('uploadForm').reset();
  
  // success message is viewed in center
  successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // after 5 seconds success message is hidden automatically
  setTimeout(function() {
    if (successMsg) successMsg.style.display = 'none';
  }, 5000);
  
  return false;
}
// all of the real time validation, using event listeners that provide instant feedback
document.addEventListener('DOMContentLoaded', function() {
  
  // real time validation for email
  const emailInput = document.getElementById('userEmail');
  if (emailInput) {
    // when user leaves the email field it shows the error quickly if any
    emailInput.addEventListener('blur', function() {
      const email = this.value.trim();
      if (email !== '' && !isValidEmail(email)) {
        showError('userEmail', 'Please enter a valid email (e.g., name@example.com)');
      } else if (email !== '') {
        clearError('userEmail');
      }
    });
    
    // error is cleared as soon as the email is valid
    emailInput.addEventListener('input', function() {
      const email = this.value.trim();
      if (isValidEmail(email)) {
        clearError('userEmail');
      }
    });
  }

  // real time validation for name
  const nameInput = document.getElementById('userName');
  if (nameInput) {
    // error is cleared as soon as the proper length is met which should be less than 50 letters
    nameInput.addEventListener('input', function() {
      const name = this.value.trim();
      if (name.length >= 2 && name.length <= 50) {
        clearError('userName');
      }
    });
  }

  // real time validation for image
  const imageInput = document.getElementById('userImage');
  if (imageInput) {
    // when the file is selected it is immediately checked if its upladed in the proper format
    imageInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        if (!isValidFileType(file)) {
          showError('userImage', 'Please upload JPG, PNG, or WEBP image');
        } else if (!isValidFileSize(file)) {
          showError('userImage', 'Image must be less than 5MB');
        } else {
          clearError('userImage');
        }
      }
    });
  }

  // tell your story box real time feedback 
  const descriptionInput = document.getElementById('userDescription');
  if (descriptionInput) {
    // creates the character counter element
    const counter = document.createElement('span');
    counter.className = 'char-counter';
    counter.id = 'char-counter';

    // character counter is inserted right after the help text
    const helpText = document.getElementById('userDescription-help');
    if (helpText) {
      helpText.parentNode.insertBefore(counter, helpText.nextSibling);
    }
    
    // as user types the word count is updated
    descriptionInput.addEventListener('input', function() {
      const length = this.value.length;
      const maxLength = 500;
      const minLength = 20;
      
      //  shows the current length of the description and the limit too
      counter.textContent = length + ' / ' + maxLength + ' characters';
      
      //  ive chosen two colors to show warning and error as the counter is colored coded based on lenght
      counter.classList.remove('warning', 'error');
      if (length > maxLength) {
        counter.classList.add('error'); // red when over length limit
      } else if (length > maxLength - 50) {
        counter.classList.add('warning'); // orange when approaching length limit
      }

      // if the length is valid error is removed
      if (length >= minLength && length <= maxLength) {
        clearError('userDescription');
      }
    });
  }
});
