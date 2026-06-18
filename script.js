// script.js
const quotesData = {
    ethics: [
        {text: "Do not impose on others what you do not wish for yourself.", author: "Confucius"},
        {text: "Actions are right in proportion as they tend to promote happiness, wrong as they tend to produce the reverse of happiness.", author: "John Stuart Mill"},
        {text: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.", author: "Immanuel Kant"},
        {text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "Aristotle"}
    ],
    political: [
        {text: "Man is born free, and everywhere he is in chains.", author: "Jean-Jacques Rousseau"},
        {text: "Man is by nature a political animal.", author: "Aristotle"},
        {text: "The end of law is not to abolish or restrain, but to preserve and enlarge freedom.", author: "John Locke"},
        {text: "The philosophers have only interpreted the world in various ways; the point is to change it.", author: "Karl Marx"}
    ],
    aesthetics: [
        {text: "Beauty is truth, truth beauty.", author: "John Keats"},
        {text: "The aim of art is to represent not the outward appearance of things, but their inward significance.", author: "Aristotle"},
        {text: "Art is the highest task and the proper metaphysical activity of life.", author: "Friedrich Nietzsche"},
        {text: "The highest education is that which makes our life in harmony with all existence.", author: "Rabindranath Tagore"}
    ],
    metaphysics: [
        {text: "All men by nature desire to know.", author: "Aristotle"},
        {text: "I think, therefore I am.", author: "René Descartes"},
        {text: "Metaphysics is the finding of bad reasons for what we believe upon instinct.", author: "F.H. Bradley"},
        {text: "The true Self (Atman) is identical with ultimate reality (Brahman); realise this and be free.", author: "Swami Vivekananda"}
    ],
    epistemology: [
        {text: "Knowledge is true opinion accompanied by reason.", author: "Plato"},
        {text: "No man's knowledge here can go beyond his experience.", author: "John Locke"},
        {text: "Thoughts without content are empty, intuitions without concepts are blind.", author: "Immanuel Kant"},
        {text: "The only true wisdom is in knowing you know nothing.", author: "Socrates"}
    ],
    logic: [
        {text: "Logic takes care of itself; all we have to do is to look and see how it does it.", author: "Ludwig Wittgenstein"},
        {text: "A mind all logic is like a knife all blade. It makes the hand bleed that uses it.", author: "Rabindranath Tagore"},
        {text: "The logic of the world is prior to all truth and falsehood.", author: "Ludwig Wittgenstein"},
        {text: "The logic of words should yield to the logic of realities.", author: "Louis D. Brandeis"}
    ],
    darshana: [
        {text: "The true Self (Atman) is identical with ultimate reality (Brahman).", author: "Swami Vivekananda"},
        {text: "You only lose what you cling to.", author: "Buddha"},
        {text: "There is neither creation nor destruction, neither destiny nor free will.", author: "Nagarjuna"},
        {text: "The whole world is a sermon.", author: "Mahavira"}
    ]
};

function rotateQuotes(containerId, key) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const quotes = quotesData[key] || [];
    if (quotes.length === 0) return;
    
    let index = 0;
    function show() {
        const q = quotes[index];
        container.innerHTML = `“${q.text}”<br><strong>— ${q.author}</strong>`;
        index = (index + 1) % quotes.length;
    }
    show();
    setInterval(show, 11000);
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(page);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn('Page not found:', page);
    }
}

function submitContribution() {
    const textarea = document.getElementById('submission-text');
    const text = textarea.value.trim();
    if (!text) {
        alert("Please write something before submitting.");
        return;
    }
    if (text.length > 600) {
        alert("Submission must be under 600 words.");
        return;
    }
    let submissions = JSON.parse(localStorage.getItem('academySubmissions') || '[]');
    submissions.unshift({
        text: text,
        date: new Date().toLocaleDateString()
    });
    if (submissions.length > 6) submissions.pop();
    localStorage.setItem('academySubmissions', JSON.stringify(submissions));
    textarea.value = '';
    renderSubmissions();
    alert("Thank you! Your contribution has been published.");
}

function renderSubmissions() {
    const container = document.getElementById('submissions-display');
    if (!container) return;
    let submissions = JSON.parse(localStorage.getItem('academySubmissions') || '[]');
    container.innerHTML = '<h3>Recent Contributions</h3>';
    if (submissions.length === 0) {
        container.innerHTML += '<p style="text-align:center;color:#666;">No contributions yet. Be the first!</p>';
        return;
    }
    submissions.forEach(s => {
        const div = document.createElement('div');
        div.className = 'submission-item';
        div.innerHTML = `<p>\( {s.text}</p><small> \){s.date}</small>`;
        container.appendChild(div);
    });
}

function buildTimeline() {
    const container = document.getElementById('timeline-content');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align:center;margin:2rem 0;color:var(--crimson);font-size:1.5rem;">Ancient Foundations</div>
        <div class="timeline-item"><div class="timeline-content"><strong>Mahavira</strong><br>599–527 BCE</div></div>
        <div class="timeline-item"><div class="timeline-content"><strong>Confucius</strong><br>551–479 BCE</div></div>
        <div class="timeline-item"><div class="timeline-content"><strong>Buddha</strong><br>c. 563–483 BCE</div></div>
        <div class="timeline-item"><div class="timeline-content"><strong>Socrates</strong><br>470–399 BCE</div></div>
        <!-- More entries abbreviated for space, but full list can be expanded -->
    `;
}

function buildGlossary() {
    const container = document.getElementById('glossary-accordion');
    if (!container) return;
    // Simple accordion for A, C, D, E, etc.
    container.innerHTML = `
        <div class="accordion-item">
            <div class="accordion-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'">A</div>
            <div class="accordion-body"><ul><li>A priori — Knowledge independent of experience</li><li>A posteriori — Knowledge from experience</li></ul></div>
        </div>
        <!-- Add more letters as needed -->
    `;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').classList.add('active');
    
    renderSubmissions();
    buildTimeline();
    buildGlossary();
    
    setTimeout(() => {
        rotateQuotes('quotes-ethics', 'ethics');
        rotateQuotes('quotes-political', 'political');
        rotateQuotes('quotes-aesthetics', 'aesthetics');
        rotateQuotes('quotes-metaphysics', 'metaphysics');
        rotateQuotes('quotes-epistemology', 'epistemology');
        rotateQuotes('quotes-logic', 'logic');
        rotateQuotes('quotes-darshana', 'darshana');
    }, 800);
    
    document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'})}`;
    
    console.log('%cThe Academy loaded successfully.', 'color:#8B0000;font-size:14px;');
});
