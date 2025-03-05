import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Heart, MessageCircle, Share2, Check, Copy, Music, Play } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

type Platform = {
    id: string
    name: string
    icon: string
    darkIcon?: string
}

type ActionButton = {
    icon: React.ReactNode
    label?: string
    onClick?: () => void
}

export type SocialCardProps = {
    platform: Platform
    username: string
    subtitle?: string
    timestamp?: string
    content: string
    imageUrl: string | null
    isReel?: boolean
    onCopy?: (text: string) => void
    isCopied?: boolean
    customActions?: ActionButton[]
    className?: string
    maxCharacters?: number
    imageWidth?: number
    imageHeight?: number
}

export function SocialCard({
    platform,
    username,
    subtitle,
    timestamp,
    content,
    imageUrl,
    isReel = false,
    onCopy,
    isCopied = false,
    customActions,
    className,
    maxCharacters,
    imageWidth,
    imageHeight,
}: SocialCardProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const isDiscord = platform.id === 'discord'
    const aspectRatio = isReel ? 'aspect-[9/16]' : 'aspect-video'
    const remainingChars = maxCharacters ? maxCharacters - (content?.length || 0) : null

    const defaultActions: ActionButton[] = [
        { icon: <Heart className="h-6 w-6" />, label: 'Like', onClick: () => { } },
        { icon: <MessageCircle className="h-6 w-6" />, label: 'Comment', onClick: () => { } },
        { icon: <Share2 className="h-6 w-6" />, label: 'Share', onClick: () => { } },
    ]

    const actions = customActions || defaultActions

    return (
        <Card className={cn(isDiscord ? 'bg-background' : '', className)}>
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4 border-b pb-4">
                    <Avatar className="p-2">
                        <AvatarImage
                            src={isDark && platform.darkIcon ? platform.darkIcon : platform.icon}
                            alt={platform.name}
                        />
                        <AvatarFallback>{platform.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{username}</p>
                        {(subtitle || timestamp) && (
                            <p className="text-sm text-muted-foreground">
                                {subtitle} {timestamp && `• ${timestamp}`}
                            </p>
                        )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="ml-auto">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {onCopy && (
                                <DropdownMenuItem onClick={() => onCopy(content)}>
                                    {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                    Copy text
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {!isReel && (
                    <>
                        <p className="mb-2 whitespace-pre-wrap">{content}</p>
                        {remainingChars !== null && (
                            <p className={cn(
                                "text-xs mb-2",
                                remainingChars < 0 ? "text-destructive" : "text-muted-foreground"
                            )}>
                                {remainingChars} characters remaining
                            </p>
                        )}
                    </>
                )}

                <div className={cn("relative w-full mb-4 rounded-lg overflow-hidden", aspectRatio)}>
                    <Image
                        src={imageUrl || (theme === "dark" ? "/fallback-dark.svg" : "/fallback.svg")}
                        alt="Post preview"
                        fill
                        className="object-cover"
                    />
                    {(imageWidth || imageHeight) && (
                        <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded">
                            {imageWidth}x{imageHeight} px
                        </div>
                    )}
                    {isReel && (
                        <>
                            <div className="absolute bottom-4 left-4 max-w-[75%]">
                                <p className="text-gray-300 text-shadow-sm mb-2 whitespace-pre-wrap">{content}</p>
                                {maxCharacters && (
                                    <p className={cn(
                                        "text-xs",
                                        remainingChars && remainingChars < 0 ? "text-red-400" : "text-gray-200"
                                    )}>
                                        {remainingChars} characters remaining
                                    </p>
                                )}
                            </div>
                            <div className="absolute bottom-4 right-4 flex flex-col items-center gap-6">
                                {actions.map((action, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/20 h-12 w-12"
                                        onClick={action.onClick}
                                    >
                                        {action.icon}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {!isReel && (
                    <div className="flex items-center border-t pt-3 mt-3">
                        <div className="flex-1 flex justify-between">
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-transparent"
                                    onClick={action.onClick}
                                >
                                    {action.icon}
                                    {action.label && <span className="ml-2">{action.label}</span>}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {isReel && platform.id === 'tiktok' && (
                    <div className="flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">Original sound - {username}</p>
                    </div>
                )}

                {isReel && platform.id === 'youtube-shorts' && (
                    <div className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">YouTube Shorts</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}