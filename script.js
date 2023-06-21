const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        };
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.75
})



document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelectorAll('section')

    content.forEach((item) => {
        observer.observe(item)
    });
})



