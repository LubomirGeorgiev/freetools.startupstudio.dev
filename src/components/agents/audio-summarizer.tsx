"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AudioSummarizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxFiles: 1
  });

  const removeFile = () => {
    setFiles([]);
    setProgress(0);
  };

  const processAudio = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    // Simulate progress for now
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    setIsProcessing(false);
  };
  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg">Audio to Text Converter</CardTitle>
          <CardDescription className="text-xs">
            Upload your audio file and we&apos;ll convert it to text using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ease-in-out ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'} ${files.length > 0 ? 'bg-muted/50' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-sm">Drop the audio file here...</p>
              ) : (
                <p className="text-sm">
                  Drag & drop an audio file here, or click to select
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Supports MP3, WAV, M4A, and OGG formats
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-sm truncate flex-1">
                  {files[0].name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground text-center">
                    Converting audio to text... {progress}%
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={processAudio}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Convert to Text"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Separator />
    </>
  );
}
