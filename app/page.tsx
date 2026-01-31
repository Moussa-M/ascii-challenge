import AsciiArtGenerator from "./ascii-art-client"

export const metadata = {
  title: "ASCII Challenge - The Simple Test That Breaks AI",
  description:
    "Create ASCII art that stumps the world's smartest AI models. A fascinating experiment that reveals the gap between human perception and artificial intelligence. Try it yourself.",
  keywords:
    "ASCII art, AI test, artificial intelligence limits, ChatGPT challenge, Claude test, machine learning weakness, visual perception AI, human vs AI, cognitive test, AI benchmark",
  author: "ASCII Challenge Lab",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ASCII Challenge - The Simple Test That Breaks AI",
    description:
      "Create ASCII art that stumps advanced AI models. A fascinating experiment revealing the surprising gap between human and artificial intelligence.",
    type: "website",
    url: "https://ascii-challenge.apertacodex.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Challenge - The Simple Test That Breaks AI",
    description:
      "Create ASCII art that stumps advanced AI models. A fascinating experiment revealing the surprising gap between human and artificial intelligence.",
  },
}

export default function Home() {
  return <AsciiArtGenerator />
}
