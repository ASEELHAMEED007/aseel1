 // Simple mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Full-screen image preview modal with navigation
    const modal = document.getElementById('imageModal');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const projectItems = document.querySelectorAll('.project-item');
    const currentProjectEl = document.querySelector('.current-project');
    const totalProjectsEl = document.querySelector('.total-projects');
    
    let currentProjectIndex = 0;
    const totalProjects = projectItems.length;
    
    // Set total projects count
    totalProjectsEl.textContent = totalProjects;

    // Open modal when clicking any project
    projectItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentProjectIndex = index;
        openModal();
      });
    });

    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateProjectCounter();
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateProjectCounter() {
      currentProjectEl.textContent = currentProjectIndex + 1;
    }

    function showNextProject() {
      currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
      updateProjectCounter();
    }

    function showPrevProject() {
      currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
      updateProjectCounter();
    }

    // Close modal
    modalClose.addEventListener('click', closeModal);

    // Navigation arrows
    modalNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextProject();
    });

    modalPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevProject();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        showNextProject();
      } else if (e.key === 'ArrowLeft') {
        showPrevProject();
      }
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
        
        // Here you can add your email service integration
        // Example: send to EmailJS, Formspree, or your backend
        console.log('Form submitted:', formData);
      });
    }