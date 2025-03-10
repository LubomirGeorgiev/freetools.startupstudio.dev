import { Badge } from "@/components/ui/badge"
import { ChangelogSection } from "@/app/(app)/changelog/data"

interface ChangelogPageProps {
  changelogData: ChangelogSection[];
}

export default function ChangelogPage({ changelogData }: ChangelogPageProps) {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-2">Changelog</h1>
        <p className="text-xl text-gray-500 mb-16">New updates and improvements</p>

        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-[18px] top-8 bottom-0 w-[1px] bg-gray-700"></div>

          {changelogData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-24">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="bg-gray-900 text-white border-gray-700 py-1 px-3 text-sm">
                  {section.date}
                </Badge>
                <h2 className="text-3xl font-semibold">{section.title}</h2>
              </div>

              <div className="ml-12 space-y-8">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-gray-500 mt-2.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {item.description.includes(".cursorignore") ? (
                          <>
                            <code className="bg-gray-800 px-2 py-0.5 rounded">.cursorignore</code> now blocks files from being
                            added in chat or sent up for tab completions, in addition to ignoring them from indexing. We&apos;ve
                            introduced
                            <code className="bg-gray-800 px-2 py-0.5 rounded ml-1">.cursorindexingignore</code> for specifically
                            controlling file indexing.
                          </>
                        ) : item.description.includes("Ctrl+Shift+A") ? (
                          <>
                            Added new keyboard shortcuts for power users. Press{" "}
                            <code className="bg-gray-800 px-2 py-0.5 rounded">Ctrl+Shift+A</code> to quickly activate Agent,{" "}
                            <code className="bg-gray-800 px-2 py-0.5 rounded">Ctrl+Shift+F</code> for global search, and
                            <code className="bg-gray-800 px-2 py-0.5 rounded ml-1">Ctrl+.</code> to access the command palette.
                            View all shortcuts in Settings → Keyboard.
                          </>
                        ) : (
                          item.description
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

