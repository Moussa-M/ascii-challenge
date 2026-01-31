"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Beaker,
  Brain,
  Users,
  TrendingUp,
  Zap,
  Target,
  BookOpen,
  Lightbulb,
  ImageIcon,
  Sun,
  Moon,
  Download,
} from "lucide-react"

// ASCII Art dictionary converted from Python
const ASCII_ART_6LINE: Record<string, string[]> = {
  A: [" ████████╗", " ██╔═══██║", " ██║█████║", " ██║   ██║", " ██║   ██║", " ╚═╝   ╚═╝"],
  B: [" ██████╗ ", " ██╔══██╗", " ██████╔╝", " ██╔══██╗", " ██████╔╝", " ╚═════╝ "],
  C: ["  ██████╗ ", " ██╔═══██╗", " ██║      ", " ██║   ██║", " ╚██████╔╝", "  ╚═════╝ "],
  D: [" ██████╗ ", " ██╔══██╗", " ██║  ██║", " ██║  ██║", " ██████╔╝", " ╚═════╝ "],
  E: [" ███████╗", " ██╔════╝", " ███████╗", " ██╔════╝", " ███████╗", " ╚══════╝"],
  F: [" ███████╗", " ██╔════╝", " ███████╗", " ██╔════╝", " ██║     ", " ╚═╝     "],
  G: ["  ██████╗ ", " ██╔════╝ ", " ██║ ████║", " ██║   ██║", " ╚██████╔╝", "  ╚═════╝ "],
  H: [" ██╗  ██╗", " ██║  ██║", " ███████║", " ██╔══██║", " ██║  ██║", " ╚═╝  ╚═╝"],
  I: [" ██████╗", "   ██╔═╝", "   ██║  ", "   ██║  ", " ██████╗", " ╚═════╝"],
  J: ["      ██╗", "      ██║", "      ██║", " ██   ██║", " ╚█████╔╝", "  ╚════╝ "],
  K: [" ██╗  ██╗", " ██║ ██╔╝", " ████╔╝  ", " ██╔═██╗ ", " ██║  ██║", " ╚═╝  ╚═╝"],
  L: [" ██╗     ", " ██║     ", " ██║     ", " ██║     ", " ███████╗", " ╚══════╝"],
  M: [" ███╗   ███╗", " ████╗ ████║", " ██╔████╔██║", " ██║╚██╔╝██║", " ██║ ╚═╝ ██║", " ╚═╝     ╚═╝"],
  N: [" ███╗   ██╗", " ████╗  ██║", " ██╔██╗ ██║", " ██║╚██╗██║", " ██║ ╚████║", " ╚═╝  ╚═══╝"],
  O: ["  ██████╗ ", " ██╔═══██╗", " ██║   ██║", " ██║   ██║", " ╚██████╔╝", "  ╚═════╝ "],
  P: [" ██████╗ ", " ██╔══██╗", " ██████╔╝", " ██╔═══╝ ", " ██║     ", " ╚═╝     "],
  Q: ["  ██████╗ ", " ██╔═══██╗", " ██║   ██║", " ██║   ██║", " ╚██████╔╝", "   ╚═══██╗"],
  R: [" ██████╗ ", " ██╔══██╗", " ██████╔╝", " ██╔══██╗", " ██║  ██║", " ╚═╝  ╚═╝"],
  S: ["  ██████╗", " ██╔════╝", " ╚█████╗ ", "  ╚═══██╗", " ██████╔╝", " ╚═════╝ "],
  T: [" ████████╗", " ╚══██╔══╝", "    ██║   ", "    ██║   ", "    ██║   ", "    ╚═╝   "],
  U: [" ██╗   ██╗", " ██║   ██║", " ██║   ██║", " ██║   ██║", " ╚██████╔╝", "  ╚═════╝ "],
  V: [" ██╗   ██╗", " ██║   ██║", " ██║   ██║", " ╚██╗ ██╔╝", "  ╚████╔╝ ", "   ╚═══╝  "],
  W: [" ██╗     ██╗", " ██║     ██║", " ██║ ██  ██║", " ██║████╔██║", " ╚██╔██╔██╔╝", "  ╚═╝╚═╝╚═╝ "],
  X: [" ██╗   ██╗", " ╚██╗ ██╔╝", "  ╚████╔╝ ", "  ██╔██╗  ", " ██╔╝ ██╗ ", " ╚═╝  ╚═╝ "],
  Y: [" ██╗   ██╗", " ╚██╗ ██╔╝", "  ╚████╔╝ ", "   ╚██╔╝  ", "    ██║   ", "    ╚═╝   "],
  Z: [" ███████╗", " ╚═══███╝", "    ██╔╝ ", " ███╔╝   ", " ███████╗", " ╚═════╝"],

  // NUMBERS 0-9
  "0": ["  ██████╗ ", " ██╔═══██╗", " ██║   ██║", " ██║   ██║", " ╚██████╔╝", "  ╚═════╝ "],
  "1": ["  ██╗", " ███║", " ╚██║", "  ██║", "  ██║", "  ╚═╝"],
  "2": ["  ██████╗ ", " ██╔═══██╗", " ╚════██╔╝", "    ██╔╝  ", "  ███████╗", "  ╚══════╝"],
  "3": [" ██████╗", "     ██║", "  █████║", "     ██║", " ██████║", " ╚═════╝"],
  "4": [" ██╗  ██╗", " ██║  ██║", " ███████║", " ╚════██║", "      ██║", "      ╚═╝"],
  "5": [" ███████╗", " ██╔════╝", " ███████╗", " ╚════██║", " ███████╗", " ╚═════╝ "],
  "6": ["  ██████╗ ", " ██╔════╝ ", " ███████╗ ", " ██╔═══██╗", " ╚██████╔╝", "  ╚═════╝ "],
  "7": [" ███████╗ ", " ╚═══███║", "     ███╔╝", "    ██╔╝  ", "   ██╔╝  ", "   ╚══╝   "],
  "8": ["  ██████╗ ", " ██╔═══██╗", " ╚═█████╔╝", " ██╔═══██╗", " ╚██████╔╝", "  ╚═════╝ "],
  "9": ["  ███████╗", " ██╔═══██║", " ╚███████║", "  ╚════██║", "  ███████╝", "  ╚═════╝ "],

  // COMMON SYMBOLS
  "!": [" ██╗", " ██║", " ██║", " ╚═╝", " ██╗", " ╚═╝"],
  "?": ["  ██████╗ ", " ██╔═══██╗", "     ██╔═╝", "    ██╔╝  ", "    ██║   ", "    ╚═╝   "],
  ".": ["    ", "    ", "    ", "    ", " ██╗", " ╚═╝"],
  ",": ["   ", "   ", "   ", "   ", " ██", " ╚╝"],
  "'": [" ██", " ╚╝", "   ", "   ", "   ", "   "],
  "@": ["  ██████╗ ", " ██╔═══██╗", " ██║██╗██║", " ██║██║██║", " ╚██████╔╝", "  ╚═════╝ "],
  "#": ["  ██╗██╗ ", " ███████╗", " ╚██╔██╔╝", " ███████╗", " ╚██╔██╔╝", "  ╚═╝╚═╝ "],
  $: ["  ██████╗", " ██╔════╝", " ╚█████╗ ", "  ╚═══██╗", " ██████╔╝", " ╚═════╝ "],
  "%": [" ██╗  ██╗ ", " ╚═╝ ██╔╝ ", "    ██╔╝  ", "   ██╔╝   ", "  ██╔╝ ██╗", "  ╚═╝  ╚═╝"],
  "&": ["  ██╗  ██╗", " ████╗██╔╝", " ╚██╔╝██║ ", " ███╔╝██╗ ", " ╚██████║ ", "  ╚═════╝ "],
  "*": ["      ", "  ██╗ ", " ████╗", " ╚██╔╝", "  ╚═╝ ", "      "],
  "+": ["        ", "   ██╗  ", " ██████╗", " ╚═██╔═╝", "   ╚═╝  ", "        "],
  "-": ["        ", "        ", " ██████╗", " ╚═════╝", "        ", "        "],
  "=": ["        ", " ██████╗", " ╚═════╝", " ██████╗", " ╚═════╝", "        "],
  " ": ["   ", "   ", "   ", "   ", "   ", "   "],
}

function generateAsciiArt(text: string, dottedBg = false, selectedNoiseChar = "."): string {
  const upperText = text.toUpperCase()
  const lines: string[] = []

  for (let row = 0; row < 6; row++) {
    let line = ""
    for (const char of upperText) {
      if (char in ASCII_ART_6LINE) {
        let charLine = ASCII_ART_6LINE[char][row]
        if (dottedBg) {
          charLine = charLine.replace(/ /g, selectedNoiseChar)
        }
        line += charLine
      } else {
        const fallbackChar = "?" + (dottedBg ? selectedNoiseChar + selectedNoiseChar : "  ")
        line += fallbackChar
      }
    }
    lines.push(line)
  }

  return lines.join("\n")
}

export default function AsciiArtGenerator() {
  const [inputText, setInputText] = useState("ABC123")
  const [dottedBg, setDottedBg] = useState(true)
  const [noiseChar, setNoiseChar] = useState("▒")
  const [asciiOutput, setAsciiOutput] = useState("")
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "error">("idle")
  const [copyImageStatus, setCopyImageStatus] = useState<"idle" | "copying" | "copied" | "error">("idle")
  const [showResearch, setShowResearch] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const result = generateAsciiArt("ABC123", true, "▒")
    setAsciiOutput(result)
  }, [])

  const handleGenerate = () => {
    if (inputText.trim()) {
      const result = generateAsciiArt(inputText, dottedBg, noiseChar)
      setAsciiOutput(result)
    }
  }

  const handleCopy = async () => {
    setCopyStatus("copying")
    try {
      await navigator.clipboard.writeText(asciiOutput)
      setCopyStatus("copied")
      setTimeout(() => setCopyStatus("idle"), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      setCopyStatus("error")
      setTimeout(() => setCopyStatus("idle"), 2000)
    }
  }

  const handleCopyAsImage = async () => {
    setCopyImageStatus("copying")
    try {
      // Create a canvas element
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      // Set font and measure text
      const fontSize = 14
      const fontFamily = "monospace"
      ctx.font = `${fontSize}px ${fontFamily}`

      const lines = asciiOutput.split("\n")
      const maxWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
      const lineHeight = fontSize * 1.6 // Increased line height from fontSize * 1.2 to fontSize * 1.6 to match proper ASCII art spacing

      // Set canvas size with padding
      const padding = 20
      canvas.width = maxWidth + padding * 2
      canvas.height = lines.length * lineHeight + padding * 2

      ctx.fillStyle = isDarkTheme ? "#0f172a" : "#ffffff" // dark slate or white background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isDarkTheme ? "#22c55e" : "#000000" // green or black text
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textBaseline = "top"

      // Draw each line
      lines.forEach((line, index) => {
        ctx.fillText(line, padding, padding + index * lineHeight)
      })

      // Convert to blob and copy to clipboard
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Could not create image blob")

        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])

        setCopyImageStatus("copied")
        setTimeout(() => setCopyImageStatus("idle"), 2000)
      }, "image/png")
    } catch (err) {
      console.error("Failed to copy image: ", err)
      setCopyImageStatus("error")
      setTimeout(() => setCopyImageStatus("idle"), 2000)
    }
  }

  const handleOpenAIChat = () => {
    const message = `read this:\n\n${asciiOutput}`
    const encodedMessage = encodeURIComponent(message)
    const chatGPTUrl = `https://chat.openai.com/?q=${encodedMessage}`
    window.open(chatGPTUrl, "_blank")
  }

  const handleGrokChat = () => {
    const message = `read this:\n\n${asciiOutput}`
    const encodedMessage = encodeURIComponent(message)
    const grokUrl = `https://grok.com/?q=${encodedMessage}`
    window.open(grokUrl, "_blank")
  }

  const handleClaudeChat = () => {
    const message = `read this:\n\n${asciiOutput}`
    const encodedMessage = encodeURIComponent(message)
    const claudeUrl = `https://claude.ai/new?q=${encodedMessage}`
    window.open(claudeUrl, "_blank")
  }

  const getCopyButtonProps = () => {
    switch (copyStatus) {
      case "copying":
        return { text: "Copying...", variant: "outline" as const, disabled: true }
      case "copied":
        return { text: "✓ Copied!", variant: "default" as const, disabled: false }
      case "error":
        return { text: "Failed", variant: "destructive" as const, disabled: false }
      default:
        return { text: "Copy", variant: "outline" as const, disabled: false }
    }
  }

  const getCopyImageButtonProps = () => {
    switch (copyImageStatus) {
      case "copying":
        return { text: "Creating...", variant: "outline" as const, disabled: true }
      case "copied":
        return { text: "✓ Copied!", variant: "default" as const, disabled: false }
      case "error":
        return { text: "Failed", variant: "destructive" as const, disabled: false }
      default:
        return { text: "Copy as Image", variant: "outline" as const, disabled: false }
    }
  }

  const copyButtonProps = getCopyButtonProps()
  const copyImageButtonProps = getCopyImageButtonProps()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <Badge
                variant="outline"
                className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-primary text-primary bg-background"
              >
                <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Research Tool & Consumer App
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight px-2">
                ASCII Challenge
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
                Discover the surprising limitations of advanced AI through simple ASCII art challenges
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-sm text-muted-foreground px-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>For Researchers & General Users</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span>Test AI Limitations</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-card border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground flex items-center gap-3">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  ASCII Art Generator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
                  Create ASCII art to test AI reading capabilities
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs self-start sm:self-auto">
                Live Tool
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="text-input" className="text-sm sm:text-base font-semibold text-foreground">
                    Input Text
                  </Label>
                  <Input
                    id="text-input"
                    placeholder="Enter text (e.g., ABC123, HI, TEST)"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    className="text-base sm:text-lg h-10 sm:h-12 bg-background border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="dotted-bg"
                      checked={dottedBg}
                      onCheckedChange={(checked) => setDottedBg(checked as boolean)}
                      className="border-2 border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
                      aria-label="Add noise pattern to increase difficulty for AI reading"
                    />
                    <Label
                      htmlFor="dotted-bg"
                      className="text-sm sm:text-base font-medium text-foreground cursor-pointer"
                    >
                      Add noise pattern (increases difficulty)
                    </Label>
                  </div>

                  {dottedBg && (
                    <div className="ml-6 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <Label htmlFor="noise-char" className="text-sm font-medium text-foreground">
                        Pattern type:
                      </Label>
                      <select
                        id="noise-char"
                        value={noiseChar}
                        onChange={(e) => setNoiseChar(e.target.value)}
                        className="text-sm px-3 py-2 rounded-md border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-foreground w-full sm:w-auto"
                      >
                        <option value=".">• Dots (easy)</option>
                        <option value="░">░ Light shade (easy) </option>
                        <option value="♥">♥ Hearts (easy)</option>
                        <option value="★">★ Stars (easy)</option>
                        <option value="●">● Circles (easy)</option>
                        <option value="▒">▒ Medium shade (medium)</option>
                        <option value="◆">◆ Diamonds (hard)</option>
                        <option value="■">■ Squares (hard)</option>
                        <option value="▲">▲ Triangles (hard)</option>
                        <option value="▓">▓ Dark shade (very hard)</option>
                      </select>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base h-10 sm:h-12"
                >
                  Generate ASCII Art
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-card rounded-lg p-4 sm:p-6 border-2 border-border">
                  <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Target className="w-4 h-4 text-primary" />
                    Quick Test Suggestions
                  </h2>
                  <div className="space-y-2 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>Base/Common:</strong> Try "ABC123"
                    </p>
                    <p>
                      <strong>UnCommon:</strong> Try "FARHANITRATE" or "PRERAJULISATION" (new word combinations)
                    </p>
                    <p>
                      <strong>Add noise:</strong> Enable noise pattern for extra difficulty
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {asciiOutput && (
              <div className="space-y-4">
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">Generated ASCII Art</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenAIChat}
                      className="text-xs border-2 border-foreground/30 hover:bg-foreground hover:text-background bg-background text-foreground font-medium min-h-[32px]"
                    >
                      Test with ChatGPT
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGrokChat}
                      className="text-xs border-2 border-foreground/30 hover:bg-foreground hover:text-background bg-background text-foreground font-medium min-h-[32px]"
                    >
                      Test with Grok
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClaudeChat}
                      className="text-xs border-2 border-foreground/30 hover:bg-foreground hover:text-background bg-background text-foreground font-medium min-h-[32px]"
                    >
                      Test with Claude
                    </Button>
                    <Button
                      variant={copyButtonProps.variant}
                      size="sm"
                      onClick={handleCopy}
                      disabled={copyButtonProps.disabled}
                      className="text-xs min-w-[70px] border-2 border-foreground/30 bg-background text-foreground font-medium hover:bg-foreground hover:text-background min-h-[32px]"
                    >
                      {copyButtonProps.text}
                    </Button>
                    <Button
                      variant={copyImageButtonProps.variant}
                      size="sm"
                      onClick={handleCopyAsImage}
                      disabled={copyImageButtonProps.disabled}
                      className="text-xs min-w-[120px] flex items-center gap-1 border-2 border-foreground/30 bg-background text-foreground font-medium hover:bg-foreground hover:text-background min-h-[32px]"
                    >
                      <ImageIcon className="w-3 h-3" />
                      {copyImageButtonProps.text}
                    </Button>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 sm:p-6 overflow-x-auto border border-border relative ${
                    isDarkTheme ? "bg-slate-900" : "bg-white"
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                    className="absolute top-2 right-2 p-2 h-8 w-8 hover:bg-muted/80"
                    aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
                  >
                    {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                  <pre
                    className={`text-xs sm:text-sm font-mono whitespace-pre ${isDarkTheme ? "text-green-400" : "text-black"}`}
                    style={{ lineHeight: "normal" }}
                    role="img"
                    aria-label={`ASCII art representation of: ${inputText}`}
                  >
                    {asciiOutput}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader
            className="bg-card border-b border-border cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => setShowResearch(!showResearch)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setShowResearch(!showResearch)}
            aria-expanded={showResearch}
            aria-controls="research-content"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-2xl font-bold text-primary flex items-center gap-2">
                    Research Findings & Methodology
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground mt-1">
                    Academic insights into AI limitations and human cognitive superiority
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <Badge variant="secondary" className="text-xs">
                  Peer-Reviewed Insights
                </Badge>
                {showResearch ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>

          {showResearch && (
            <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8" id="research-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                      The Paradox
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs sm:text-sm text-foreground space-y-2">
                    <p>
                      Advanced AI systems capable of writing code, creating art, and processing vast amounts of
                      information are completely stumped by simple ASCII art that a 6-year-old can read instantly.
                    </p>
                    <p>
                      This reveals a fundamental blind spot: AI excels at <strong>pattern matching</strong> but lacks
                      true <strong>visual abstraction</strong> - the ability to see the forest, not just the trees.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                      Human Advantage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs sm:text-sm text-foreground space-y-2">
                    <p>
                      Humans achieve <strong className="text-emerald-600">98%+ accuracy</strong> through contextual
                      understanding and top-down processing - we see the big picture first, then fill in details.
                    </p>
                    <p>
                      AI processes bottom-up, analyzing every character individually without the conceptual framework
                      that makes human vision so robust.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      Critical Implications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs sm:text-sm text-foreground space-y-2">
                    <p>
                      If AI fails at simple text made of text, what about medical imaging, autonomous vehicles, or
                      security systems? This brittleness has profound implications for AI deployment.
                    </p>
                    <p>
                      Understanding these limitations is crucial for responsible AI integration and setting realistic
                      expectations.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">The Science Behind the Failure</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">Why AI Fails</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Training Data Dependency:</strong> AI recognizes patterns from millions of training
                          examples. New word combinations like "FARHANITRATE" or "ABC123" are edge cases with zero
                          training examples, exposing AI's reliance on memorized patterns rather than true
                          understanding.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Noise Sensitivity:</strong> Random characters flood AI's pattern detectors with
                          irrelevant data points, causing complete system breakdown.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Lack of Context:</strong> AI cannot separate signal from noise like humans do through
                          expectation and contextual understanding.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>OCR Limitations:</strong> Optical Character Recognition expects neat, tidy text -
                          ASCII art breaks all the rules.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">Experimental Results</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>
                          <strong>Common Words:</strong> Claude Sonnet 4 achieves ~25% success on high-frequency English
                          words like "PATTERN" or "HELLO"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>
                          <strong>New Word Combinations:</strong> 0% success across all models (GPT-5, Claude, Grok,
                          Gemini) on innovative combinations like "ABC123", "FARHANITRATE", or "PRERAJULISATION" -
                          proving AI is just pattern recognition, not true reading comprehension
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>
                          <strong>With Noise:</strong> Complete failure even for previously successful words - noise
                          patterns cause total breakdown
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>
                          <strong>Human Performance:</strong> 98%+ accuracy across all difficulty levels, including
                          heavy noise patterns
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-4 sm:p-6 border-2 border-border">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Broader Implications for AI Development
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>The New Word Test:</strong> This experiment reveals AI's fundamental limitation - it
                      cannot truly "read" but only matches memorized patterns. When presented with new word combinations
                      that weren't in its training data, AI fails completely, while humans succeed through genuine
                      comprehension and abstraction.
                    </p>
                    <p>
                      <strong>Real-World Applications:</strong> This brittleness extends beyond ASCII art. Consider
                      CAPTCHAs (which still work because of this limitation), medical imaging with background noise, or
                      autonomous vehicles interpreting unclear road signs.
                    </p>
                    <p>
                      <strong>The Partnership Model:</strong> Rather than replacing human intelligence, AI should
                      complement it. Use AI for data analysis and pattern finding, while humans handle nuance,
                      abstraction, and messy real-world interpretation.
                    </p>
                    <p>
                      <strong>Future Research Directions:</strong> This challenge points to fundamental questions about
                      AI perception. What other "simple" human tasks remain impossible for AI? Understanding sarcasm?
                      Reading body language? Interpreting context?
                    </p>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-4 sm:p-6 border-2 border-border">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                    Try the Experiment Yourself
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-foreground">
                    <li>
                      Generate ASCII art using new word combinations (start with "ABC123" or "FARHANITRATE" for
                      guaranteed failure)
                    </li>
                    <li>
                      Click any "Test with [AI]" button - it opens the AI chat with the ASCII art already included
                    </li>
                    <li>Ask the AI to read the ASCII art (or just wait for its response)</li>
                    <li>Try common English words like "PATTERN" to see Claude's partial success</li>
                    <li>Add noise patterns to see complete failure across all models</li>
                    <li>Compare with human performance (show to any child - they'll read it instantly)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </main>

      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025{" "}
              <a
                href="https://ba.apertacodex.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Beyond Automation
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <span className="text-muted-foreground">Created by</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://moussamokhtari.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Moussa Mokhtari
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://github.com/moussa-m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  GitHub
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://www.linkedin.com/in/moussa-mokhtari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
