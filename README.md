# The Poultry Health Toolbox — India

This is a first-pass, open, static website for GitHub Pages. It combines:

1. an expert/author homepage;
2. a searchable digital Poultry Health Toolbox; and
3. an author profile and professional-legacy page.

No server, database, subscription or build command is required.

## The main source file

`data/products.csv` is the website's master directory. It is a normal row-and-column file that opens in Microsoft Excel. The website reads it automatically; do **not** manually rewrite `toolbox.js` when products change.

The included records are clearly marked samples. They demonstrate the structure only and must be replaced with verified records before public professional use.

### Columns

| Column | Purpose |
|---|---|
| `id` | Permanent unique number |
| `area` | One of the eight integrated decision areas |
| `category` | One of the 30 product categories |
| `product` | Product, service, test or institutional entry |
| `generic` | Generic composition, active ingredient, strain or method |
| `company` | Company, laboratory, university or institution |
| `use` | Practical indication or decision context |
| `dosage` | Dosage and duration, or verification instruction |
| `status` | Verified, verify current label, legacy/unresolved, etc. |
| `remarks` | Warnings, limitations and practical notes |
| `source` | Source used to verify the record |
| `last_reviewed` | Date last checked, preferably `YYYY-MM` |

## Updating the product directory in Excel

1. Download `data/products.csv` from GitHub.
2. Open it in Excel.
3. Add or correct rows without changing the column headings.
4. In Excel choose **Save As → CSV UTF-8 (Comma delimited)**.
5. Upload the revised file to the same `data` folder in GitHub and replace the old file.
6. Wait one or two minutes and refresh the website.

Do not place commas inside a field unless Excel saves the field inside quotation marks. Saving through Excel normally handles this correctly.

## Publishing on GitHub Pages

1. Sign in to GitHub and choose **New repository**.
2. Suggested repository name: `poultry-health-toolbox-india`.
3. Choose **Public** if everybody should be able to view the published page.
4. Create the repository without adding another README.
5. Upload **the contents of this folder**, preserving the `assets` and `data` folders.
6. Open the repository's **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch **main**, folder **/(root)**, and click **Save**.
9. GitHub will display the public web address after publication.

If the repository is named `poultry-health-toolbox-india`, the usual address will resemble:

`https://YOUR-GITHUB-NAME.github.io/poultry-health-toolbox-india/`

## What to edit

- Homepage wording: `index.html`
- Author biography and qualifications: `about.html`
- Product records: `data/products.csv`
- Colours: the first line of `assets/css/styles.css`
- Search behaviour and eight areas: `assets/js/toolbox.js`

## Testing on a computer

Opening `index.html` directly will show the homepage. Browsers may block the CSV search when files are opened directly. GitHub Pages will not have this problem. For a full local test, start a small local web server in this folder.

## Important publication work still required

- Replace all demonstration records with reviewed records from the book's source tables.
- Insert the author-approved biography, qualifications and photograph.
- Confirm copyright, edition and contact wording.
- Add citations or source links wherever appropriate.
- Review all medicines, dosages, claims, withdrawal advice and regulatory wording immediately before publication.
- Do not publish the 263-page PDF itself unless its copyright and publication status allow public distribution.

## Recommended document workflow

Use Word for chapters and narrative writing. Use CSV/Excel for structured directory records. Keep the PDF as the fixed reading edition. The website should be generated from the structured CSV—not from the PDF—because structured rows are easier to search, sort, correct and update.
