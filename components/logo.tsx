import { cn } from "@/lib/utils"

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(className, "text-primary")}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20,50 C20,30 35,20 50,20 C65,20 80,30 80,50 C80,70 65,80 50,80 C35,80 20,70 20,50" />
      <path d="M35,50 L65,50" />
      <path d="M50,35 L50,65" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  )
}

