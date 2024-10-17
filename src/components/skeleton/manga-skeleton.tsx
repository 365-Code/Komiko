import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function MangaDetailsSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      {/* Header */}
      <div id="manga-header" className="grid md:grid-cols-2">
        <div className="relative h-full w-full">
          <div className="h-full w-full md:absolute md:left-0 md:top-0">
            <div className="mx-auto w-fit">
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          </div>
        </div>

        <div className="my-auto flex w-full max-w-[80%] flex-col gap-4 p-4 sm:p-0 sm:text-4xl">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="w-20 h-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mx-auto flex w-full flex-1 flex-col py-4 md:mt-8 md:overflow-hidden md:bg-white/40 md:px-16">
        <div className="grid gap-2 md:grid-cols-2">
          <div />
          {/* Actions */}
          <div className="relative px-4 md:px-0 md:py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Skeleton className="w-32 h-10" />
              <div className="flex w-fit items-center gap-2">
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
              </div>
            </div>
            <Separator className="mt-2" />
          </div>
        </div>

        {/* Details */}
        <div className="grid flex-1 gap-2 md:grid-cols-2">
          {/* Description */}
          <Card className="mb-2 h-fit md:basis-[45%]">
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>
          </Card>

          {/* other details */}
          <div className="h-fit">
            <div className="flex h-full flex-col-reverse md:flex-col">
              {/* Genres */}
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-16 h-6" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Chapters */}
              <Card className="mb-2 flex h-fit flex-col overflow-hidden">
                <CardHeader>Chapters</CardHeader>
                <CardContent>
                  <ScrollArea className="h-[150px] w-full">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <Skeleton className="w-3/4 h-4" />
                        <Skeleton className="w-16 h-6" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}