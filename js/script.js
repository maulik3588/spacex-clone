/**
 * ============================================================================
 * SpaceX Website Clone - Vanilla JavaScript
 * Pure JavaScript with zero frameworks or external dependencies.
 * Clean, well-structured, modular, and beginner-friendly.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ------------------------------------------------------------------------
    // 1. DOM Elements Selection
    // ------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideLinks = document.querySelectorAll('.side-link');
    const sections = document.querySelectorAll('.section');
    const body = document.body;

    // Modal elements
    const specsModal = document.getElementById('specsModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalDismissBtn = document.getElementById('modalDismissBtn');
    const modalVehicleTag = document.getElementById('modalVehicleTag');
    const modalVehicleTitle = document.getElementById('modalVehicleTitle');
    const modalVehicleDesc = document.getElementById('modalVehicleDesc');
    const modalVehicleGrid = document.getElementById('modalVehicleGrid');
    const exploreButtons = document.querySelectorAll('[data-modal]');


    // ------------------------------------------------------------------------
    // 2. Technical Vehicle & Program Data (SpaceX Specs)
    // ------------------------------------------------------------------------
    const vehicleData = {
        'starship': {
            tag: 'MOST POWERFUL LAUNCH VEHICLE',
            title: 'STARSHIP & SUPER HEAVY',
            desc: "Starship is a fully reusable transportation system designed to carry both crew and cargo to Earth orbit, the Moon, Mars and beyond.",
            specs: [
                { label: 'HEIGHT', value: '121 m / 397 ft' },
                { label: 'DIAMETER', value: '9 m / 29.5 ft' },
                { label: 'PAYLOAD TO LEO', value: '150+ t (Reusable)' },
                { label: 'LIFTOFF THRUST', value: '16.7M lbf (74.3 MN)' },
                { label: 'ENGINES', value: '33 Raptor Engines' },
                { label: 'PROPELLANT', value: 'Liquid CH4 / LOX' },
                { label: 'REUSABILITY', value: '100% Fully Reusable' },
                { label: 'HEAT SHIELD', value: '18,000+ Hex Tiles' }
            ]
        },
        'falcon9': {
            tag: 'FIRST ORBITAL CLASS REUSABLE ROCKET',
            title: 'FALCON 9',
            desc: "Falcon 9 is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of people and payloads into Earth orbit and beyond.",
            specs: [
                { label: 'HEIGHT', value: '70 m / 229.6 ft' },
                { label: 'DIAMETER', value: '3.7 m / 12 ft' },
                { label: 'MASS', value: '549,054 kg / 1.2M lb' },
                { label: 'PAYLOAD TO LEO', value: '22,800 kg / 50,265 lb' },
                { label: 'FIRST STAGE ENGINES', value: '9 Merlin 1D Engines' },
                { label: 'SECOND STAGE', value: '1 Merlin Vacuum' },
                { label: 'LANDINGS', value: '300+ Booster Landings' },
                { label: 'PROPELLANT', value: 'RP-1 / Liquid Oxygen' }
            ]
        },
        'falcon-heavy': {
            tag: 'HEAVY LIFT LAUNCH VEHICLE',
            title: 'FALCON HEAVY',
            desc: "Composed of three Falcon 9 nine-engine cores, Falcon Heavy generates more than 5 million pounds of thrust at liftoff, making it one of the world's most powerful operational rockets.",
            specs: [
                { label: 'HEIGHT', value: '70 m / 229.6 ft' },
                { label: 'WIDTH', value: '12.2 m / 39.9 ft' },
                { label: 'MASS', value: '1,420,788 kg / 3.1M lb' },
                { label: 'PAYLOAD TO LEO', value: '63,800 kg / 140,660 lb' },
                { label: 'THRUST AT LIFTOFF', value: '22,819 kN / 5.1M lbf' },
                { label: 'FIRST STAGE CORES', value: '3 Falcon Cores (27 Engines)' },
                { label: 'PAYLOAD TO MARS', value: '16,800 kg / 37,040 lb' },
                { label: 'SIDE BOOSTERS', value: 'Simultaneous Dual Landing' }
            ]
        },
        'dragon': {
            tag: 'HUMAN & CARGO SPACECRAFT',
            title: 'DRAGON SPACECRAFT',
            desc: "The Dragon spacecraft is capable of carrying up to 7 passengers to and from Earth orbit, and beyond. It is the only operational spacecraft currently flying that is capable of returning significant amounts of cargo to Earth.",
            specs: [
                { label: 'HEIGHT', value: '8.1 m / 26.7 ft' },
                { label: 'DIAMETER', value: '4 m / 13 ft' },
                { label: 'CAPSULE VOLUME', value: '9.3 m³ / 328 ft³' },
                { label: 'CREW CAPACITY', value: 'Up to 7 Astronauts' },
                { label: 'LAUNCH PAYLOAD', value: '6,000 kg / 13,228 lb' },
                { label: 'RETURN PAYLOAD', value: '3,000 kg / 6,614 lb' },
                { label: 'DRACO THRUSTERS', value: '16 Attitude Control' },
                { label: 'SUPERDRACO ENGINES', value: '8 Launch Escape' }
            ]
        },
        'human-spaceflight': {
            tag: 'COMMERCIAL SPACE EXPLORATION',
            title: 'HUMAN SPACEFLIGHT',
            desc: "SpaceX is making life multiplanetary, flying private astronaut missions including Inspiration4 and Polaris Dawn, conducting commercial spacewalks, and preparing for missions to Mars.",
            specs: [
                { label: 'CREW MISSIONS', value: '15+ Human Spaceflights' },
                { label: 'ORBITAL ALTITUDE', value: '1,400+ km (Record Orbit)' },
                { label: 'COMMERCIAL EVA', value: 'First Commercial Spacewalk' },
                { label: 'SPACESUIT', value: 'SpaceX 3D-Printed IVA/EVA' },
                { label: 'HELMET HUD', value: 'Thermal & Heads-Up Display' },
                { label: 'AUTONOMOUS DOCKING', value: '100% Automated with ISS' },
                { label: 'DESTINATIONS', value: 'LEO, Lunar Orbit, Mars' },
                { label: 'TRAINING PROGRAM', value: 'Centrifuge, Hypoxia, Zero-G' }
            ]
        },
        'starlink': {
            tag: 'GLOBAL SATELLITE NETWORK',
            title: 'STARLINK CONSTELLATION',
            desc: "Starlink is the world's first and largest satellite constellation using low Earth orbit to deliver broadband internet capable of supporting streaming, video calls, and gaming worldwide.",
            specs: [
                { label: 'ORBITAL ALTITUDE', value: '~550 km (Low Earth Orbit)' },
                { label: 'ACTIVE SATELLITES', value: '6,000+ In Orbit' },
                { label: 'LATENCY', value: '20 - 40 milliseconds' },
                { label: 'INTER-SATELLITE LINKS', value: 'Optical Space Lasers' },
                { label: 'PROPULSION', value: 'Argon Hall Effect Thrusters' },
                { label: 'COVERAGE', value: 'Global (Over 100 Countries)' },
                { label: 'DEMISABILITY', value: '100% Burns Up on Reentry' },
                { label: 'DIRECT-TO-CELL', value: 'Mobile Satellite Connectivity' }
            ]
        },
        'rideshare': {
            tag: 'DEDICATED SMALLSAT MISSIONS',
            title: 'TRANSPORTER RIDESHARE',
            desc: "SpaceX's SmallSat Rideshare Program provides dedicated Falcon 9 rideshare flights to Sun-Synchronous Orbit (SSO) with scheduled, reliable departures.",
            specs: [
                { label: 'BASE PRICE', value: '$300,000 for 50 kg' },
                { label: 'FLIGHT CADENCE', value: 'Every ~4 Months' },
                { label: 'TARGET ORBITS', value: 'SSO, Mid-Inc, GTO' },
                { label: 'INTERFACE PORTS', value: '8", 15", 24" ESPA Standard' },
                { label: 'SEPARATION SYSTEMS', value: 'Customer or SpaceX Provided' },
                { label: 'ONLINE BOOKING', value: 'Instant Reservation System' },
                { label: 'DEPLOYMENT ORBIT', value: '500-600 km Altitude' },
                { label: 'PAYLOAD MASS', value: 'Up to several tons total' }
            ]
        },
        'mission': {
            tag: 'SPACEX VISION',
            title: 'MAKING LIFE MULTIPLANETARY',
            desc: "SpaceX was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets and ensuring the future of humanity.",
            specs: [
                { label: 'FOUNDED', value: '2002 by Elon Musk' },
                { label: 'HEADQUARTERS', value: 'Starbase, Boca Chica, Texas' },
                { label: 'PRIMARY GOAL', value: 'Self-Sustaining Mars City' },
                { label: 'FIRST ORBITAL LAUNCH', value: 'Falcon 1 (2008)' },
                { label: 'FIRST REUSE', value: 'Falcon 9 (2017)' },
                { label: 'CREW TO ISS', value: 'Demo-2 (2020)' }
            ]
        },
        'launches': {
            tag: 'FLIGHT RECORD',
            title: 'LAUNCH MANIFEST & CADENCE',
            desc: "SpaceX has achieved world-leading launch cadence, launching orbital rockets at rates unmatched in aerospace history with unmatched safety and reliability.",
            specs: [
                { label: 'TOTAL LAUNCHES', value: '400+ Orbital Launches' },
                { label: 'TOTAL LANDINGS', value: '360+ Successful Landings' },
                { label: 'REFLOWN ROCKETS', value: '330+ Re-flights' },
                { label: 'RECORD BOOSTER', value: '22+ Flights Single Booster' },
                { label: 'LAUNCH PADS', value: 'SLC-40, LC-39A, SLC-4E, Starbase' },
                { label: 'DRONESIPS', value: 'ASOG, JRTI, OCISLY' }
            ]
        },
        'careers': {
            tag: 'JOIN OUR TEAM',
            title: 'CAREERS AT SPACEX',
            desc: "SpaceX is looking for top talent ready to tackle the extraordinary. Build rockets, write avionics software, design spacecraft, and help humanity reach Mars.",
            specs: [
                { label: 'LOCATIONS', value: 'Hawthorne, Starbase, McGregor, Cape' },
                { label: 'DISCIPLINES', value: 'Propulsion, Avionics, Software, Launch' },
                { label: 'MISSION', value: 'Rapid Engineering & Iteration' },
                { label: 'CULTURE', value: 'First Principles Thinking' }
            ]
        },
        'updates': {
            tag: 'LATEST NEWS',
            title: 'MISSION & PROGRAM UPDATES',
            desc: "Stay informed on upcoming Starship Integrated Flight Tests, Falcon 9 satellite launches, Starlink deployments, and Commercial Crew milestones.",
            specs: [
                { label: 'STARSHIP IFT', value: 'Next Flight In Preparation' },
                { label: 'CREW MISSIONS', value: 'Upcoming ISS Crew Rotations' },
                { label: 'LUNAR STARSHIP', value: 'NASA Artemis III & IV Lander' },
                { label: 'FREQUENCY', value: 'Updates Posted Continuously' }
            ]
        },
        'privacy': {
            tag: 'LEGAL & POLICY',
            title: 'PRIVACY NOTICE',
            desc: "This educational clone does not collect, store, or sell personal data. The official SpaceX website maintains strict privacy practices per global standards.",
            specs: [
                { label: 'DATA COLLECTION', value: 'None (Pure Static Website)' },
                { label: 'COOKIES', value: 'No Tracking Cookies Used' },
                { label: 'DISCLAIMER', value: 'Independent Educational Fan Clone' }
            ]
        },
        'suppliers': {
            tag: 'PARTNERSHIP',
            title: 'SUPPLIER INFORMATION',
            desc: "SpaceX partners with high-quality aerospace and manufacturing suppliers committed to precision, innovation, and rapid delivery schedules.",
            specs: [
                { label: 'QUALITY STANDARD', value: 'AS9100 / ISO 9001 Alignment' },
                { label: 'SUPPLY CHAIN', value: 'Global Aerospace Component Base' },
                { label: 'REQUIREMENT', value: 'ITAR & Export Compliance' }
            ]
        },
        'contact': {
            tag: 'COMMUNICATIONS',
            title: 'MEDIA & INQUIRIES',
            desc: "For inquiries regarding satellite launches, rideshare services, commercial crew flights, or media information, contact the respective departments.",
            specs: [
                { label: 'SALES & LAUNCH', value: 'sales@spacex.com' },
                { label: 'MEDIA RELATIONS', value: 'media@spacex.com' },
                { label: 'WEBSITE INQUIRIES', value: 'info@spacex.com' }
            ]
        }
    };


    // ------------------------------------------------------------------------
    // 3. Navigation Bar Scroll Glassmorphism Transition
    // ------------------------------------------------------------------------
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Initialize state on load
    handleNavbarScroll();


    // ------------------------------------------------------------------------
    // 4. Slide-Out Side Navigation Drawer (Open / Close)
    // ------------------------------------------------------------------------
    const openSideMenu = () => {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        sideMenu.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
    };

    const closeSideMenu = () => {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        sideMenu.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    };

    menuToggle.addEventListener('click', () => {
        if (sideMenu.classList.contains('active')) {
            closeSideMenu();
        } else {
            openSideMenu();
        }
    });

    closeMenuBtn.addEventListener('click', closeSideMenu);
    menuOverlay.addEventListener('click', closeSideMenu);


    // ------------------------------------------------------------------------
    // 5. Smooth Scrolling for Internal Links
    // ------------------------------------------------------------------------
    const handleAnchorClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        // If link opens modal instead of jumping
        const modalKey = e.currentTarget.getAttribute('data-modal');
        if (modalKey && vehicleData[modalKey]) {
            e.preventDefault();
            closeSideMenu();
            openSpecsModal(modalKey);
            return;
        }

        // Only handle valid in-page hash anchors
        if (href && href.startsWith('#') && href.length > 1) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                closeSideMenu();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update browser URL hash cleanly without abrupt jump
                history.pushState(null, '', href);
            }
        }
    };

    navLinks.forEach(link => link.addEventListener('click', handleAnchorClick));
    sideLinks.forEach(link => link.addEventListener('click', handleAnchorClick));

    // Scroll Down chevron in Starship Hero
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const falcon9Section = document.getElementById('falcon9');
            if (falcon9Section) {
                falcon9Section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // ------------------------------------------------------------------------
    // 6. Section Entrance Animation (Intersection Observer)
    // ------------------------------------------------------------------------
    if ('IntersectionObserver' in window) {
        const sectionObserverOptions = {
            root: null,
            threshold: 0.25 // Trigger when 25% of section is visible
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    // Optional: remove in-view when leaving viewport for re-animation
                    // entry.target.classList.remove('in-view');
                }
            });
        }, sectionObserverOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for older browsers without IntersectionObserver
        sections.forEach(section => section.classList.add('in-view'));
    }


    // ------------------------------------------------------------------------
    // 7. Interactive Vehicle Specifications Modal
    // ------------------------------------------------------------------------
    const openSpecsModal = (vehicleKey) => {
        const data = vehicleData[vehicleKey];
        if (!data) return;

        modalVehicleTag.textContent = data.tag;
        modalVehicleTitle.textContent = data.title;
        modalVehicleDesc.textContent = data.desc;

        // Populate specs grid
        modalVehicleGrid.innerHTML = '';
        data.specs.forEach(spec => {
            const item = document.createElement('div');
            item.className = 'spec-item';

            const label = document.createElement('span');
            label.className = 'spec-label';
            label.textContent = spec.label;

            const value = document.createElement('span');
            value.className = 'spec-value';
            value.textContent = spec.value;

            item.appendChild(label);
            item.appendChild(value);
            modalVehicleGrid.appendChild(item);
        });

        specsModal.classList.add('active');
        specsModal.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
    };

    const closeSpecsModal = () => {
        specsModal.classList.remove('active');
        specsModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    };

    // Attach click listener to explore buttons
    exploreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const vehicleKey = btn.getAttribute('data-modal');
            if (vehicleKey && vehicleData[vehicleKey]) {
                e.preventDefault();
                openSpecsModal(vehicleKey);
            }
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSpecsModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeSpecsModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeSpecsModal);


    // ------------------------------------------------------------------------
    // 8. Keyboard Accessibility (Escape key closes open menus and modals)
    // ------------------------------------------------------------------------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (specsModal.classList.contains('active')) {
                closeSpecsModal();
            } else if (sideMenu.classList.contains('active')) {
                closeSideMenu();
            }
        }
    });

    console.log('SpaceX Clone initialized successfully.');
});
