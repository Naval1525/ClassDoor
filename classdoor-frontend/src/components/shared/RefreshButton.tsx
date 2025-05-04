import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

const RefreshButton = () => {
  return (
    <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-black border-gray-700"
          onClick={() => console.log("Refresh clicked")}
        >
          <RotateCcw size={16} className="mr-2" />
          Refresh
        </Button>
  )
}

export default RefreshButton
