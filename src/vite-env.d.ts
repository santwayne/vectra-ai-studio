/// <reference types="vite/client" />

// Support for double-extension image files (e.g. photo.jpg.jpeg)
declare module "*.jpg.jpeg" {
  const src: string;
  export default src;
}
