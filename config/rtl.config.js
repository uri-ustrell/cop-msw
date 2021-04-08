module.exports = () => ({
  minify: false,
  plugins: [
    // Change mango font + "add" control directive (add content only for RTL
    {
      name: 'Change mango font',
      priority: 100,
      directives: {
        control: {},
        value: [],
      },
      processors: [
        {
          expr: /font-family/i,
          action: (prop, value) => {
            let propValue = value;
            if (!value.match(/(ico|mango-form)/)) {
              propValue = `Droid Arabic Naskh, ${value}`;
            }
            return {
              prop,
              value: propValue,
            };
          },
        },
      ],
    },

    // Delete letter-spacing
    {
      name: 'Delete letter-spacing',
      priority: 100,
      directives: {
        control: {},
        value: [],
      },
      processors: [
        {
          // Triggered via content property
          expr: /letter-spacing/i,
          action: (prop) => {
            const propValue = 'normal';
            return {
              prop,
              value: propValue,
            };
          },
        },
      ],
    },

    // Delete text-transform
    {
      name: 'Delete text-transform',
      priority: 100,
      directives: {
        control: {},
        value: [],
      },
      processors: [
        {
          // triggered via content property
          expr: /text-transform/i,
          action: (prop) => {
            const propValue = 'none';
            return {
              prop,
              value: propValue,
            };
          },
        },
      ],
    },
  ],
});
