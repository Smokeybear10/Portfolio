// GSAP ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// HERO TEXT FADING & ROTATING ROLES
const roles = [
  "Frontend Dev",
  "Mathematician",
  "AI Engineer",
  "Statistical Analyst",
  "Quant Analyst",
  "Poker Nerd"
];
const typingDelay = 120, erasingDelay = 80, newTextDelay = 2500;
let roleIndex = 0, charIndex = 0;
const typedEl = document.querySelector(".typed-words");
let isTyping = false;

function typeRole() {
  if (!typedEl) return;
  
  // Ensure we're in typing mode
  if (!isTyping) {
    isTyping = true;
    typedEl.classList.add('typing');
  }
  
  if (charIndex < roles[roleIndex].length) {
    typedEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeRole, typingDelay + Math.random() * 40 - 20); // Add slight variation
  } else {
    // Finished typing this word
    isTyping = false;
    typedEl.classList.remove('typing');
    setTimeout(eraseRole, newTextDelay);
  }
}

function eraseRole() {
  if (!typedEl) return;
  
  // Ensure we're in erasing mode
  if (!isTyping) {
    isTyping = true;
    typedEl.classList.add('typing');
  }
  
  if (charIndex > 0) {
    typedEl.textContent = roles[roleIndex].substring(0, charIndex--);
    setTimeout(eraseRole, erasingDelay);
  } else {
    // Move to next role
    roleIndex = (roleIndex + 1) % roles.length;
    typedEl.textContent = "";
    
    // Brief pause with cursor hidden between words
    isTyping = false;
    typedEl.classList.remove('typing');
    setTimeout(() => {
      typeRole();
    }, 300);
  }
}



document.addEventListener("DOMContentLoaded", () => {

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
    aboutSection.scrollIntoView({ behavior: 'smooth' });
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
      // Special handling for typed-words to make it appear later when scrolling
      let topFadeZone, bottomFadeZone;
      if (element.classList.contains('typed-words')) {
        topFadeZone = viewportTop + (viewportHeight * 0.4); // Increased from 0.2 to 0.4 - appears later
        bottomFadeZone = viewportBottom - (viewportHeight * 0.4);
      } else {
        topFadeZone = viewportTop + (viewportHeight * 0.2);
        bottomFadeZone = viewportBottom - (viewportHeight * 0.2);
      }
      
      let targetOpacity = 1;
      let targetY = 0;
      let targetScale = 1;
      
      // Handle typed-words loading animation 
      if (element.classList.contains('typed-words')) {
        const isVisible = elementCenter >= topFadeZone && elementCenter <= bottomFadeZone;
        
        if (isVisible) {
          // Show the element and start loading animation
          if (!element.classList.contains('show')) {
            element.classList.add('show');
            console.log('Typed-words now visible, starting loading animation');
            startLoadingAnimation();
          }
          
          // If bio is complete and loading is running, start the deletion sequence
          if (bioTypingComplete && loadingInterval && !element.classList.contains('role-typing-started')) {
            element.classList.add('role-typing-started'); // Prevent multiple triggers
            console.log('Starting role typing sequence');
            setTimeout(async () => {
              await deleteLoadingText();
              roleIndex = 0;
              charIndex = 0;
              isTyping = false;
              typeRole();
            }, 2000); // 2 second delay to see loading animation
          }
        }
      }
      
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
  window.addEventListener('scroll', updateWordVisibility);
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

// Centered progress bar overlay logic
window.addEventListener('scroll', () => {
  const overlay = document.getElementById('about-overlay');
  const progressBar = document.getElementById('about-scroll-progress');
  const progressFill = progressBar ? progressBar.querySelector('.progress-bar-fill') : null;
  const aboutSection = document.getElementById('about');
  const hero = document.getElementById('hero');
  if (!overlay || !progressBar || !progressFill || !aboutSection || !hero) return;

  const heroOpacity = parseFloat(window.getComputedStyle(hero).opacity);
  if (heroOpacity > 0.01) {
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    return;
  }

  const aboutRect = aboutSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let progress = 0;
  if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
    progress = Math.max(0, Math.min(1, 6 * (windowHeight - aboutRect.top) / (aboutRect.height + windowHeight))); // Faster progress bar
  }
  progressFill.style.width = Math.round(progress * 100) + '%';

  // Hide progress bar when user starts entering experience section
  const experienceSection = document.getElementById('experience');
  if (experienceSection) {
    const expRect = experienceSection.getBoundingClientRect();
    if (expRect.top <= windowHeight * 0.9) {
      overlay.classList.add('hidden');
      overlay.classList.remove('visible');
      return;
    }
  }
  
  // Show progress bar if still in about section
  overlay.classList.add('visible');
  overlay.classList.remove('hidden');
  
  // Fade out about me elements as approaching experience section
  const hiSticky = document.querySelector('.about-hi-sticky');
  const hiPhoto = document.querySelector('.about-hi-photo');
  const hiSubtitle = document.querySelector('.about-hi-subtitle');
  const para1 = document.querySelector('#para-1');
  const para2 = document.querySelector('#para-2');
  const navButtons = document.querySelector('.about-nav-buttons');
  
  if (experienceSection) {
    const expRect = experienceSection.getBoundingClientRect();
    const fadeStartDistance = windowHeight * 2.0; // Start fading when exp section is 1.4 screen heights away
    const fadeEndDistance = windowHeight * 1.5; // Fully faded when exp section is 0.6 screen heights away
    
    let fadeOpacity = 1;
    if (expRect.top <= fadeStartDistance && expRect.top >= fadeEndDistance) {
      fadeOpacity = (expRect.top - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
      shouldFadeOut = true;
      fadeOutOpacity = fadeOpacity;
    } else if (expRect.top < fadeEndDistance) {
      fadeOpacity = 0;
      shouldFadeOut = true;
      fadeOutOpacity = 0;
    } else {
      shouldFadeOut = false;
      fadeOutOpacity = 1;
    }
    
    // Apply fade to all about me elements if fading out
    if (shouldFadeOut) {
      [hiPhoto, hiSubtitle, para1, para2, navButtons].forEach(element => {
        if (element) {
          element.style.opacity = fadeOpacity;
        }
      });
      
      // Only fade out hello text if it's already visible (progress bar completed)
      if (hiSticky && hiSticky.classList.contains('about-hi-sticky-visible')) {
        hiSticky.style.opacity = fadeOpacity;
      }
    }
  }
  
  if (progress >= 1) {
    console.log('Progress reached 100%, showing elements:', { hiSticky, hiPhoto });
    if (hiSticky) hiSticky.classList.add('about-hi-sticky-visible');
    if (hiPhoto) {
      hiPhoto.classList.add('about-hi-photo-visible');
      console.log('Photo element found and visible class added');
    } else {
      console.log('Photo element NOT found');
    }
    // Hide progress bar and THOMAS.EXE
    if (progressBar) progressBar.classList.remove('about-system-progress-visible');
    const thomasExe = document.getElementById('thomas-exe-center');
    if (thomasExe) thomasExe.classList.remove('about-system-center-visible');
  } else {
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    // Fade out about-hi-sticky and photo
    const hiSticky = document.querySelector('.about-hi-sticky');
    const hiPhoto = document.querySelector('.about-hi-photo');
    if (hiSticky) hiSticky.classList.remove('about-hi-sticky-visible');
    if (hiPhoto) hiPhoto.classList.remove('about-hi-photo-visible');
    // Fade in progress bar and THOMAS.EXE
    if (progressBar) progressBar.classList.add('about-system-progress-visible');
    const thomasExe = document.getElementById('thomas-exe-center');
    if (thomasExe) thomasExe.classList.add('about-system-center-visible');
  }
});

// --- Enhanced Human Typing Animation for Bio ---
const humanTypingSequence = [
  { text: "Hi! I'm ", speed: 45 },
  { text: "Thomas", speed: 65, bold: true, color: "#000", effect: "glow", boldDelay: 400 },
  { text: ", an undergraduate mathematics and computer science major at ", speed: 35 },
  { text: "UPenn", speed: 50, emphasis: true },
  { pause: 200 },
  { text: ".", speed: 50 },
  { text: " I love turning strategic thinking", speed: 40 },
  { pause: 800, cursorBlink: "thinking" },
  { backspace: 26, speed: 25 }, // "turning strategic thinking"
  { text: "applying game theory and mathematical reasoning into software solutions.", speed: 35 }
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
    // Bio typing animation is now completely finished
    console.log('Bio typing animation completed');
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
      const humanVariation = speed + (Math.random() * 25 - 12);
      await this.wait(Math.max(humanVariation, 15));
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

// Loading dots animation variables
let loadingInterval = null;
let loadingDotCount = 0;

// Function to animate loading dots (keeping "Loading" centered)
function startLoadingAnimation() {
  if (!typedEl) return;
  
  loadingInterval = setInterval(() => {
    // Use fixed-width spaces for dots to maintain center alignment
    const dots = [
      '   ',     // 0 dots = 3 spaces
      '.  ',     // 1 dot + 2 spaces
      '.. ',     // 2 dots + 1 space
      '...'      // 3 dots
    ];
    typedEl.innerHTML = 'Loading' + dots[loadingDotCount];
    loadingDotCount = (loadingDotCount + 1) % 4; // Cycle through 0, 1, 2, 3 dots
  }, 500); // Change dots every 500ms
}

// Function to stop loading animation and delete text via typing
async function deleteLoadingText() {
  if (!typedEl) return;
  
  // Stop the loading animation
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
  
  const currentText = typedEl.textContent; // Get current loading text with dots
  console.log('Deleting Loading text:', currentText);
  
  // Show cursor for deletion animation
  typedEl.classList.add('cursor-visible');
  typedEl.classList.add('typing');
  
  // Delete current loading text character by character
  for (let i = currentText.length; i > 0; i--) {
    typedEl.textContent = currentText.substring(0, i - 1);
    await new Promise(resolve => setTimeout(resolve, 60 + Math.random() * 20));
  }
  
  // Clean up: remove typing cursor state after deletion is complete
  typedEl.classList.remove('typing');
  
  // Brief pause with empty field
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('Loading text deleted, ready to start role cycle');
}

const bioTextEl = document.getElementById('bio-text');
const bioCursorEl = document.getElementById('bio-cursor');

// Initially hide the typed-words element - will show when scrolled
if (typedEl) {
  typedEl.classList.remove('cursor-visible');
  typedEl.classList.remove('typing');
  typedEl.classList.remove('show'); // Start hidden
  typedEl.textContent = 'Loading   '; // Prepare loading text
}
// Show bio cursor
if (bioCursorEl) bioCursorEl.style.opacity = 1;

// Variable to track if bio typing is complete
let bioTypingComplete = false;

// Variable to track if elements should be fading out
let shouldFadeOut = false;
let fadeOutOpacity = 1;

// Universal fade-in animation that works on all screen sizes
function handleElementFadeIn(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  // If elements should be fading out, don't override with fade-in
  if (shouldFadeOut) {
    element.style.opacity = fadeOutOpacity;
    return;
  }

  const elementRect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Special handling for buttons - keep them visible once they appear
  if (selector === '.about-nav-buttons') {
    // For buttons, once they fade in, keep them visible
    const fadeStartPoint = windowHeight * 0.9; // Start fading when 90% down viewport
    const fadeEndPoint = windowHeight * 0.8;   // Fully visible when 80% down viewport
    
    let fadeProgress = 0;
    
    if (elementRect.top <= fadeStartPoint) {
      if (elementRect.top >= fadeEndPoint) {
        // Element is in the fade zone
        fadeProgress = (fadeStartPoint - elementRect.top) / (fadeStartPoint - fadeEndPoint);
        fadeProgress = Math.max(0, Math.min(1, fadeProgress));
      } else {
        // Element is past fade zone - keep fully visible
        fadeProgress = 1;
      }
    }
    
    // Apply fade effect
    element.style.opacity = fadeProgress;
    
    if (fadeProgress > 0) {
      element.classList.add('fade-in');
    }
    return;
  }
  
  // Regular fade-in for other elements
  const fadeStartPoint = windowHeight * 0.8; // Start fading when 80% down viewport
  const fadeEndPoint = windowHeight * 0.6;   // Fully visible when 60% down viewport
  
  let fadeProgress = 0;
  
  if (elementRect.top <= fadeStartPoint && elementRect.top >= fadeEndPoint) {
    // Element is in the fade zone
    fadeProgress = (fadeStartPoint - elementRect.top) / (fadeStartPoint - fadeEndPoint);
    fadeProgress = Math.max(0, Math.min(1, fadeProgress));
  } else if (elementRect.top < fadeEndPoint) {
    // Element is past fade zone - fully visible
    fadeProgress = 1;
  }

  // Apply fade effect
  element.style.opacity = fadeProgress;

  if (fadeProgress > 0) {
    element.classList.add('fade-in');
  } else {
    element.classList.remove('fade-in');
  }
}

// Handle fade-in for multiple elements - now works on all screen sizes
function handleAllFadeIns() {
  handleElementFadeIn('.about-hi-photo');
  handleElementFadeIn('.about-hi-subtitle');
  handleElementFadeIn('#para-1');
  handleElementFadeIn('#para-2');
  handleElementFadeIn('.about-nav-buttons');
  
  // Debug: check if buttons element exists
  const buttons = document.querySelector('.about-nav-buttons');
  if (!buttons) {
    console.log('Buttons element not found!');
  }
}

// Add scroll listener for all fade-ins
window.addEventListener('scroll', handleAllFadeIns);
window.addEventListener('DOMContentLoaded', handleAllFadeIns);

// Start human typing animation on DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
  // Start bio typing first
  if (bioTextEl && bioCursorEl) {
    const typewriter = new HumanTypeWriter(bioTextEl, bioCursorEl);
    
    // Wait for bio typing to completely finish
    await typewriter.type(humanTypingSequence);
    
    // Hide bio cursor after bio typing is 100% complete
    if (bioCursorEl) bioCursorEl.style.opacity = 0;
    
    // Mark bio typing as complete
    bioTypingComplete = true;
    console.log('Bio typing completed, waiting for user to scroll to loading text');
    
    // Don't automatically start role typing - wait for user to see the loading animation first
    // Role typing will start when loading animation is deleted after user scrolls
  }
});

// Animated background for Education section using Vanta.js GLOBE
window.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA && window.VANTA.GLOBE && document.getElementById('education-bg-animated')) {
    window.VANTA.GLOBE({
      el: '#education-bg-animated',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x1e90ff, // blue accent
      color2: 0xffffff, // white
      backgroundColor: 0xf5f5f5, // white
      size: 1.2,
      points: 16.0,
      maxDistance: 22.0,
      spacing: 18.0,
      showDots: true,
      opacity: 0.18
    });
  }
});