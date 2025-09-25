// Typewriter effect
class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.speed = options.speed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;

            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }

            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;

            if (this.currentCharIndex === currentText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseTime);
                return;
            }

            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            form.reset();
            showStatus("Messaggio inviato con successo!", true);
        }).catch(error => {
            showStatus("Errore nell'invio. Riprova.", false);
        });
    });

    function showStatus(msg, success) {
        const statusDiv = form.querySelector('.form-status');
        statusDiv.textContent = msg;
        statusDiv.style.display = 'block';
        statusDiv.className = 'form-status ' + (success ? 'success' : 'error');
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 4000);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    // ...altre inizializzazioni
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
    // Initialize typewriter
    const typewriterElement = document.getElementById('text-content');
    const texts = [
        'Ciao, sono Luigi Lattanzio',
        'Web Developer',
        'Drone Pilot',
        'Video Editor'
    ];

    new Typewriter(typewriterElement, texts, {
        speed: 80,
        deleteSpeed: 50,
        pauseTime: 2500
    });

    // Initialize portfolio filter
    initPortfolioFilter();

    // Initialize contact form
    initContactForm();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// React component for Portfolio Page
// Assuming React and ReactDOM are loaded in the HTML

/*const { useState } = React;

function PortfolioPage() {
    const [files, setFiles] = useState([]);

    const handleUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files).map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            type: file.type
        }));
        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    };

    return (
        <div>
            <h2 className="mb-4">Portfolio Creativi</h2>
            <div className="mb-3">
                <label htmlFor="file-upload" className="btn btn-primary">
                    Carica Contenuti
                </label>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {files.length === 0 ? (
                <p>Nessun contenuto caricato. Usa il bottone sopra per aggiungere i tuoi lavori.</p>
            ) : (
                <div className="row">
                    {files.map((file, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            {file.type.startsWith('image') ? (
                                <img src={file.url} alt={file.name} className="img-fluid rounded" />
                            ) : (
                                <video controls className="img-fluid rounded" src={file.url} />
                            )}
                            <p className="mt-2">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<PortfolioPage />);*/