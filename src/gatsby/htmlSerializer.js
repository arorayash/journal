const { RichText } = require('prismic-dom')
const Prism = require('prismjs')

// We don't want to import every PrismJS component - so that's why they're required individually
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-json')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-graphql')
require('prismjs/components/prism-ruby')
require('prismjs/components/prism-yaml')

const { Elements } = RichText

// Labels with this name will be inline code
const codeInline = ['text']
// Labels with these names will become code blocks
const codeBlock = ['javascript', 'css', 'scss', 'jsx', 'bash', 'json', 'diff', 'markdown', 'graphql', 'ruby', 'yaml']

const headings = ['heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6']

const renderFigure = element => {
  if (element.alt) {
    return `<figure><img src=${element.url} alt=${element.alt}><figcaption>${element.alt}</figcaption></figure>`
  }
  return `<figure><img src=${element.url}></figure>`
}

const slugify = value => {
  // Compatibly-decompose and remove combining characters.  
  // Remove all non-word characters, leaving spaces and dashes. Trim and convert to lower case. 
  // Replace groups of spaces and dashes with a single dash.  
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^\w\s\-]+/g, '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '-')
}

const urlify = text => text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')

const htmlSerializer = (type, element, content) => {
  switch (type) {
    // First differentiate between a label and a preformatted field (e.g. the Code Block slice)
    case Elements.label: {
      // Use the inline code for labels that are in the array of "codeInline"
      if (codeInline.includes(element.data.label)) {
        return `<code class="language-${element.data.label}">${content}</code>`
      }
      // Use the blockquote for labels with the name "quote"
      if (element.data.label === 'quote') {
        return `<blockquote><p>${urlify(content)}</p></blockquote>`
      }
      // Use the code block for labels that are in the array of "codeBlock"
      // Choose the right PrismJS highlighting with the label name
      if (codeBlock.includes(element.data.label)) {
        return `<pre class="language-${element.data.label}"><code class="language-${
          element.data.label
        }">${Prism.highlight(content, Prism.languages[element.label])}</code></pre>`
      }
      // Parse heading and assign an id to them.
      return null
    }
    case Elements.preformatted: {
      if (codeBlock.includes(element.label)) {
        return `<pre class="language-${element.label}"><code class="language-${element.label}">${Prism.highlight(
          element.text,
          Prism.languages[element.label]
        )}</code></pre>`
      }
      return null
    }
    case 'image': {
      return renderFigure(element)
    }
    case 'heading1':
    case 'heading2':
    case 'heading3': {
      const headerTag = {
        heading1: 'h1',
        heading2: 'h2',
        heading3: 'h3',
        heading4: 'h4',
        heading5: 'h5',
        heading6: 'h6',
      }
      return `<${headerTag[type]} id=${slugify(element.text)}>${element.text}</${headerTag[type]}>`
    }
    case 'hyperlink': {
      return `<a target="_blank" href=${element.data.url}>${content}</a>`
    }
    default: {
      return null
    }
  }
}

module.exports = htmlSerializer
