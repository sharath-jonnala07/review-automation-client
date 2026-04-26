import OpenGraphImage from "../(marketing)/opengraph-image";

export const runtime = "edge";

export function GET() {
  return OpenGraphImage();
}
