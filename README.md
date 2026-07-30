# sumarc183-design.github.io

Portfolio personnel de Marc Su — Data Scientist / ML Engineer.

Site statique, sans build ni dépendances : HTML, CSS et JavaScript vanilla,
déployé directement via GitHub Pages depuis la branche `main`.

## Structure

```
.
├── index.html        # Contenu de la page (une seule page, ancres par section)
├── styles.css         # Design system : tokens couleur/typo + composants
├── script.js           # Menu mobile, scrollspy, animations au scroll
├── robots.txt
├── sitemap.xml
└── assets/
    ├── marc-su-portrait.jpg
    ├── favicon.png / favicon-32.png
    ├── CV_data_Marc_Su.pdf
    └── CV_finance_Marc_Su.pdf
```

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
  (`:root`).
- CV : remplacer les fichiers dans `assets/` en conservant les mêmes noms, ou
  mettre à jour les liens correspondants dans `index.html`.

## Licence

Voir [LICENSE](LICENSE).
