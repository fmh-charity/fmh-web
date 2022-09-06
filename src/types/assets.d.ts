declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.woff2";
declare module "*.woff";
declare module "*.ttf";
declare module "*.otf";
declare module "*.less";
declare module "*.css";
declare module "*.svg" {
  const content: any;
  export default content;
}
