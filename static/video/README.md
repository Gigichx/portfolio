# Video Background per Hero Section

## Come aggiungere il tuo video

1. Salva il tuo video in questa cartella con il nome `hero-video.mp4`
2. Apri il file `index.html`
3. Trova la sezione Hero (circa linea 63-70)
4. Rimuovi il commento dal tag `<video>` e commenta il `<div class="hero-video-placeholder">`

### Esempio:

```html
<div class="hero-background">
    <!-- Video Background - Attivo -->
    <video class="hero-video" autoplay muted loop playsinline>
        <source src="static/video/hero-video.mp4" type="video/mp4">
    </video>
    <!-- Placeholder - Commentato -->
    <!-- <div class="hero-video-placeholder"></div> -->
</div>
```

## Formati video consigliati

- **Formato**: MP4 (H.264)
- **Risoluzione**: 1920x1080 (Full HD) o superiore
- **Durata**: 10-30 secondi (loop)
- **Dimensione file**: Massimo 10-15 MB per prestazioni ottimali
- **Bitrate**: 5-8 Mbps

## Note

- Il video verrà riprodotto in loop automaticamente
- Il video è muto per default (autoplay policy dei browser)
- Il video è responsive e si adatta a tutte le dimensioni dello schermo
- C'è un overlay scuro sopra il video per migliorare la leggibilità del testo