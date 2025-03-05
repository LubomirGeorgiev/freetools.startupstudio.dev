'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUp } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  classNames?: {
    button?: string
    buttonIcon?: string
  }
}

export function ImageUpload({ onImageUpload, classNames }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImageUpload(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={previewUrl ? "default" : "secondary"}
                onClick={handleButtonClick}
                className={cn(
                  "rounded-full",
                  !previewUrl && "bg-muted hover:bg-muted/80",
                  classNames?.button
                )}
              >
                <ImageUp className={cn(
                  "h-5 w-5",
                  !previewUrl ? "text-muted-foreground" : "text-primary-foreground",
                  classNames?.buttonIcon
                )} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload image"
        />
      </div>
      {previewUrl && (
        <div className="mt-4">
          <Label>Preview</Label>
          <div className="mt-2 relative aspect-video w-full h-48 bg-muted rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}
