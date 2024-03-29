import Typography from 'typography'

// This website uses the system font stack after the placed "Lora" font
// The scaleRatio will be overwritten for smaller breakpoints in src/components/Layout

const typography = new Typography({
  title: 'Clarisights Journal',
  baseFontSize: '10px',
  baseLineHeight: 2,
  headerFontFamily: [
    'Lora',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: ['Inter'],
  scaleRatio: 3.157,
  headerWeight: 700,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
})

export default typography
