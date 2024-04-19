// <script src="https://cdn.tailwindcss.com"></script>
import config from './config.json';
import { hexToRGB, isFunction, between } from '../utils';

const getClasses = (values, getKey, getValue) =>
  Object.entries(values).reduce(
    (classes, [key, value]) => ({ ...classes, [getKey(key)]: getValue(value) }),
    {}
  );

const getClassName = (key, prefix) =>
  key === 'DEFAULT' ? prefix : prefix + '-' + key;

const getColorValue = (value, alpha) =>
  value.includes('#') && between(alpha, -1, 1) ? hexToRGB(value, alpha) : value;

const classes = {
  base: {
    // aspectratio
    'aspect-auto': 'aspect-ratio: auto',
    'aspect-square': 'aspect-ratio: 1 / 1',
    'aspect-video': 'aspect-ratio: 16 / 9',

    // display
    block: 'display: block',
    'inline-block': 'display: inline-block',
    inline: 'display: inline',
    flex: 'display: flex',
    'inline-flex': 'display: inline-flex',
    table: 'display: table',
    'inline-table': 'display: inline-table',
    'table-caption': 'display: table-caption',
    'table-cell': 'display: table-cell',
    'table-column': 'display: table-column',
    'table-column-group': 'display: table-column-group',
    'table-footer-group': 'display: table-footer-group',
    'table-header-group': 'display: table-header-group',
    'table-row-group': 'display: table-row-group',
    'table-row': 'display: table-row',
    'flow-root': 'display: flow-root',
    grid: 'display: grid',
    'inline-grid': 'display: inline-grid',
    contents: 'display: contents',
    'list-item': 'display: list-item',
    hidden: 'display: none',

    // float
    'float-start': 'float: inline-start',
    'float-end': 'float: inline-end',
    'float-right': 'float: right',
    'float-left': 'float: left',
    'float-none': 'float: none',

    // overflow
    'overflow-auto': 'overflow: auto',
    'overflow-hidden': 'overflow: hidden',
    'overflow-clip': 'overflow: clip',

    // position
    static: 'position: static',
    fixed: 'position: fixed',
    absolute: 'position: absolute',
    relative: 'position: relative',
    sticky: 'position: sticky',

    // visibility
    visible: 'visibility: visible',
    invisible: 'visibility: hidden',
    collapse: 'visibility: collapse',

    // zindex
    ...getClasses(
      { auto: 'auto', ...config.zIndex },
      (key) => 'z-' + key,
      (value) => 'z-index:' + value
    ),

    // flex
    'flex-col': 'flex-direction: column',
    'flex-row': 'flex-direction: row',

    'flex-1': 'flex: 1 1 0%',
    'flex-auto': 'flex: 1 1 auto',
    'flex-initial': 'flex: 0 1 auto',
    'flex-none': 'flex: none',

    grow: 'flex-grow: 1',
    'grow-0': 'flex-grow: 0',

    shrink: 'flex-shrink: 1',
    'shrink-0': 'flex-shrink: 0',

    'items-start': 'align-items: flex-start',
    'items-end': 'align-items: flex-end',
    'items-center': 'align-items: center',
    'items-baseline': 'align-items: baseline',
    'items-stretch': 'align-items: stretch',

    'justify-normal': 'justify-content: normal',
    'justify-start': 'justify-content: flex-start',
    'justify-end': 'justify-content: flex-end',
    'justify-center': 'justify-content: center',
    'justify-between': 'justify-content: space-between',
    'justify-around': 'justify-content: space-around',
    'justify-evenly': 'justify-content: space-evenly',
    'justify-stretch': 'justify-content: stretch',

    'flex-wrap': 'flex-wrap: wrap',
    'flex-wrap-reverse': 'flex-wrap: wrap-reverse',
    'flex-nowrap': 'flex-wrap: nowrap',

    // margin
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'm-' + key,
      (value) => 'margin:' + value
    ),

    // marginhorizontal
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'mx-' + key,
      (value) => ['margin-left:' + value, 'margin-right:' + value]
    ),

    // marginvertical
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'my-' + key,
      (value) => ['margin-top:' + value, 'margin-bottom:' + value]
    ),

    // marginleft
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'ml-' + key,
      (value) => 'margin-left:' + value
    ),

    // margintop
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'mt-' + key,
      (value) => 'margin-top:' + value
    ),

    // marginright
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'mr-' + key,
      (value) => 'margin-right:' + value
    ),

    // marginbottom
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'mb-' + key,
      (value) => 'margin-bottom:' + value
    ),

    // marginstart
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'ms-' + key,
      (value) => 'margin-inline-start:' + value
    ),

    // marginend
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'me-' + key,
      (value) => 'margin-inline-end:' + value
    ),

    // padding
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'p-' + key,
      (value) => 'padding:' + value
    ),

    // paddinghorizontal
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'px-' + key,
      (value) => ['padding-left:' + value, 'padding-right:' + value]
    ),

    // paddingvertical
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'py-' + key,
      (value) => ['padding-top:' + value, 'padding-bottom:' + value]
    ),

    // paddingleft
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'pl-' + key,
      (value) => 'padding-left:' + value
    ),

    // paddingtop
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'pt-' + key,
      (value) => 'padding-top:' + value
    ),

    // paddingright
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'pr-' + key,
      (value) => 'padding-right:' + value
    ),

    // paddingbottom
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'pb-' + key,
      (value) => 'padding-bottom:' + value
    ),

    // paddingstart
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'ps-' + key,
      (value) => 'padding-inline-start:' + value
    ),

    // paddingend
    ...getClasses(
      { auto: 'auto', ...config.spacing },
      (key) => 'pe-' + key,
      (value) => 'padding-inline-end:' + value
    ),

    // space
    ...getClasses(
      config.spacing,
      (key) => 'space-x-' + key,
      (value) => ({
        getKey: (key) => key + '> * + *',
        value: 'margin-left:' + value,
      })
    ),

    ...getClasses(
      config.spacing,
      (key) => 'space-y-' + key,
      (value) => ({
        getKey: (key) => key + '> * + *',
        value: 'margin-top:' + value,
      })
    ),

    // gap
    ...getClasses(
      config.spacing,
      (key) => 'gap-' + key,
      (value) => 'gap:' + value
    ),

    // columngap
    ...getClasses(
      config.spacing,
      (key) => 'gap-x-' + key,
      (value) => 'column-gap:' + value
    ),

    // rowgap
    ...getClasses(
      config.spacing,
      (key) => 'gap-y-' + key,
      (value) => 'row-gap:' + value
    ),

    // width
    ...getClasses(
      {
        auto: 'auto',
        ...config.spacing,
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        screen: '100vw',
        svw: '100svw',
        lvw: '100lvw',
        dvw: '100dvw',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      (key) => 'w-' + key,
      (value) => 'width:' + value
    ),

    // minwidth
    ...getClasses(
      {
        ...config.spacing,
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      (key) => 'min-w-' + key,
      (value) => 'min-width:' + value
    ),

    // maxwidth
    ...getClasses(
      {
        ...config.spacing,
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        prose: '65ch',
      },
      (key) => 'max-w-' + key,
      (value) => 'max-width:' + value
    ),
    ...getClasses(
      config.screens,
      (key) => 'max-w-screen-' + key,
      (value) => 'max-width:' + value
    ),

    // height
    ...getClasses(
      {
        auto: 'auto',
        ...config.spacing,
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        full: '100%',
        screen: '100vh',
        svh: '100svh',
        lvh: '100lvh',
        dvh: '100dvh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      (key) => 'h-' + key,
      (value) => 'height:' + value
    ),

    // maxheight
    ...getClasses(
      {
        ...config.spacing,
        none: 'none',
        full: '100%',
        screen: '100vh',
        svh: '100svh',
        lvh: '100lvh',
        dvh: '100dvh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      (key) => 'max-h-' + key,
      (value) => 'max-height:' + value
    ),

    // size
    ...getClasses(
      {
        auto: 'auto',
        ...config.spacing,
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      (key) => 'size-' + key,
      (value) => ['width:' + value, 'height:' + value]
    ),

    // fontfamily
    'font-inherit': 'font-family: inherit',
    'font-sans':
      'font-family: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    'font-serif':
      'font-family: ui-serif,Georgia,Cambria,"Times New Roman",Times, serif',
    'font-mono':
      'font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',

    // fontsize
    'text-xs': ['font-size: 0.75rem', 'line-height: 1rem'],
    'text-sm': ['font-size: 0.875rem', 'line-height: 1.25rem'],
    'text-base': ['font-size: 1rem', 'line-height: 1.5rem'],
    'text-lg': ['font-size: 1.125rem', 'line-height: 1.75rem'],
    'text-xl': ['font-size: 1.25rem', 'line-height: 1.75rem'],
    'text-2xl': ['font-size: 1.5rem', 'line-height: 2rem'],
    'text-3xl': ['font-size: 1.875rem', 'line-height: 2.25rem'],
    'text-4xl': ['font-size: 2.25rem', 'line-height: 2.5rem'],

    // fontweight
    'font-thin': 'font-weight: 100',
    'font-extralight': 'font-weight: 200',
    'font-light': 'font-weight: 300',
    'font-normal': 'font-weight: 400',
    'font-medium': 'font-weight: 500',
    'font-semibold': 'font-weight: 600',
    'font-bold': 'font-weight: 700',
    'font-extrabold': 'font-weight: 800',
    'font-black': 'font-weight: 900',

    // lineheight
    'leading-3': 'line-height: 0.75rem',
    'leading-4': 'line-height: 1rem',
    'leading-5': 'line-height: 1.25rem',
    'leading-6': 'line-height: 1.5rem',
    'leading-7': 'line-height: 1.75rem',
    'leading-8': 'line-height: 2rem',
    'leading-9': 'line-height: 2.25rem',
    'leading-10': 'line-height: 2.5rem',
    'leading-none': 'line-height: 1',
    'leading-tight': 'line-height: 1.25',
    'leading-snug': 'line-height: 1.375',
    'leading-normal': 'line-height: 1.5',
    'leading-relaxed': 'line-height: 1.625',
    'leading-loose': 'line-height: 2',

    // text overflow
    truncate: [
      'overflow: hidden',
      'text-overflow: ellipsis',
      'white-space: nowrap',
    ],
    'text-ellipsis': 'text-overflow: ellipsis',
    'text-clip': 'text-overflow: clip',

    // whitespace
    'whitespace-normal': 'white-space: normal',
    'whitespace-nowrap': 'white-space: nowrap',
    'whitespace-pre': 'white-space: pre',
    'whitespace-pre-line': 'white-space: pre-line',
    'whitespace-pre-wrap': 'white-space: pre-wrap',
    'whitespace-break-spaces': 'white-space: break-spaces',

    // borderradius
    ...getClasses(
      config.borderRadius,
      (key) => getClassName(key, 'rounded'),
      (value) => 'border-radius:' + value
    ),

    // borderwidth
    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border'),
      (value) => 'border-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-x'),
      (value) => ['border-left-width:' + value, 'border-right-width:' + value]
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-y'),
      (value) => ['border-top-width:' + value, 'border-bottom-width:' + value]
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-l'),
      (value) => 'border-left-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-t'),
      (value) => 'border-top-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-r'),
      (value) => 'border-right-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-b'),
      (value) => 'border-bottom-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-s'),
      (value) => 'border-inline-start-width:' + value
    ),

    ...getClasses(
      config.borderWidth,
      (key) => getClassName(key, 'border-e'),
      (value) => 'border-inline-end-width:' + value
    ),

    // borderstyle
    'border-solid': 'border-style: solid',
    'border-dashed': 'border-style: dashed',
    'border-dotted': 'border-style: dotted',
    'border-double': 'border-style: double',
    'border-hidden': 'border-style: hidden',
    'border-none': 'border-style: none',

    // outlinewidth
    'outline-0': 'outline-width: 0px',
    'outline-1': 'outline-width: 1px',
    'outline-2': 'outline-width: 2px',
    'outline-4': 'outline-width: 4px',
    'outline-8': 'outline-width: 8px',

    // backdropfilter
    'backdrop-blur-none': 'backdrop-filter: blur(0)',
    'backdrop-blur-sm': 'backdrop-filter: blur(4px)',
    'backdrop-blur': 'backdrop-filter: blur(8px)',
    'backdrop-blur-md': 'backdrop-filter: blur(12px)',
    'backdrop-blur-lg': 'backdrop-filter: blur(16px)',
    'backdrop-blur-xl': 'backdrop-filter: blur(24px)',
    'backdrop-blur-2xl': 'backdrop-filter: blur(40px)',
    'backdrop-blur-3xl': 'backdrop-filter: blur(64px)',

    // shadow
    'shadow-sm': 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadow:
      'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'shadow-md':
      'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    'shadow-lg':
      'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    'shadow-xl':
      'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)',
    'shadow-inner': 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    'shadow-none': 'box-shadow: none',

    // opacity
    ...getClasses(
      config.opacity,
      (key) => 'opacity-' + key,
      (value) => 'opacity:' + value
    ),

    // transition
    'transition-none': 'transition-property: none',

    'transition-all': [
      'transition-property: all',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],

    transition: [
      'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],
    'transition-colors': [
      'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],

    'transition-opacity': [
      'transition-property: box-shadow',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],

    'transition-shadow': [
      'transition-property: opacity',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],

    'transition-transform': [
      'transition-property: transform',
      'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration: 150ms',
    ],

    // scale
    'scale-0': 'transform: scale(0)',
    'scale-x-0': 'transform: scaleX(0)',
    'scale-y-0': 'transform: scaleY(0)',
    'scale-50': 'transform: scale(.5)',
    'scale-x-50': 'transform: scaleX(.5)',
    'scale-y-50': 'transform: scaleY(.5)',
    'scale-75': 'transform: scale(.75)',
    'scale-x-75': 'transform: scaleX(.75)',
    'scale-y-75': 'transform: scaleY(.75)',
    'scale-90': 'transform: scale(.9)',
    'scale-x-90': 'transform: scaleX(.9)',
    'scale-y-90': 'transform: scaleY(.9)',
    'scale-95': 'transform: scale(.95)',
    'scale-x-95': 'transform: scaleX(.95)',
    'scale-y-95': 'transform: scaleY(.95)',
    'scale-100': 'transform: scale(1)',
    'scale-x-100': 'transform: scaleX(1)',
    'scale-y-100': 'transform: scaleY(1)',
    'scale-105': 'transform: scale(1.05)',
    'scale-x-105': 'transform: scaleX(1.05)',
    'scale-y-105': 'transform: scaleY(1.05)',
    'scale-110': 'transform: scale(1.1)',
    'scale-x-110': 'transform: scaleX(1.1)',
    'scale-y-110': 'transform: scaleY(1.1)',
    'scale-125': 'transform: scale(1.25)',
    'scale-x-125': 'transform: scaleX(1.25)',
    'scale-y-125': 'transform: scaleY(1.25)',
    'scale-150': 'transform: scale(1.5)',
    'scale-x-150': 'transform: scaleX(1.5)',
    'scale-y-150': 'transform: scaleY(1.5)',

    // appearance
    'appearance-none': ['appearance: none', '-webkit-appearance: none'], // -moz-appearance
    'appearance-auto': ['appearance: auto', '-webkit-appearance: auto'], // -moz-appearance

    // cursor
    'cursor-auto': 'cursor: auto',
    'cursor-default': 'cursor: default',
    'cursor-pointer': 'cursor: pointer',
    'cursor-wait': 'cursor: wait',
    'cursor-text': 'cursor: text',
    'cursor-grab': 'cursor: grab',
    'cursor-grabbing': 'cursor: grabbing',

    // caretcolor
    ...getClasses(
      config.colors,
      (key) => 'caret-' + key,
      (value) => 'caret-color:' + value
    ),

    // pointerevents
    'pointer-events-none': 'pointer-events: none',
    'pointer-events-auto': 'pointer-events: auto',

    // resize
    'resize-none': 'resize: none',
    'resize-y': 'resize: vertical',
    'resize-x': 'resize: horizontal',
    resize: 'resize: both',
  },

  colors: {
    // color
    ...getClasses(
      config.colors,
      (key) => 'text-' + key,
      (value) => (props) => 'color:' + getColorValue(value, props.alpha)
    ),

    // bordercolor
    ...getClasses(
      config.colors,
      (key) => 'border-' + key,
      (value) => (props) => 'border-color:' + getColorValue(value, props.alpha)
    ),

    // backgroundcolor
    ...getClasses(
      config.colors,
      (key) => 'bg-' + key,
      (value) => (props) =>
        'background-color:' + getColorValue(value, props.alpha)
    ),

    // accentcolor
    ...getClasses(
      { auto: 'auto', ...config.colors },
      (key) => 'accent-' + key,
      (value) => (props) => 'accent-color:' + getColorValue(value, props.alpha)
    ),
  },
};

const getKey = (key, props) => {
  if (key.includes('/')) key = key.replace('/', '\\/');

  if (props.hover) {
    key = key.replace('hover:', 'hover\\:');
    key += ':hover';
  }

  if (props.focus) {
    key = key.replace('focus:', 'focus\\:');
    key += ':focus';
  }

  if (props.active) {
    key = key.replace('active:', 'active\\:');
    key += ':active';
  }

  if (props.important) key = key.replace('!', '\\!');

  if (props.sm) key = key.replace('sm:', 'sm\\:');

  if (props.dark) key = key.replace('dark:', 'dark\\:');

  return key;
};

const getValue = (value, props) => {
  value = Array.isArray(value) ? value : [value];

  if (props.important) value = value.map((value) => value + '!important');

  return value.join(';');
};

const getAlpha = (key) => config.opacity[key.split('/').at(-1)];

const getClassValue = (key) => {
  const baseKey = key.split(':').at(-1).replace('!', '');
  return classes.base[baseKey] || classes.colors[baseKey.split('/').at(0)];
};

const getClass = (key) => {
  const value = getClassValue(key);
  if (!value) return;

  const props = {
    important: key.includes('!'),
    // si el valor es incorrecto, se crea la clase igual
    // prevenir la creacion de la clase si el valor no es valido
    alpha: getAlpha(key),
    hover: key.includes('hover:'),
    focus: key.includes('focus:'),
    active: key.includes('active:'),
    sm: key.includes('sm:'),
    dark: key.includes('dark:'),
  };

  const _key =
    value.key ||
    (value.getKey ? value.getKey(getKey(key, props)) : getKey(key, props));

  const _value =
    value.value ||
    getValue(
      value.getValue
        ? value.getValue(props)
        : isFunction(value)
        ? value(props)
        : value,
      props
    );

  key = '.' + _key + '{' + _value + '}';

  if (props.sm)
    key = '@media(min-width:' + config.screens['sm'] + '){' + key + ' }';

  if (props.dark) key = '@media(prefers-color-scheme:dark){' + key + '}';

  return key;
};

const handleClassList = (currentClasses, styleSheet) => {
  const elements = document.documentElement.querySelectorAll('[class]');

  elements.forEach((element) => {
    element.classList.forEach((key) => {
      if (currentClasses[key]) return;

      const value = getClass(key);
      if (!value) return;

      currentClasses[key] = 1;

      styleSheet.innerHTML += value;
    });
  });
};

const main = () => {
  const style = document.createElement('style');
  document.head.appendChild(style);

  style.innerHTML +=
    '*{box-sizing:border-box;border-width:0;border-style:solid}';

  // button, input, optgroup, select, textarea {}
  // font-family: inherit;
  // font-feature-settings: inherit;
  // font-variation-settings: inherit;
  // font-size: 100%;
  // font-weight: inherit;
  // line-height: inherit;
  // color: inherit;
  // margin: 0;
  // padding: 0;

  const currentClasses = {};

  const observer = new MutationObserver(() =>
    handleClassList(currentClasses, style)
  );

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true,
  });
};

main();
