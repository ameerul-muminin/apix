import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TutorialNavigationProps {
  prevHref?: string
  prevLabel?: string
  nextHref?: string
  nextLabel?: string
}

export function TutorialNavigation({ prevHref, prevLabel, nextHref, nextLabel }: TutorialNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button variant="outline" asChild disabled={!prevHref}>
        {prevHref ? (
          <Link href={prevHref}>
            <ArrowLeft className="mr-2 h-4 w-4" /> {prevLabel || "Previous"}
          </Link>
        ) : (
          <span>Previous</span>
        )}
      </Button>
      <Button asChild disabled={!nextHref}>
        {nextHref ? (
          <Link href={nextHref}>
            {nextLabel || "Next"} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <span>Next</span>
        )}
      </Button>
    </div>
  )
}

