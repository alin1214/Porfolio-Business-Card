Portfolio/Business Card Component 

Overview: This project is a small React component that displays a business-card style profile using data from the JSONPlaceholder users API. The goal was to make something that feels like a portfolio intro or digital business card rather than just a plain list of data.

My Approach: I started by focusing on structure first: what information should stand out, and what can be secondary. I decided the most important things were the person’s name, role, and company, so those are at the top and visually emphasized. Contact info comes next, and extra details are hidden behind a button so the main view stays clean. I built the layout with simple React components and used useEffect to fetch the user data from the API. Once the data was loading correctly, I focused on styling and interaction.

I first thought about what someone would notice right away if this were a real profile. The name and job title should stand out the most, so I built the layout around that. After that, I added contact info and then extra details that you can show or hide. I got the data using useEffect and saved it in state. Once that worked, I focused on making it look nice and not boring.

Design choices
- Big name at the top: I made the name the biggest thing because that’s what people look for first.
- Initials instead of a photo: The API doesn’t give images, so I used initials in a circle. That’s something you see a lot in real apps anyway.
- Chips under the name: I added little labels for username, location, and company so you can quickly see important info without reading a lot.
- Icons for contact info: Instead of writing “Email:” and “Phone:” every time, I used icons to make it look more like a modern business card.
- More details button: I hid the address and company focus behind a button so the card doesn’t feel crowded. Clicking it also counts as the interactive part of the project.
- Blue color theme: I used mostly blue and neutral colors because they feel calm and professional.
- Hover effects: I added small hover effects so it feels interactive, but not too flashy.