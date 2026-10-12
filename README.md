# Tulsi Bhawan — AWEN DIGITALS demo

A mobile-first, premium hospitality website concept built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — semantic page structure, content, enquiry modal
- `style.css` — responsive styling and animations
- `script.js` — navigation, form validation, enquiry message and optional WhatsApp handoff

## Preview locally
Open `index.html` in a browser. Internet access is needed for Google Fonts and the remote Unsplash photos. The rest of the page is plain HTML/CSS/JS.

## Enable WhatsApp enquiries
1. Confirm the property's official WhatsApp number and permission to publish it.
2. Open `script.js`.
3. Set `whatsappNumber` to digits only, including country code. Example format: `91XXXXXXXXXX` (replace with the actual confirmed number).
4. Save and test on a phone. The site opens a pre-filled WhatsApp message; the visitor must press Send.
5. Set `demoMode: false` if you want the config to reflect that it is no longer a demo. Current behavior is controlled by the number field.

If the number is blank, the form still validates and prepares an enquiry message on the page, with a copy button. It does not claim to have delivered anything.

## Before presenting to the property
- Confirm official name, trust relationship, address and contact information.
- Confirm room names, actual amenities, dining/event facilities, rates and booking process.
- Replace stock images with approved property photographs. Current room/venue images are illustrative and are not claimed to depict Tulsi Bhawan.
- Verify the map pin/address and nearby attraction descriptions.
- Add privacy notice and consent/retention process if enquiry data is collected or stored later.
- Do not add unverified reviews, ratings, prices, availability, certifications or claims.
- Keep `Website concept by AWEN DIGITALS™` during demo; remove or adjust only with agreement for the final client site.

## Deploy on Vercel
Import the GitHub repository in Vercel, select the project root, and deploy as a static site. No build command or framework preset is required. Ensure `index.html`, `style.css`, and `script.js` are at the deployed root.
