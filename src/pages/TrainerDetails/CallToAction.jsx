import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Zap } from 'lucide-react'

// Sample integration data - in a real app this would likely come from an API or database
const integrations = [
  { id: 1, image: "/placeholder.svg?height=40&width=40", name: "Integration 1" },
  { id: 2, image: "/placeholder.svg?height=40&width=40", name: "Integration 2" },
  { id: 3, image: "/placeholder.svg?height=40&width=40", name: "Integration 3" },
  { id: 4, image: "/placeholder.svg?height=40&width=40", name: "Integration 4" },
  { id: 5, image: "/placeholder.svg?height=40&width=40", name: "Integration 5" },
  { id: 6, image: "/placeholder.svg?height=40&width=40", name: "Integration 6" },
  { id: 7, image: "/placeholder.svg?height=40&width=40", name: "Integration 7" },
  { id: 8, image: "/placeholder.svg?height=40&width=40", name: "Integration 8" },
  { id: 9, image: "/placeholder.svg?height=40&width=40", name: "Integration 9" },
]

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-16 font-poppinis">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex font-medium font-poppins w-fit items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-main">
            <Zap className="text-main h-4 w-4 " />
              Collaborate. Innovate. Thrive.
          </div>
          <h2 className="text-4xl py-3 font-bold tracking-tight sm:text-4xl">Begin Your Next Chapter Here</h2>
          <p className="mx-auto max-w-[600px] text-gray-500 font-poppins ">
            Connect your favorite apps and services to enhance your experience and boost productivity. Synchronize data and
            unleash the full potential of our platform.
          </p>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex justify-center">
              <div className="flex -space-x-4">
                {integrations.slice(0, 8).map((integration) => (
                  <div
                    key={integration.id}
                    className="relative h-12 w-12 rounded-full bg-black ring-1 ring-white transition-transform hover:z-10 hover:scale-110"
                  >
                    <img
                      src={integration.image || "/placeholder.svg"}
                      alt={integration.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <button className="font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                Be a Trainer
             </button>
              {/* <Button
                variant="outline"
                className="rounded-full bg-gray-50 px-8 text-gray-900 hover:bg-gray-100 hover:text-gray-900"
              >
                See All Integration
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

