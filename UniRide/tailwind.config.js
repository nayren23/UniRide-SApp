/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        './src/**/*.{html,ts}', // Spécifiez les fichiers à partir desquels Tailwind doit purger les classes inutilisées
    ],
    darkMode: false, // Activez le mode sombre si nécessaire

    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
}
