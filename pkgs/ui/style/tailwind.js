const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = function(context) {
  const config = {
    content: [
      '../../pkgs/{editor/*.{ts,tsx},ui/src/**/*.{ts,tsx}}',
      '../../apps/web/src/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        },
        padding: {
          'editor': 'var(--editor-padding)',
        },
        gridTemplateColumns: {
          'with-sidebar': '280px 1fr',
          'without-sidebar': '0px 1fr',
        },
      },
    },
    plugins: [
      require('@kobalte/tailwindcss'),
      require('@tailwindcss/typography'),
    ],
  }

  return config
}
