// HERO TEXT FADING & ROTATING ROLES
const roles = [
  "Frontend Dev",
  "Mathematician",
  "AI Engineer",
  "Statistical Analyst",
  "Quant Analyst",
  "Poker Nerd"
];
const typingDelay = 150, erasingDelay = 100, newTextDelay = 2000;
let roleIndex = 0, charIndex = 0;
const typedEl = document.querySelector(".typed-words");

function typeRole() {
  // Show cursor when typing starts
  if (typedEl) {
    typedEl.classList.add('typing');
  }
  
  if (charIndex < roles[roleIndex].length) {
    typedEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeRole, typingDelay);
  } else {
    // Hide cursor when typing stops
    typedEl.classList.remove('typing');
    setTimeout(eraseRole, newTextDelay);
  }
}

function eraseRole() {
  // Show cursor during erasing
  if (typedEl) {
    typedEl.classList.add('typing');
  }
  
  if (charIndex > 0) {
    typedEl.textContent = roles[roleIndex].substring(0, charIndex--);
    setTimeout(eraseRole, erasingDelay);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    // Ensure text is completely cleared before starting new word
    typedEl.textContent = "";
    // Hide cursor briefly between words
    typedEl.classList.remove('typing');
    setTimeout(typeRole, typingDelay);
  }
}

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
  return Array.from(section.querySelectorAll('.hero-title-blue, .hero-title-white, .hero-description-alt, .typed-words, .hero-stats-bottom.hero-stats-left, .about-quote-full p, .about-welcome, .about-photo, .about-right p:not(.about-welcome), .journey-btn, .education-left h2, .education-right'));
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
let educationInView = false;

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

  // EDUCATION
  const educationSection = document.querySelector('.education-section');
  if (educationSection) {
    const educationRect = educationSection.getBoundingClientRect();
    const educationHalfwayOut = isHalfwayOutOfView(educationSection);
    if (!educationHalfwayOut && !educationInView) {
      const from = educationRect.top > 0 ? 'top' : 'bottom';
      popInEducation(from);
      educationInView = true;
    } else if (educationHalfwayOut && educationInView) {
      const to = educationRect.top < 0 ? 'top' : 'bottom';
      popOutEducation(to);
      educationInView = false;
    }
  }
}

// Education pop-in animation functions
function popInEducation(from = 'top') {
  const educationElements = document.querySelectorAll('.education-left h2, .education-right');
  const yVal = from === 'top' ? -60 : 60;
  gsap.fromTo(educationElements, {
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

function popOutEducation(to = 'top') {
  const educationElements = document.querySelectorAll('.education-left h2, .education-right');
  const yVal = to === 'top' ? -60 : 60;
  gsap.to(educationElements, {
    opacity: 0,
    y: yVal,
    duration: 0.5,
    ease: 'back.in(1.2)'
  });
}

// On page load, pop in hero and about from top
window.addEventListener('DOMContentLoaded', () => {
  popInSection(heroContentEls, 'top');
  popInSection(aboutContentEls, 'top');
  heroInView = true;
  aboutInView = true;
});
window.addEventListener('scroll', handleSectionPopAnimations);

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

  // Role typing will be triggered after bio typing completes

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
  
  if (aboutBtn) aboutBtn.addEventListener("click", scrollToAbout);
  if (aboutNavLink) aboutNavLink.addEventListener("click", scrollToAbout);

  // ANIMATION SETTINGS - Easy to adjust!
  const ANIMATION_SETTINGS = {
    // About page sequence timing
    sectionScrollMultiplier: 0.8,    // How much of section height to use (0.5 = faster, 1.0 = slower)
    startOffset: 0.15,               // When first element appears (0.0 = immediately, 0.2 = later) - increased to make quote appear later
    elementSpacing: 0.12,            // Time between elements (0.1 = faster, 0.2 = slower) - reduced to make education appear sooner
    popInSpeed: 0.08,                // How fast each element pops in (0.05 = faster, 0.1 = slower)
    
    // Animation properties
    animationDuration: 0.6,          // Duration of pop-in animation
    popInDistance: 30,               // How far elements move when popping in
    quoteFadeAmount: 0.7             // How much quote fades out (0.5 = more visible, 1.0 = invisible)
  };

  // Sequential pop-in/pop-out animations with specific order for about page
  function updateWordVisibility() {
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + window.innerHeight;
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const viewportHeight = window.innerHeight;
    
    // Define the specific about page sequence
    const aboutSequence = [
      { selector: '.about-quote-full p', name: 'quote' },
      { selector: '.about-left h2', name: 'greeting' },
      { selector: '.about-photo', name: 'photo' },
      { selector: '.about-welcome', name: 'welcome' },
      { selector: '.about-right p:not(.about-welcome)', name: 'description' },
      { selector: '.journey-btn', name: 'button' },
      { selector: '.education-left h2, .education-right', name: 'education' }
    ];
    
    // Handle about page sequence
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutProgress = Math.max(0, Math.min(1, (viewportHeight - aboutRect.top) / (aboutRect.height * ANIMATION_SETTINGS.sectionScrollMultiplier)));
      
      aboutSequence.forEach((item, index) => {
        const elements = document.querySelectorAll(item.selector);
        const triggerPoint = ANIMATION_SETTINGS.startOffset + (index * ANIMATION_SETTINGS.elementSpacing);
        const fadeOutPoint = Math.min(1, triggerPoint + 0.15);
        
        elements.forEach(element => {
          let targetOpacity = 0;
          let targetY = ANIMATION_SETTINGS.popInDistance;
          let targetScale = 0.95;
          
          // Pop in when scroll reaches trigger point
          if (aboutProgress >= triggerPoint) {
            const popInProgress = Math.max(0, Math.min(1, (aboutProgress - triggerPoint) / ANIMATION_SETTINGS.popInSpeed));
            
            // Special handling for quote (fades out when photo appears)
            if (item.name === 'quote' && aboutProgress >= (ANIMATION_SETTINGS.startOffset + (2 * ANIMATION_SETTINGS.elementSpacing))) {
              const fadeOutProgress = Math.max(0, Math.min(1, (aboutProgress - fadeOutPoint) / ANIMATION_SETTINGS.popInSpeed));
              targetOpacity = 1 - (fadeOutProgress * ANIMATION_SETTINGS.quoteFadeAmount);
              targetY = -fadeOutProgress * 20;
              targetScale = 1 - (fadeOutProgress * 0.03);
            } else {
              // Normal pop-in animation
              targetOpacity = popInProgress;
              targetY = ANIMATION_SETTINGS.popInDistance * (1 - popInProgress);
              targetScale = 0.95 + (0.05 * popInProgress);
            }
          }
          
          // Apply animation
          gsap.to(element, {
            opacity: targetOpacity,
            y: targetY,
            scale: targetScale,
            duration: ANIMATION_SETTINGS.animationDuration,
            ease: "back.out(1.4)",
            overwrite: true
          });
        });
      });
    }
    
    // Handle other page elements with standard fade animation
    const otherElements = document.querySelectorAll('h1, h2, h3, p, .journey-btn, .typed-words, .tech');
    
    otherElements.forEach(element => {
      // Skip about page elements (already handled above)
      if (element.closest('#about')) return;
      
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementCenter = elementTop + rect.height / 2;
      
      // Standard fade zones for non-about elements
      const topFadeZone = viewportTop + (viewportHeight * 0.2);
      const bottomFadeZone = viewportBottom - (viewportHeight * 0.2);
      
      let targetOpacity = 1;
      let targetY = 0;
      let targetScale = 1;
      
      if (elementCenter < topFadeZone) {
        const fadeProgress = Math.max(0, Math.min(1, (topFadeZone - elementCenter) / (viewportHeight * 0.3)));
        targetOpacity = 1 - (fadeProgress * 0.8);
        targetY = -fadeProgress * 30;
        targetScale = 1 - (fadeProgress * 0.05);
      } else if (elementCenter > bottomFadeZone) {
        const fadeProgress = Math.max(0, Math.min(1, (elementCenter - bottomFadeZone) / (viewportHeight * 0.3)));
        targetOpacity = 1 - (fadeProgress * 0.9);
        targetY = fadeProgress * 40;
        targetScale = 1 - (fadeProgress * 0.08);
      }
      
      gsap.to(element, {
        opacity: targetOpacity,
        y: targetY,
        scale: targetScale,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });
    });
  }

  // Add scroll event listener for fade-in/fade-out animations
  window.addEventListener('scroll', updateWordVisibility, { passive: true });
  window.addEventListener('DOMContentLoaded', updateWordVisibility);
  
  
  // Initialize element animations
  initializeElementAnimations();

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

  // Per-letter repel/magnetic animation for hero name
  const heroSpacer = document.querySelector('.hero-spacer');
  if (heroSpacer) {
    const letters = heroSpacer.querySelectorAll('.hero-name span');
    heroSpacer.addEventListener('mousemove', (e) => {
      const rect = heroSpacer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      letters.forEach(letter => {
        const letterRect = letter.getBoundingClientRect();
        const letterX = letterRect.left + letterRect.width / 2 - rect.left;
        const letterY = letterRect.top + letterRect.height / 2 - rect.top;
        const dx = mouseX - letterX;
        const dy = mouseY - letterY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 180; // px
        if (dist < maxDist) {
          const repel = (1 - dist / maxDist) * 60; // max 60px movement for more effect
          const angle = Math.atan2(dy, dx);
          const tx = -Math.cos(angle) * repel;
          const ty = -Math.sin(angle) * repel;
          gsap.to(letter, {
            x: tx,
            y: ty,
            scale: 1.18 - (dist / maxDist) * 0.18,
            rotate: (1 - dist / maxDist) * 8 * (Math.random() > 0.5 ? 1 : -1),
            duration: 0.32,
            ease: 'expo.out',
            overwrite: true
          });
        } else {
          gsap.to(letter, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: 'expo.out',
            overwrite: true
          });
        }
      });
    });
    heroSpacer.addEventListener('mouseleave', () => {
      letters.forEach(letter => {
        gsap.to(letter, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
          overwrite: true
        });
      });
    });
  }
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

// Element animation system
function initializeElementAnimations() {
  const animatableElements = [
    '.about-quote-full p',
    '.about-welcome',
    '.about-photo',
    '.about-right p:not(.about-welcome)',
    '.journey-btn',
    '.education-left h2',
    '.education-right',
    '.stack-heading',
    '.tech'
  ];
  
  animatableElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.dataset.animated = 'false';
    });
  });
}

// Removed duplicate animation system - using only updateWordVisibility now

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function throttledAnimationHandler() {
  if (!window.animationTicking) {
    window.animationTicking = true;
    requestAnimationFrame(() => {
      handleElementAnimations();
      window.animationTicking = false;
    });
  }
}

// Debounced scroll handler for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Removed debounced handler - using simpler system

// Removed duplicate scroll handlers - using main handleWheel function above

// Remove all custom scroll logic and handlers
// Only keep the smooth floating/fading animation for hero and about content
function animateSectionFloat() {
  const heroSection = document.getElementById('hero');
  const aboutSection = document.getElementById('about');
  const heroContent = document.querySelector('.hero-content');
  const heroStats = document.querySelector('.hero-stats-bottom.hero-stats-left');
  const aboutContent = document.querySelector('.about-content');
  const aboutQuote = document.querySelector('.about-quote-full');

  // Animate hero content (unchanged)
  if (heroSection && heroContent && heroStats) {
    const heroRect = heroSection.getBoundingClientRect();
    let progress = Math.min(1, Math.max(0, -heroRect.top / heroRect.height));
    gsap.to([heroContent, heroStats], {
      y: -progress * 80,
      opacity: 1 - progress * 1.1,
      duration: 0.4, // FADE OUT FASTER
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

// Add scroll event listeners
window.addEventListener('scroll', animateSectionFloat);
window.addEventListener('DOMContentLoaded', animateSectionFloat);

// STICKY HERO FADE OUT ON SCROLL - Background stays fixed, content slides up
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const heroSpacer = document.querySelector('.hero-spacer');
  const aboutSection = document.getElementById('about');
  if (!hero || !heroSpacer || !aboutSection) return;
  
  const fadeStart = 0;
  const fadeEnd = window.innerHeight * 0.4; // MUCH FASTER FADE (was 1.5)
  const scrollY = window.scrollY;
  let opacity = 1;
  
  if (scrollY > fadeStart) {
    opacity = 1 - Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));
  }
  
  // Fade the fixed background
  gsap.set(hero, {
    opacity: opacity,
    overwrite: true
  });
  
  // Fade the scrolling names as they move up
  gsap.set(heroSpacer, {
    opacity: opacity,
    overwrite: true
  });
  
  // Animate about section content sliding up
  const slideStart = window.innerHeight * 0.5;
  if (scrollY > slideStart) {
    const slideProgress = Math.min(1, (scrollY - slideStart) / (window.innerHeight * 0.5));
    gsap.set(aboutSection, {
      y: 0,
      opacity: 1,
      overwrite: true
    });
  } else {
    gsap.set(aboutSection, {
      y: 100,
      opacity: 0.8,
      overwrite: true
    });
  }
});

// --- Enhanced Human Typing Animation for Bio ---
const humanTypingSequence = [
  { text: "Hi! I'm ", speed: 75 },
  { text: "Thomas", speed: 110, bold: true, color: "#000", effect: "glow", boldDelay: 500 },
  { text: ", an undergraduate mathematics and computer science major at ", speed: 65 },
  { text: "UPenn", speed: 80, emphasis: true },
  { pause: 300 },
  { text: ".", speed: 80 },
  { text: " I love turning strategic thinking", speed: 65 },
  { pause: 1000, cursorBlink: "thinking" },
  { backspace: 26, speed: 40 }, // "turning strategic thinking"
  { text: "applying game theory and mathematical reasoning into software solutions.", speed: 60 }
];

class HumanTypeWriter {
  constructor(element, cursor) {
    this.element = element;
    this.cursor = cursor;
    this.text = '';
    this._thomasStart = null;
    this._thomasEnd = null;
    this._thomasBolded = false;
  }

  async type(sequence) {
    for (let step of sequence) {
      if (step.text && step.bold && step.text === "Thomas" && step.boldDelay) {
        // Type 'Thomas' normally, then bold after delay
        this._thomasStart = this.text.length;
        await this.addText(step.text, step.speed, {});
        this._thomasEnd = this.text.length;
        await this.wait(step.boldDelay);
        this.boldThomas(step.color);
      } else if (step.text) {
        await this.addText(step.text, step.speed, step);
      } else if (step.backspace) {
        await this.deleteText(step.backspace, step.speed);
      } else if (step.pause) {
        if (step.cursorBlink === "thinking") {
          this.cursor.classList.add('thinking');
        }
        await this.wait(step.pause);
        this.cursor.classList.remove('thinking');
      }
    }
  }

  boldThomas(color) {
    if (this._thomasStart !== null && this._thomasEnd !== null && !this._thomasBolded) {
      this.text =
        this.text.slice(0, this._thomasStart) +
        `<span class=\"typing-bold\" style=\"color:${color};\">Thomas</span>` +
        this.text.slice(this._thomasEnd);
      this.element.innerHTML = this.text;
      this._thomasBolded = true;
    }
  }

  async addText(text, speed, options = {}) {
    for (let char of text) {
      if (options.emphasis) {
        if (!this.text.endsWith('</span>')) {
          this.text += `<span class=\"typing-emphasis\">`;
        }
        this.text += char;
        if (this.text.endsWith('UPenn')) {
          this.text += `</span>`;
        }
      } else {
        this.text += char;
      }
      this.element.innerHTML = this.text;
      const humanVariation = speed + (Math.random() * 16 - 8);
      await this.wait(Math.max(humanVariation, 20));
    }
  }

  async deleteText(count, speed = 40) {
    for (let i = 0; i < count; i++) {
      // Handle HTML tags when backspacing
      if (this.text.endsWith('>')) {
        // Remove entire HTML tag
        const lastTag = this.text.lastIndexOf('<');
        this.text = this.text.slice(0, lastTag);
      } else {
        this.text = this.text.slice(0, -1);
      }
      this.element.innerHTML = this.text;
      await this.wait(speed);
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const bioTextEl = document.getElementById('bio-text');
const bioCursorEl = document.getElementById('bio-cursor');

// Hide role cursor and clear role text initially
if (typedEl) {
  typedEl.classList.remove('cursor-visible');
  typedEl.classList.remove('typing');
  typedEl.textContent = '';
}
// Show bio cursor
if (bioCursorEl) bioCursorEl.style.opacity = 1;

// Start human typing animation on DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
  const typewriter = new HumanTypeWriter(bioTextEl, bioCursorEl);
  await typewriter.type(humanTypingSequence);
  // Hide bio cursor, show role cursor, start role typing after 1s delay
  if (bioCursorEl) bioCursorEl.style.opacity = 0;
  setTimeout(() => {
    if (typedEl) typedEl.classList.add('cursor-visible');
    typeRole();
  }, 1000);
});