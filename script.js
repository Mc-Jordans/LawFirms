document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = mainNav.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768 && mainNav && menuToggle) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Sample data (in a real-world scenario, this would come from a server)
    const practiceAreas = [
        { id: 1, name: 'Notarial Services & Certificate Liability & Insurance', description: 'Expert services in notarization and insurance liability.' },
        { id: 2, name: 'Labour Mobility & Health', description: 'Specializing in employment law and health-related legal issues.' },
        { id: 3, name: 'Property Law & IP Law', description: 'Comprehensive legal services for property and intellectual property matters.' },
        { id: 4, name: 'Criminal Law & Road Traffic Law', description: 'Defending your rights in criminal and traffic-related cases.' },
        { id: 5, name: 'Car Accident', description: 'Legal support and representation for car accident victims.' },
        { id: 6, name: 'Commercial Law & Tax', description: 'Expert advice on commercial and tax-related legal issues.' }
    ];
    
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    
    let currentIndex = 0;
    
    function createPracticeAreaElement(area) {
        const areaElement = document.createElement('div');
        areaElement.className = 'practice-area';
        areaElement.innerHTML = `
            <h3>${area.name}</h3>
            <p>${area.description}</p>
        `;
        return areaElement;
    }
    
    function initializeSlider() {
        // Create a copy of the first three items and add them to the end
        const allAreas = [...practiceAreas, ...practiceAreas.slice(0, 3)];
        
        allAreas.forEach(area => {
            const areaElement = createPracticeAreaElement(area);
            sliderTrack.appendChild(areaElement);
        });
        updateSliderPosition(true);
    }
    
    function updateSliderPosition(immediate = false) {
        const slideWidth = document.querySelector('.practice-area').offsetWidth;
        const offset = -currentIndex * slideWidth;
        sliderTrack.style.transition = immediate ? 'none' : 'transform 0.3s ease';
        sliderTrack.style.transform = `translateX(${offset}px)`;
        
        if (immediate) {
            // Force a reflow to make the 'none' transition take effect immediately
            sliderTrack.offsetHeight;
            sliderTrack.style.transition = 'transform 0.3s ease';
        }
    }
    
    function nextSlide() {
        currentIndex++;
        updateSliderPosition();
        
        if (currentIndex >= practiceAreas.length) {
            setTimeout(() => {
                currentIndex = 0;
                updateSliderPosition(true);
            }, 300); // Wait for the transition to finish
        }
    }
    
    function prevSlide() {
        if (currentIndex === 0) {
            currentIndex = practiceAreas.length;
            updateSliderPosition(true);
            setTimeout(() => {
                currentIndex--;
                updateSliderPosition();
            }, 20); // Small delay to ensure the immediate update has taken effect
        } else {
            currentIndex--;
            updateSliderPosition();
        }
    }
    
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Initialize slider
    initializeSlider();
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 10000);
    
    // Update slider position on window resize
    window.addEventListener('resize', () => updateSliderPosition(true));
    
    const attorneys = [
        { id: 1, name: 'John Doe', bio: 'Experienced in family law.', photo: 'images/john-doe.jpg' },
        { id: 2, name: 'Jane Smith', bio: 'Specializes in criminal defense.', photo: 'images/jane-smith.jpg' },
        { id: 3, name: 'Mike Johnson', bio: 'Expert in personal injury cases.', photo: 'images/mike-johnson.jpg' }
    ];

    const blogPosts = [
        { id: 1, title: 'Understanding Divorce Proceedings', summary: 'A guide to navigating divorce.' },
        { id: 2, title: 'What to Do After a Car Accident', summary: 'Steps to take following a collision.' },
        { id: 3, title: 'Business Incorporation: Pros and Cons', summary: 'Exploring different business structures.' }
    ];

    // Populate practice areas
    const practiceAreaGrid = document.querySelector('.practice-area-grid');
    if (practiceAreaGrid) {
        practiceAreas.forEach(area => {
            const areaElement = document.createElement('div');
            areaElement.className = 'practice-area';
            areaElement.innerHTML = `
                <h3>${area.name}</h3>
                <p>${area.description}</p>
            `;
            practiceAreaGrid.appendChild(areaElement);
        });
    }

    // Populate attorneys
    const attorneyGrid = document.querySelector('.attorney-grid');
    if (attorneyGrid) {
        attorneys.forEach(attorney => {
            const attorneyElement = document.createElement('div');
            attorneyElement.className = 'attorney';
            attorneyElement.innerHTML = `
                <img src="${attorney.photo}" alt="${attorney.name}">
                <div class="attorney-info">
                    <h3>${attorney.name}</h3>
                    <p>${attorney.bio}</p>
                </div>
            `;
            attorneyGrid.appendChild(attorneyElement);
        });
    }

    // Populate blog posts
    const blogPostsContainer = document.querySelector('.blog-posts');
    if (blogPostsContainer) {
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="https://candourlegal.blogspot.com/" class="read-more">Read More</a>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

   // Handle form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.disabled = true;
        showMessage('Submitting...', 'loading');

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === 'Success') {
                showMessage('Thank you for your message. We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showMessage('There was an error submitting the form. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('There was an error submitting the form. Please try again.', 'error');
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    });
}

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px';
    messageElement.style.marginBottom = '1rem';
    if (type === 'success') {
        messageElement.style.backgroundColor = 'green';
    } else if (type === 'error') {
        messageElement.style.backgroundColor = 'red';
    } else {
        messageElement.style.backgroundColor = 'gray';
    }
    if (contactForm) {
        contactForm.appendChild(messageElement);
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

    // Scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Scroll to top button
    const scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '↑';
    document.body.appendChild(scrollToTop);

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reveal function for scroll animations
    function reveal() {
        const reveals = document.querySelectorAll(".section");
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Update scroll progress
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';

        // Show/hide scroll to top button
        if (scrollTop > windowHeight) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            } else {
                reveal.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", reveal);

    // Trigger reveal on page load
    reveal();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = -(scrollPosition * 0.5) + 'px';
        });
    }
});