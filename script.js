// HERO TEXT FADING & ROTATING ROLES
const roles = [
  "Frontend Developer",
  "Mathematician",
  "AI / ML Engineer",
  "Photographer",
  "Statistical Analyst",
  "Quantitative Researcher",
  "Poker Nerd"
];
const typingDelay = 150, erasingDelay = 100, newTextDelay = 2000;
let roleIndex = 0, charIndex = 0;
const typedEl = document.querySelector(".typed-words");

// HERO TITLE POP ANIMATION
const heroTitleWords = [
  ...document.querySelectorAll('.hero-title-blue, .hero-title-white')
];

function popInWords(from = 'top') {
  const yVal = from === 'top' ? -60 : 60;
  gsap.fromTo(heroTitleWords, {
    opacity: 0,
    y: yVal
  }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'back.out(1.7)',
    stagger: 0.08
  });
}

function popOutWords(to = 'top') {
  const yVal = to === 'top' ? -60 : 60;
  gsap.to(heroTitleWords, {
    opacity: 0,
    y: yVal,
    duration: 0.5,
    ease: 'back.in(1.2)'
  });
}

// POP ANIMATION FOR HERO & ABOUT SECTIONS
function getSectionContent(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return [];
  // Select all main content elements in the section
  return Array.from(section.querySelectorAll('.hero-title-blue, .hero-title-white, .hero-description-alt, .typed-words, .hero-stats-bottom.hero-stats-left, .about-quote, .about-content, .about-left h2, .about-right p'));
}

const heroContentEls = getSectionContent('hero');
const aboutContentEls = getSectionContent('about');

function popInSection(elements, from = 'top') {
  const yVal = from === 'top' ? -60 : 60;
  gsap.fromTo(elements, {
    opacity: 0,
    y: yVal
  }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'back.out(1.7)',
    stagger: 0.08
  });
}

function popOutSection(elements, to = 'top') {
  const yVal = to === 'top' ? -60 : 60;
  gsap.to(elements, {
    opacity: 0,
    y: yVal,
    duration: 0.5,
    ease: 'back.in(1.2)'
  });
}

// Helper to check if section is halfway out of view
function isHalfwayOutOfView(section) {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const halfway = rect.height / 2;
  return rect.top > windowHeight - halfway || rect.bottom < halfway;
}

// Animation state flags
let heroInView = false;
let aboutInView = false;

function handleSectionPopAnimations() {
  // HERO
  const heroSection = document.getElementById('hero');
  const heroRect = heroSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const heroHalfwayOut = isHalfwayOutOfView(heroSection);
  if (!heroHalfwayOut && !heroInView) {
    // Section is in view, pop in from direction
    const from = heroRect.top > 0 ? 'top' : 'bottom';
    popInSection(heroContentEls, from);
    heroInView = true;
  } else if (heroHalfwayOut && heroInView) {
    // Section is halfway out, pop out in direction
    const to = heroRect.top < 0 ? 'top' : 'bottom';
    popOutSection(heroContentEls, to);
    heroInView = false;
  }

  // ABOUT
  const aboutSection = document.getElementById('about');
  const aboutRect = aboutSection.getBoundingClientRect();
  const aboutHalfwayOut = isHalfwayOutOfView(aboutSection);
  if (!aboutHalfwayOut && !aboutInView) {
    const from = aboutRect.top > 0 ? 'top' : 'bottom';
    popInSection(aboutContentEls, from);
    aboutInView = true;
  } else if (aboutHalfwayOut && aboutInView) {
    const to = aboutRect.top < 0 ? 'top' : 'bottom';
    popOutSection(aboutContentEls, to);
    aboutInView = false;
  }
}

// On page load, pop in hero and about from top
window.addEventListener('DOMContentLoaded', () => {
  popInSection(heroContentEls, 'top');
  popInSection(aboutContentEls, 'top');
  heroInView = true;
  aboutInView = true;
});
window.addEventListener('scroll', handleSectionPopAnimations);

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typedEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeRole, typingDelay);
  } else {
    setTimeout(eraseRole, newTextDelay);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typedEl.textContent = roles[roleIndex].substring(0, charIndex--);
    setTimeout(eraseRole, erasingDelay);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    // Ensure text is completely cleared before starting new word
    typedEl.textContent = "";
    setTimeout(typeRole, typingDelay);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // Staggered fade-in animation from top to bottom
  const tl = gsap.timeline();
  
  // Animate hero intro first
  tl.to(".hero-intro", { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    ease: "power2.out" 
  })
  // Then animate hero title
  .to(".hero-title", { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    ease: "power2.out" 
  }, "-=0.3")
  // Then animate the typing text
  .to(".typed-words", { 
    opacity: 1, 
    y: 0, 
    duration: 0.6, 
    ease: "power2.out" 
  }, "-=0.2")
  // Then animate the About Me button
  .to(".hero-btn", { 
    opacity: 1, 
    y: 0, 
    duration: 0.6, 
    ease: "power2.out" 
  }, "-=0.1")
  // Finally animate the stats
  .to(".hero-stats-bottom", { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    ease: "power2.out" 
  }, "-=0.2");

  // Cursor flashlight effect
  const cursorLight = document.querySelector(".cursor-light");
  
  document.addEventListener("mousemove", (e) => {
    cursorLight.style.left = e.clientX + "px";
    cursorLight.style.top = e.clientY + "px";
  });

  // Mouse tracking for glow effect on all hero text elements
  const heroTitle = document.querySelector(".hero-title");
  const heroIntro = document.querySelector(".hero-intro");
  const typedWords = document.querySelector(".typed-words");
  const heroBtn = document.querySelector(".hero-btn");
  const heroSection = document.querySelector("#hero");
  
  heroSection.addEventListener("mousemove", (e) => {
    // Glow effect for hero title
    const titleRect = heroTitle.getBoundingClientRect();
    const titleCenterX = titleRect.left + titleRect.width / 2;
    const titleCenterY = titleRect.top + titleRect.height / 2;
    const titleDistance = Math.sqrt(
      Math.pow(e.clientX - titleCenterX, 2) + 
      Math.pow(e.clientY - titleCenterY, 2)
    );
    
    // Glow effect for button
    const btnRect = heroBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const btnDistance = Math.sqrt(
      Math.pow(e.clientX - btnCenterX, 2) + 
      Math.pow(e.clientY - btnCenterY, 2)
    );
    
    const maxDistance = 200;
    
    // Apply glow to hero title
    const titleIntensity = Math.max(0, 1 - titleDistance / maxDistance);
    const titleGlowIntensity = 8 + (titleIntensity * 24);
    const titleGlowSpread = 16 + (titleIntensity * 48);
    heroTitle.style.textShadow = `0 0 ${titleGlowIntensity}px #1e90ff, 0 0 ${titleGlowSpread}px #1e90ff`;
    
    // Apply glow to hero intro - REMOVED
    // const introIntensity = Math.max(0, 1 - introDistance / maxDistance);
    // const introGlowIntensity = 4 + (introIntensity * 16);
    // const introGlowSpread = 8 + (introIntensity * 32);
    // heroIntro.style.textShadow = `0 0 ${introGlowIntensity}px #fff, 0 0 ${introGlowSpread}px #fff`;
    
    // Apply glow to typed words - REMOVED
    // const typedIntensity = Math.max(0, 1 - typedDistance / maxDistance);
    // const typedGlowIntensity = 6 + (typedIntensity * 20);
    // const typedGlowSpread = 12 + (typedIntensity * 40);
    // typedWords.style.textShadow = `0 0 ${typedGlowIntensity}px #fff, 0 0 ${typedGlowSpread}px #fff`;
    
    // Apply faint blue glow to button
    const btnIntensity = Math.max(0, 1 - btnDistance / maxDistance);
    const btnGlowIntensity = 2 + (btnIntensity * 8);
    const btnGlowSpread = 4 + (btnIntensity * 16);
    heroBtn.style.textShadow = `0 0 ${btnGlowIntensity}px #1e90ff, 0 0 ${btnGlowSpread}px #1e90ff`;
    heroBtn.style.boxShadow = `0 0 ${btnGlowIntensity * 3}px #1e90ff`;
  });

  if (roles.length) setTimeout(typeRole, newTextDelay);

  // Smooth scrolling for About Me button and About nav link
  const aboutBtn = document.querySelector(".hero-btn");
  const aboutNavLink = document.querySelector('a[href="#about"]');
  
  function scrollToAbout() {
    const aboutSection = document.querySelector("#about");
    aboutSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  aboutBtn.addEventListener("click", scrollToAbout);
  aboutNavLink.addEventListener("click", scrollToAbout);

  // Section-by-section scrolling with incremental scrolling and snap
  const sections = document.querySelectorAll('.panel');
  let isScrolling = false;
  let currentSectionIndex = 0;
  let scrollThreshold = 10; // Much lower threshold for very controlled feel
  let scrollAccumulator = 0;
  let lastScrollTime = 0;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      const targetSection = sections[index];
      const targetPosition = targetSection.offsetTop;
      
      gsap.to(window, {
        duration: 0.6, // Even faster, more controlled transition
        scrollTo: { y: targetPosition, autoKill: false },
        ease: "power1.out", // More controlled easing
        onComplete: () => {
          currentSectionIndex = index;
        }
      });
    }
  }

  function handleWheel(e) {
    const currentTime = Date.now();
    
    // Allow incremental scrolling but track for snapping
    scrollAccumulator += Math.abs(e.deltaY);
    
    // If enough force is applied, snap to next section
    if (scrollAccumulator >= scrollThreshold && !isScrolling && (currentTime - lastScrollTime) > 150) {
      e.preventDefault();
      isScrolling = true;
      lastScrollTime = currentTime;
      
      if (e.deltaY > 0) {
        // Scrolling down
        scrollToSection(currentSectionIndex + 1);
      } else {
        // Scrolling up
        scrollToSection(currentSectionIndex - 1);
      }
      
      // Reset accumulator
      scrollAccumulator = 0;
      
      setTimeout(() => {
        isScrolling = false;
      }, 800); // Shorter cooldown for more controlled feel
    }
    
    // Reset accumulator if no scroll for a while
    setTimeout(() => {
      scrollAccumulator = 0;
    }, 100); // Even shorter reset time
  }

  // Initialize current section and fade in first section
  function updateCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionMiddle = sectionTop + section.offsetHeight / 2; // Half of section
      const sectionThreeQuarter = sectionTop + (section.offsetHeight * 0.75); // 3/4 of section
      
      // Check if we're past 3/4 of the way into this section
      if (scrollPosition >= sectionThreeQuarter && scrollPosition < sectionBottom) {
        if (currentSectionIndex !== index) {
          currentSectionIndex = index;
        }
      }
    });
  }

  // Individual word fade effects based on viewport position
  function updateWordVisibility() {
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + window.innerHeight;
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    
    // Get all text elements across all sections
    const allTextElements = document.querySelectorAll('h1, h2, h3, p, .hero-btn, .typed-words');
    
    allTextElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;
      const elementCenter = elementTop + rect.height / 2;
      
      // Check if element is in viewport with stricter conditions
      const isInView = elementBottom > viewportTop + 100 && elementTop < viewportBottom - 100; // More prominent in view
      const isNearCenter = Math.abs(elementCenter - viewportCenter) < window.innerHeight / 4; // Much closer to center
      
      // Initialize animation state if not set
      if (!element.dataset.animated) {
        element.dataset.animated = 'false';
      }
      
      // Calculate parallax movement based on scroll position
      const scrollProgress = (window.scrollY - elementTop) / window.innerHeight;
      const parallaxOffset = scrollProgress * 50; // Move words up/down by 50px
      
      // Apply parallax movement to words
      gsap.set(element, {
        y: parallaxOffset,
        force3D: true
      });
      
      // Pop up when element enters viewport and is near center (only first time)
      if (isInView && isNearCenter && element.dataset.animated === 'false') {
        element.dataset.animated = 'true';
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: parallaxOffset + 30,
            scale: 0.9,
            rotationX: -5
          },
          {
            opacity: 1,
            y: parallaxOffset,
            scale: 1,
            rotationX: 0,
            duration: 0.8, // More controlled duration
            ease: "power2.out", // More controlled easing, less bounce
            delay: Math.random() * 0.1 // Shorter, more controlled stagger
          }
        );
      }
      // Fade out when element goes out of view
      else if (!isInView && element.style.opacity !== '0') {
        gsap.to(element, {
          opacity: 0,
          y: parallaxOffset + (elementTop < viewportCenter ? -30 : 30),
          scale: 0.95,
          duration: 0.4,
          ease: "power1.in"
        });
      }
      // Fade back in if element comes back into view (after being animated)
      else if (isInView && isNearCenter && element.dataset.animated === 'true' && element.style.opacity === '0') {
        gsap.to(element, {
          opacity: 1,
          y: parallaxOffset,
          scale: 1,
          duration: 0.6,
          ease: "power1.out"
        });
      }
    });
  }

  // Add wheel event listener
  document.addEventListener('wheel', handleWheel, { passive: false });
  
  // Update current section on scroll with throttling for performance
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCurrentSection();
        updateWordVisibility(); // Update individual word visibility
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', updateOnScroll);
  
  // Initialize current section and fade in first section
  updateCurrentSection();
  setTimeout(() => {
    updateWordVisibility(); // Initial word visibility check
  }, 500);

  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navSlide = document.querySelector('.nav-slide');
  
  function toggleNav() {
    const isOpen = hamburgerMenu.classList.toggle('open');
    navSlide.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  hamburgerMenu.addEventListener('click', toggleNav);
  
  // Close nav when clicking on nav links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('open');
      navSlide.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  
  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navSlide.classList.contains('open') &&
      !navSlide.contains(e.target) &&
      !hamburgerMenu.contains(e.target)
    ) {
      hamburgerMenu.classList.remove('open');
      navSlide.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// nav fade in
gsap.from(".nav", { y: -50, opacity: 0, duration: .8, ease: "power2.out" });

// panels reveal
gsap.utils.toArray(".panel").forEach(panel => {
  gsap.from(panel, {
    opacity: 0,
    y: 50,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
    }
  });
});

// skill bars
gsap.utils.toArray(".bar div").forEach(bar => {
  ScrollTrigger.create({
    trigger: bar.parentElement,
    onEnter: () => gsap.to(bar, { width: bar.dataset.level, duration: 1.2, ease: "power2.out" })
  });
});

// project cards
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.to(card, {
    y: 0,
    opacity: 1,
    delay: i * 0.2,
    duration: .8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    }
  });
});

// Remove all custom scroll logic and handlers
// Only keep the smooth floating/fading animation for hero and about content
function animateSectionFloat() {
  const heroSection = document.getElementById('hero');
  const aboutSection = document.getElementById('about');
  const heroContent = document.querySelector('.hero-content');
  const heroStats = document.querySelector('.hero-stats-bottom.hero-stats-left');
  const aboutContent = document.querySelector('.about-content');
  const aboutQuote = document.querySelector('.about-quote');

  // Animate hero content (unchanged)
  if (heroSection && heroContent && heroStats) {
    const heroRect = heroSection.getBoundingClientRect();
    let progress = Math.min(1, Math.max(0, -heroRect.top / heroRect.height));
    gsap.to([heroContent, heroStats], {
      y: -progress * 80,
      opacity: 1 - progress * 1.1,
      duration: 1.5,
      ease: 'power1.inOut',
      overwrite: 'auto',
      stagger: 0
    });
  }

  // Animate about content: pop in from bottom, pop out upwards
  if (aboutSection && aboutContent && aboutQuote) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Section is in view if any part is visible
    const inView = aboutRect.bottom > 0 && aboutRect.top < windowHeight;
    if (inView) {
      // How much of the section is in view (0 = just entering, 1 = fully in view)
      let progress = Math.min(1, Math.max(0, 1 - Math.abs(aboutRect.top) / windowHeight));
      gsap.to([aboutContent, aboutQuote], {
        y: 60 * (1 - progress),
        opacity: progress,
        duration: 1,
        ease: 'power1.inOut',
        overwrite: 'auto',
        stagger: 0
      });
    } else if (aboutRect.top <= 0) {
      // Scrolled past (pop out upwards)
      gsap.to([aboutContent, aboutQuote], {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
        overwrite: 'auto',
        stagger: 0
      });
    } else {
      // Not yet in view (below viewport)
      gsap.set([aboutContent, aboutQuote], { y: 60, opacity: 0 });
    }
  }
}
window.addEventListener('scroll', animateSectionFloat);
window.addEventListener('DOMContentLoaded', animateSectionFloat);