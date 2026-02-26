import gsap from 'gsap';

export function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic-btn');
    const cleanups = [];

    magnets.forEach((magnet) => {
        const onMove = (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magnet, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 1,
                ease: 'power3.out'
            });

            const span = magnet.querySelector('span');
            if (span) {
                gsap.to(span, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        };

        const onLeave = () => {
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
        };

        magnet.addEventListener('mousemove', onMove);
        magnet.addEventListener('mouseleave', onLeave);

        cleanups.push(() => {
            magnet.removeEventListener('mousemove', onMove);
            magnet.removeEventListener('mouseleave', onLeave);
        });
    });

    return () => cleanups.forEach((fn) => fn());
}
