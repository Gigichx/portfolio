import React, { useState } from 'react';
import { Typewriter } from 'reactbits'; // ipotizzando il pacchetto reactbits.dev
import './PortfolioPage.css'; // per gli stili personalizzati

export default function PortfolioPage() {
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
        <div className="portfolio-page">
            <header>
                <h1>
                    <Typewriter
                        words={['Benvenuto nel mio Portfolio', 'Guarda i miei lavori', 'Creatività in Azione']}
                        loop={true}
                        cursor
                    />
                </h1>
            </header>

            <section className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                    Carica i tuoi contenuti
                </label>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
            </section>

            <section className="gallery-section">
                {files.length === 0 && (
                    <p>Nessun contenuto caricato. Usa il pulsante sopra per aggiungere lavori.</p>
                )}
                <div className="gallery-grid">
                    {files.map((file, index) => (
                        <div key={index} className="gallery-item">
                            {file.type.startsWith('image') ? (
                                <img src={file.url} alt={file.name} />
                            ) : (
                                <video controls src={file.url} />
                            )}
                            <p>{file.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
