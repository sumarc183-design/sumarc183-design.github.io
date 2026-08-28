# sumarc183-design.github.io

Portfolio personnel de Marc Su — Data Scientist / ML Engineer.

Site statique, sans build ni dépendances : HTML, CSS et JavaScript vanilla,
déployé directement via GitHub Pages depuis la branche `main`.

## Structure

```
.
├── index.html         # Page principale, ancres par section
├── 404.html           # Page d'erreur (reprend l'en-tête et le pied de page)
├── styles.css         # Design system : tokens couleur/typo + composants
├── script.js          # Menu mobile, scrollspy, animations au scroll
├── robots.txt
├── sitemap.xml
├── reports/           # Rapports détaillés, autonomes (CSS intégré)
│   ├── fraudscopeai.html
│   ├── govprocure-ai.html
│   └── deep-learning-nlp-journey.html
└── assets/
    ├── marc-su-portrait.jpg
    ├── fraudscope-ai.webp / govprocure-ai.webp / deep-learning-nlp.webp
    ├── favicon.png / favicon-32.png
    ├── CV_data_Marc_Su.pdf
    └── CV_finance_Marc_Su.pdf
```

Les pages de `reports/` embarquent leur propre CSS et ne dépendent ni de
`styles.css` ni de `script.js` : elles restent lisibles ouvertes seules.

## Thème clair / sombre

Le site suit `prefers-color-scheme`. Seuls les tokens de `:root` changent en
mode sombre ; les sections volontairement sombres (`--ink-2`, `--ledger`) sont
identiques dans les deux modes. `--ledger` sert de fond de section et
`--ledger-text` d'encre d'accent : ne pas confondre les deux en modifiant la
palette.

Le visuel du hero (le tracé "signal → structure") est un SVG généré
programmatiquement puis figé dans `index.html` — pas d'image raster, pas de
dépendance externe pour l'illustration.

## Développement local

Aucune installation nécessaire. Pour prévisualiser localement :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Le site est publié automatiquement par GitHub Pages à chaque push sur `main`
(Settings → Pages → Source : `Deploy from a branch` → `main` / `root`).
Aucune étape de build : les fichiers sont servis tels quels.

## Mettre à jour le contenu

- Textes, projets, expériences : directement dans `index.html`.
- Couleurs, typographie, espacements : variables CSS en haut de `styles.css`
  (`:root`), et le bloc `@media (prefers-color-scheme: dark)` en fin de fichier.
- CV : remplacer les fichiers dans `assets/` en conservant les mêmes noms, ou
  mettre à jour les liens correspondants dans `index.html`.
- Démos déployées : chaque bloc `.project-links` contient un commentaire
  indiquant où insérer le lien une fois la démo en ligne.
- Sitemap : penser à mettre à jour `lastmod` lors d'un changement de contenu.

## Licence

Voir [LICENSE](LICENSE).
