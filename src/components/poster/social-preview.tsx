'use client'

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, ThumbsUp, Repeat2, Bookmark, ArrowUpFromLine, Copy, Check } from 'lucide-react'
import { ImageUpload } from "./image-upload"
import { toast } from "@/hooks/use-toast"
import { SocialCard } from "./social-card"
import { INITIAL_POST_TEXTS } from "./posts"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: '/logos/facebook.svg' },
  { id: 'facebookReels', name: 'Facebook Reels', icon: '/logos/facebook.svg' },
  { id: 'x', name: 'X', icon: '/logos/x_light.svg', darkIcon: '/logos/x_dark.svg' },
  { id: 'instagram', name: 'Instagram', icon: '/logos/instagram.svg' },
  { id: 'instagramReels', name: 'Instagram Reels', icon: '/logos/instagram.svg' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/logos/linkedin.svg' },
  { id: 'discord', name: 'Discord', icon: '/logos/discord.svg' },
  { id: 'reddit', name: 'Reddit', icon: '/logos/reddit.svg' },
  { id: 'quora', name: 'Quora', icon: '/logos/quora.svg' },
  { id: 'tiktok', name: 'TikTok', icon: '/logos/tiktok.svg' },
  { id: 'youtubeShorts', name: 'YouTube Shorts', icon: '/logos/youtube_shorts.svg' },
]

export default function SocialPreview() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'x'])
  const [postTexts, setPostTexts] = useState(INITIAL_POST_TEXTS)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})
  const [lastPicked, setLastPicked] = useState<{ [key: string]: number }>({})
  const isDark = useTheme()

  const handleTextChange = (platformId: string, text: string) => {
    const platform = PLATFORMS.find(p => p.id === platformId)
    if (!platform) return

    setPostTexts(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId as keyof typeof prev],
        text
      }
    }))
  }

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
  }

  const copyToClipboard = (text: string, platformId: string) => {
    const platform = PLATFORMS.find(p => p.id === platformId)!
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [platformId]: true }))
      toast({
        title: "Text Copied",
        description: `The text for ${platform.name} has been copied to your clipboard.`,
      })
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [platformId]: false }))
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy text: ', err)
      toast({
        title: "Copy Failed",
        description: `Failed to copy text for ${platform.name}. Please try again.`,
        variant: "destructive",
      })
    })
  }

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const isSelected = prev.includes(platformId)
      if (!isSelected) {
        setLastPicked(prev => ({ ...prev, [platformId]: Date.now() }))
      }
      return isSelected
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    })
  }

  const sortedSelectedPlatforms = [...selectedPlatforms].sort((a, b) => {
    return (lastPicked[b] || 0) - (lastPicked[a] || 0)
  })

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen">
      {/* Left side - Post creation form */}
      <div className="w-full lg:w-1/2 space-y-6">
        <Card className="bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Create your posts</h2>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const now = Date.now()
                    setSelectedPlatforms(PLATFORMS.map(p => p.id))
                    setLastPicked(
                      PLATFORMS.reduce((acc, p) => ({
                        ...acc,
                        [p.id]: now
                      }), {})
                    )
                  }}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPlatforms([])}
                >
                  Deselect All
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${selectedPlatforms.includes(platform.id) ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <Avatar className="h-8 w-8 p-1">
                      <AvatarImage
                        src={isDark && platform.darkIcon ? platform.darkIcon : platform.icon}
                        alt={platform.name}
                      />
                      <AvatarFallback>{platform.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                ))}
              </div>

              {selectedPlatforms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground mb-4">No social channels selected</p>
                  <p className="text-sm text-muted-foreground">Select one or more social channels above to start creating your post</p>
                </div>
              ) : (
                PLATFORMS.filter(platform => selectedPlatforms.includes(platform.id)).map((platform) => {
                  const postText = postTexts[platform.id as keyof typeof postTexts]
                  const remainingChars = (postText.maxCharacters - postText?.text?.length) || 0
                  const isOverLimit = remainingChars < 0

                  return (
                    <div key={platform.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4 dark:bg-slate-950">
                            <AvatarImage
                              src={isDark && platform.darkIcon ? platform.darkIcon : platform.icon}
                              alt={platform.name}
                            />
                            <AvatarFallback>{platform.name[0]}</AvatarFallback>
                          </Avatar>
                          <Label htmlFor={`post-text-${platform.id}`}>{platform.name} Post Text</Label>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={cn(
                            "text-muted-foreground",
                            isOverLimit && "text-destructive"
                          )}>
                            {remainingChars} characters remaining
                          </span>
                          <span className="text-muted-foreground">
                            ({postText.imageWidth}x{postText.imageHeight})
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          id={`post-text-${platform.id}`}
                          value={postText.text}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(platform.id, e.target.value)}
                          placeholder={`Enter your ${platform.name} post text`}
                          className={cn(
                            "flex-grow min-h-[100px] resize-none",
                            isOverLimit && "border-destructive"
                          )}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="self-start"
                          onClick={() => copyToClipboard(postText.text, platform.id)}
                          aria-label={`Copy ${platform.name} text`}
                        >
                          {copiedStates[platform.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}

            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Disclaimer:</span> The previews provided by this social media tool are for illustrative purposes only. They are not guaranteed to be accurate as social media platforms frequently update their designs. Please note that actual appearances on each platform may vary.</p>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Preview section */}
      <div className="w-full lg:w-1/2 sticky top-0 h-[calc(100vh-3rem)] lg:h-screen mt-6 lg:mt-0">
        <Card className="bg-background h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Social networks tweak their design all the time. This is our best estimate of how this will look once published.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-18rem)] lg:h-[calc(100vh-12rem)] pr-4">
              <div className="space-y-8 max-w-md mx-auto py-6">
                {selectedPlatforms.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground mb-4">No previews to show</p>
                    <p className="text-sm text-muted-foreground">Select one or more social channels to see how your post will look</p>
                  </div>
                ) : (
                  sortedSelectedPlatforms.map(platformId => {
                    const platform = PLATFORMS.find(p => p.id === platformId)
                    if (!platform) return null

                    let customActions: { icon: React.ReactNode; label: string; onClick: () => void }[] = []
                    switch (platformId) {
                      case 'facebook':
                      case 'facebookReels':
                        customActions = [
                          { icon: <ThumbsUp className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      case 'x':
                        customActions = [
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Reply', onClick: () => { } },
                          { icon: <Repeat2 className="h-4 w-4" />, label: 'Repost', onClick: () => { } },
                          { icon: <Heart className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                        ]
                        break
                      case 'instagram':
                      case 'instagramReels':
                        customActions = [
                          { icon: <Heart className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      case 'linkedin':
                        customActions = [
                          { icon: <ThumbsUp className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Repeat2 className="h-4 w-4" />, label: 'Repost', onClick: () => { } },
                        ]
                        break
                      case 'discord':
                        customActions = [
                          { icon: <Heart className="h-4 w-4" />, label: 'React', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Reply', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      case 'reddit':
                        customActions = [
                          { icon: <ArrowUpFromLine className="h-4 w-4" />, label: 'Vote', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                          { icon: <Bookmark className="h-4 w-4" />, label: 'Save', onClick: () => { } },
                        ]
                        break
                      case 'quora':
                        customActions = [
                          { icon: <ThumbsUp className="h-4 w-4" />, label: 'Upvote', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      case 'tiktok':
                        customActions = [
                          { icon: <Heart className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      case 'youtubeShorts':
                        customActions = [
                          { icon: <ThumbsUp className="h-4 w-4" />, label: 'Like', onClick: () => { } },
                          { icon: <MessageSquare className="h-4 w-4" />, label: 'Comment', onClick: () => { } },
                          { icon: <Share2 className="h-4 w-4" />, label: 'Share', onClick: () => { } },
                        ]
                        break
                      default:
                        customActions = []
                    }

                    return (
                      <SocialCard
                        key={platformId}
                        platform={platform}
                        username={platformId === 'instagram' || platformId === 'instagramReels' ? 'your_handle' : `${platform.name} user`}
                        subtitle={getPlatformSubtitle(platformId)}
                        timestamp={platformId !== 'instagram' && platformId !== 'instagramReels' ? 'Just now' : undefined}
                        content={postTexts[platformId as keyof typeof postTexts].text}
                        maxCharacters={postTexts[platformId as keyof typeof postTexts].maxCharacters}
                        imageWidth={postTexts[platformId as keyof typeof postTexts].imageWidth}
                        imageHeight={postTexts[platformId as keyof typeof postTexts].imageHeight}
                        imageUrl={uploadedImage}
                        isReel={platformId === 'facebookReels' || platformId === 'instagramReels' || platformId === 'tiktok' || platformId === 'youtubeShorts'}
                        onCopy={(text: string) => copyToClipboard(text, platformId)}
                        isCopied={copiedStates[platformId]}
                        customActions={customActions}
                        className="w-full"
                      />
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getPlatformSubtitle(platformId: string): string | undefined {
  switch (platformId) {
    case 'facebookReels':
    case 'instagramReels':
      return 'Reels'
    case 'youtubeShorts':
      return 'Shorts'
    case 'x':
      return '@yourhandle'
    case 'linkedin':
      return 'Your Title'
    case 'tiktok':
      return '@your_tiktok_handle'
    default:
      return undefined
  }
}
