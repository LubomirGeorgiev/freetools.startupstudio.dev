

import AudioSummarizer from "@/components/agents/audio-summarizer";

import { notFound } from "next/navigation";


export default function AudiorizerPage() {
  // TODO: Remove this when we are ready to launch
  if (process.env.NODE_ENV === "production") {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-2 text-center">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          AI-Powered Meeting Transcription & Summarization
        </h1>
        <p className="text-sm text-muted-foreground">
          Transform your business meetings into actionable insights with our advanced audio transcription service
        </p>
      </div>
      <AudioSummarizer />
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <h2 className="text-lg font-medium tracking-tight">
          Streamline Your Meeting Documentation Process
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Perfect for Business Professionals</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
              <li>Record and transcribe team meetings and client calls</li>
              <li>Generate automated meeting minutes and summaries</li>
              <li>Track action items and decisions made</li>
              <li>Improve team collaboration and communication</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Key Benefits</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
              <li>Save time on manual meeting documentation</li>
              <li>Never miss important meeting details</li>
              <li>Easy sharing and archiving of meeting content</li>
              <li>Searchable meeting transcript database</li>
            </ul>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-lg font-medium tracking-tight">
            Why Choose Our Meeting Transcription Service?
          </h2>
          <p className="text-xs text-muted-foreground">
            Our AI-powered audio transcription tool is designed specifically for business meetings and professional conversations.
            Using advanced speech recognition technology, we provide accurate transcriptions of your meetings while identifying
            key topics, action items, and important decisions. Perfect for businesses of all sizes, from startups to enterprise
            organizations looking to maintain detailed records of their meetings and improve team productivity.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4 text-center sm:grid-cols-3 mb-6">
        {[
          {
            title: "Accurate Transcription",
            description: "Enterprise-grade speech recognition for clear, precise meeting transcripts"
          },
          {
            title: "Smart Summaries",
            description: "AI-generated meeting highlights and key action items"
          },
          {
            title: "Secure & Confidential",
            description: "Enterprise-level security for your sensitive business conversations"
          }
        ].map((feature) => (
          <div key={feature.title} className="space-y-1">
            <h3 className="text-sm font-medium">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
