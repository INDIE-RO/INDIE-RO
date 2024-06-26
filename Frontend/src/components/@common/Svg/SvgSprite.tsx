function SvgSprite() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' display='none'>
      <symbol id='home' viewBox='0 0 20 20'>
        <path d='M.714 11.429L10 2.143l9.286 9.286' />
        <path strokeLinecap='round' strokeLinejoin='round' d='M.714 11.429L10 2.143l9.286 9.286' />
        <path d='M3.571 8.571v9.286h12.857V8.571' />
        <path strokeLinecap='round' strokeLinejoin='round' d='M3.571 8.571v9.286h12.857V8.571' />
      </symbol>
      <symbol id='allInfo' viewBox='0 0 21 22'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M1.27 3c.424 0 .768-.448.768-1s-.344-1-.769-1C.844 1 .5 1.448.5 2s.344 1 .77 1zm5.384-1H20.5M1.27 12c.424 0 .768-.448.768-1s-.344-1-.769-1C.844 10 .5 10.448.5 11s.344 1 .77 1zm5.384-1H20.5M1.27 21c.424 0 .768-.448.768-1s-.344-1-.769-1C.844 19 .5 19.448.5 20s.344 1 .77 1zm5.384-1H20.5'
        />
      </symbol>
      <symbol id='user' viewBox='0 0 22 22'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.749 3.072l-1.297 3.823a.63.63 0 0 0 0 .57l2.424 3.237a.617.617 0 0 1-.51.987H16.32a.666.666 0 0 0-.51.262l-2.254 3.237a.619.619 0 0 1-1.096-.17l-1.205-3.853a.586.586 0 0 0-.402-.401L6.993 9.56a.618.618 0 0 1-.17-1.094l3.304-2.328a.662.662 0 0 0 .263-.509V1.592a.616.616 0 0 1 .927-.51l3.243 2.421a.634.634 0 0 0 .571.077l3.83-1.295a.619.619 0 0 1 .788.787z'
        />
        <path strokeLinecap='round' strokeLinejoin='round' d='M11.1 10.918L1 21' />
      </symbol>
      <symbol id='modify' viewBox='0 0 14 14'>
        <g strokeLinecap='round' strokeLinejoin='round' clipPath='url(#clip0_143_582)'>
          <path d='M13.18 13.5a6.49 6.49 0 0 0-12.36 0h12.36z' />
          <path d='M7 9A4.232 4.232 0 1 0 7 .536 4.232 4.232 0 0 0 7 9z' />
          <path d='M8.382 6.405s-.351.691-1.382.691c-1.03 0-1.382-.69-1.382-.69m5.537-2.444h-.028a4.117 4.117 0 0 1-3.09-1.391 4.117 4.117 0 0 1-3.091 1.392 4.109 4.109 0 0 1-1.973-.501 4.234 4.234 0 0 1 8.182.5z' />
        </g>
        <defs>
          <clipPath id='clip0_143_582'>
            <path fill='#fff' d='M0 0h14v14H0z' />
          </clipPath>
        </defs>
      </symbol>
      <symbol id='arrowLeft' viewBox='0 0 8 12'>
        <path d='M7.41 10.58L2.83 6l4.58-4.59L6 0 0 6l6 6 1.41-1.42z' />
      </symbol>
      <symbol id='arrowUp' viewBox='0 0 24 24'>
        <path d='M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z' />
      </symbol>
      <symbol id='check' viewBox='0 0 512 512'>
        <path d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' />
      </symbol>
      <symbol id='close' viewBox='0 0 10 11'>
        <path
          fillRule='evenodd'
          d='M5 6.384l2.21 2.21a.625.625 0 0 0 .884-.884L5.884 5.5l2.21-2.21a.625.625 0 1 0-.885-.883L5 4.617l-2.21-2.21a.625.625 0 1 0-.884.883l2.21 2.21-2.21 2.21a.625.625 0 1 0 .885.884L5 6.384z'
          clipRule='evenodd'
        />
      </symbol>
      <symbol id='search' viewBox='0 0 16 16'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.857 13.143a6.286 6.286 0 1 0 0-12.572 6.286 6.286 0 0 0 0 12.572zm8.572 2.286l-4-4'
        />
      </symbol>
      <symbol id='filter' viewBox='0 0 10 11'>
        <g clipPath='url(#a)'>
          <path
            fillRule='evenodd'
            d='M6.667 6.75c.544 0 1.007.348 1.179.833h.487a.417.417 0 1 1 0 .834h-.487a1.25 1.25 0 0 1-2.359 0h-3.82a.417.417 0 1 1 0-.834h3.82a1.25 1.25 0 0 1 1.18-.833zm0 .833a.417.417 0 1 0 0 .834.417.417 0 0 0 0-.834zM3.333 4.25a1.25 1.25 0 0 1 1.151.762l.028.071h3.821a.417.417 0 0 1 .05.83l-.05.004h-3.82a1.25 1.25 0 0 1-2.33.071l-.029-.071h-.487a.417.417 0 0 1-.05-.83l.05-.004h.487a1.25 1.25 0 0 1 1.18-.833zm0 .833a.417.417 0 1 0 0 .834.417.417 0 0 0 0-.834zM6.667 1.75c.544 0 1.007.348 1.179.833h.487a.417.417 0 1 1 0 .834h-.487a1.25 1.25 0 0 1-2.359 0h-3.82a.417.417 0 1 1 0-.834h3.82a1.25 1.25 0 0 1 1.18-.833zm0 .833a.417.417 0 1 0 0 .834.417.417 0 0 0 0-.834z'
            clipRule='evenodd'
          />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h10v10H0z' transform='translate(0 .5)' />
          </clipPath>
        </defs>
      </symbol>
      <symbol id='up' viewBox='0 0 16 16'>
        <path fill='#fff' d='M4.94 10.273L8 7.22l3.06 3.053.94-.94-4-4-4 4 .94.94z' />
      </symbol>
      <symbol id='down' viewBox='0 0 16 16'>
        <path fill='#fff' d='M4.94 5.727L8 8.78l3.06-3.053.94.94-4 4-4-4 .94-.94z' />
      </symbol>
    </svg>
  );
}

export default SvgSprite;
