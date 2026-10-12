# Tulsi Bhawan — AWEN DIGITALS redesign

A complete mobile-first static website concept built with plain HTML, CSS and JavaScript for deployment on Vercel. No build step or framework is required.

## Files

- `index.html` — page sections, image-led room and attraction cards, map embed, SEO metadata, enquiry modal and mobile contact bar.
- `style.css` — responsive heritage-inspired design system, mobile layouts, accessible focus states, subtle transitions and reduced-motion support.
- `script.js` — navigation, accessible modal controls, enquiry validation, WhatsApp hand-off and copy-message fallback.

## Design changes implemented

- Heritage-inspired palette: warm ivory `#F5F0E6`, forest green `#263C31`, terracotta `#B86F45`, muted gold `#D6B979`.
- Higher-contrast primary CTAs and stronger typography hierarchy.
- Large hero photo, real-property room images, dining/interior photo and image-led Ayodhya landmark cards.
- Deluxe Room and Suite-style Stay enquiry cards without invented rates or occupancy data.
- Facilities presented as questions to confirm with the property, not guarantees for every room.
- Google Maps embed and directions link for the supplied address.
- Sticky mobile Call / Enquire / WhatsApp bar, phone links in header/footer, and modal enquiry workflow.
- Modal keyboard handling, Escape-to-close, focus restoration, required-field validation and reduced-motion support.
- No fabricated guest reviews, ratings, room rates, property distances or booking availability.
- Meta description, Open Graph fields and basic Hotel JSON-LD.

## Contact configuration

`script.js` currently uses the phone/WhatsApp number publicly listed on the property's website as of this build:

- Display: `+91 70802 04347`
- Phone link: `+917080204347`
- WhatsApp digits: `917080204347`

Please confirm the number and permission to publish it directly with the property owner before final launch. Change `TULSI_CONFIG` in `script.js` if the owner provides a different contact.

WhatsApp behaviour: submitting the form opens a prefilled WhatsApp message where possible. The visitor must press **Send** in WhatsApp; the form does not create a reservation or store personal data in a backend. Guests must receive confirmation from the property for rates and availability.

## Photo sources and permissions

This version uses externally hosted images found in publicly indexed property / destination listings:

- Property exterior: Adanione/Tulsi Bhavan listing image.
- Room/interior photographs: MakeMyTrip/Tulsi Bhawan listing images.
- Dining room: Adanione/Tulsi Bhavan listing image.
- Ayodhya landmarks: publicly indexed tourism/news image pages for Shri Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan.

They are hot-linked; images need internet access and may be changed or blocked by their source websites. The property photos appear to depict Tulsi Bhawan but must be approved for use by the owner and/or the image-rights holder before production. The landmark images are representative photos of those landmarks. For best performance and a fully approved launch, obtain the client's original high-resolution photos and store optimised copies in the project.

## Before final client handover

1. Confirm the official property name, trust wording, contact number and address with the owner.
2. Get written approval for every property photo or replace external listing photos with owner-provided images.
3. Confirm which room options exist and which facilities apply to each room type.
4. Confirm whether the property currently accepts the event types shown.
5. Verify the Maps pin, then only add distances / travel times after measuring from that pin.
6. Add genuine reviews only with permission; do not invent testimonials or ratings.
7. Test every link and enquiry path on Android and desktop, including WhatsApp hand-off.
8. Use the final production domain in the Open Graph/canonical metadata as applicable.

## Run locally

Open `index.html` in a browser. Google Fonts, map embed and external images require an internet connection. The HTML, CSS and JavaScript are static.

## Deploy on Vercel

1. Put `index.html`, `style.css`, `script.js` and `README.md` in the deployed project root.
2. Commit and push to GitHub.
3. Import/select the repository in Vercel or use the existing linked project.
4. Use the static-site/no-framework preset. No build command is needed; leave output directory at the root (`.`) where Vercel's setup requests it.
5. Deploy the latest commit and open the production URL.
6. Test call, WhatsApp, maps, room enquiry, form validation, mobile sticky bar and mobile menu on a real phone.

The code is a client-demo foundation, not a booking engine. It does not check room inventory, take payments or confirm reservations.
