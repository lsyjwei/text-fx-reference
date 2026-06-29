document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP Animation for Dropdown Menus ---
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    const glitchText = document.querySelector('.glitch-text');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const menuId = btn.nextElementSibling.id;
            const menu = document.getElementById(menuId);
            const isOpen = menu.style.opacity === '1';

            // Close all other open menus
            dropdownMenus.forEach(otherMenu => {
                if (otherMenu.id !== menuId && otherMenu.style.opacity === '1') {
                    gsap.to(otherMenu, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            otherMenu.style.visibility = 'hidden';
                        }
                    });
                }
            });

            // Toggle the clicked menu
            if (isOpen) {
                gsap.to(menu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        menu.style.visibility = 'hidden';
                    }
                });
            } else {
                menu.style.visibility = 'visible';
                gsap.fromTo(menu, {
                    opacity: 0,
                    y: -20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                    delay: 0.1
                });
            }
        });
    });

    // --- Hero Text Glitch Effect ---
    function glitchHeroText() {
        gsap.to(glitchText, {
            keyframes: {
                '0%': { x: 0, y: 0, rotation: 0 },
                '20%': { x: -5, y: 2, rotation: -1 },
                '40%': { x: 5, y: -2, rotation: 1 },
                '60%': { x: -3, y: 3, rotation: -0.5 },
                '80%': { x: 2, y: -2, rotation: 0.5 },
                '100%': { x: 0, y: 0, rotation: 0 }
            },
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 3
        });
    }
    glitchHeroText();

    // --- Projects Grid 3D Parallax on Hover ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                ease: "power1.out",
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Footer Particle Effect on Social Icons ---
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const iconRect = icon.getBoundingClientRect();
            const centerX = iconRect.left + iconRect.width / 2;
            const centerY = iconRect.top + iconRect.height / 2;

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    width: 5px;
                    height: 5px;
                    background-color: ${i % 2 === 0 ? 'var(--primary-color)' : 'var(--accent-color)'};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(particle);

                const endX = centerX + Math.random() * 200 - 100;
                const endY = centerY + Math.random() * 200 - 100;

                gsap.to(particle, {
                    x: endX,
                    y: endY,
                    opacity: 0,
                    duration: Math.random() * 1 + 0.5,
                    onComplete: () => {
                        particle.remove();
                    }
                });
            }
        });
    });
});