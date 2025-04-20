 // This is the corrected JavaScript for your portfolio's "See More/Less" functionality
 document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        window.scrollY > 50 ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    let isExpanded = false;

    // Function to handle project filtering
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isHidden = card.classList.contains('hidden');

            // If projects are expanded or card is not hidden by default
            if (!isHidden || isExpanded) {
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                    setTimeout(() => {
                        card.classList.remove('fade-in');
                    }, 500);
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    // Set up category button click events
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    // See More/Less button functionality
    seeMoreBtn.addEventListener('click', () => {
        const hiddenProjects = document.querySelectorAll('.project-card.hidden');
        const activeFilter = document.querySelector('.category-btn.active').getAttribute('data-filter');

        if (!isExpanded) {
            // Show more - display hidden projects
            hiddenProjects.forEach(project => {
                project.classList.remove('hidden');

                if (activeFilter === 'all' || project.getAttribute('data-category').includes(activeFilter)) {
                    project.style.display = 'block';
                    project.classList.add('fade-in');
                    setTimeout(() => project.classList.remove('fade-in'), 500);
                } else {
                    project.style.display = 'none';
                }
            });

            seeMoreBtn.textContent = 'Show Less';
            isExpanded = true;
        } else {
            // Show less - hide projects again
            document.querySelectorAll('.project-card').forEach(project => {
                if (project.classList.contains('hidden') || project.classList.contains('hidden') === false) {
                    if (Array.from(document.querySelectorAll('.project-card')).indexOf(project) >= 4) {
                        project.classList.add('hidden');
                        project.style.display = 'none';
                    }
                }
            });

            seeMoreBtn.textContent = 'See More Projects';
            isExpanded = false;
        }
    });

    // Add animation styles
    const fadeStyle = document.createElement('style');
    fadeStyle.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.5s ease forwards; }
`;
    document.head.appendChild(fadeStyle);
});