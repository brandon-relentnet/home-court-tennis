import gsap from 'gsap';

export function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic-btn');

    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magnet, {
                x: x * 0.4, // degree of pull
                y: y * 0.4,
                duration: 1,
                ease: 'power3.out'
            });

            const span = magnet.querySelector('span');
            if (span) {
                gsap.to(span, {
                    x: x * 0.2, // inner parallax
                    y: y * 0.2,
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });

            const span = magnet.querySelector('span');
            if (span) {
                gsap.to(span, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    });
}
