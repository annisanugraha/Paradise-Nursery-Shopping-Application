"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addItem } from "@/lib/redux/cart-slice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const PRODUCTS = [
  {
    category: "Air Purifying",
    plants: [
      { id: "1", name: "Snake Plant", price: 15, image: "/snake-plant.jpg" },
      { id: "2", name: "Spider Plant", price: 12, image: "/spider-plant.jpg" },
      { id: "3", name: "Peace Lily", price: 18, image: "/peace-lily.jpg" },
    ],
  },
  {
    category: "Aromatic",
    plants: [
      { id: "4", name: "Lavender", price: 10, image: "/field-of-lavender.jpg" },
      { id: "5", name: "Rosemary", price: 14, image: "/sprig-of-rosemary.jpg" },
      { id: "6", name: "Mint", price: 8, image: "/mint-plant.jpg" },
    ],
  },
  {
    category: "Low Maintenance",
    plants: [
      { id: "7", name: "Aloe Vera", price: 12, image: "/aloe-vera.jpg" },
      { id: "8", name: "Jade Plant", price: 16, image: "/jade-plant.jpg" },
      { id: "9", name: "Pothos", price: 10, image: "/pothos.jpg" },
    ],
  },
]

export default function ProductListingPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  const isItemInCart = (id: string) => cartItems.some((item) => item.id === id)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Our Plant Collection</h1>

        {PRODUCTS.map((section) => (
          <div key={section.category} className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Badge variant="secondary" className="px-4 py-1 text-sm">
                {section.category}
              </Badge>
              <div className="h-px bg-border flex-grow" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.plants.map((plant) => (
                <Card
                  key={plant.id}
                  className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-shadow bg-card"
                >
                  <CardHeader className="p-0">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={plant.image || "/placeholder.svg"}
                        alt={plant.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full text-sm">
                        ${plant.price}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">{plant.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Beautiful and healthy {plant.name.toLowerCase()} ready for its new home.
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full h-12 text-base font-medium"
                      disabled={isItemInCart(plant.id)}
                      onClick={() =>
                        dispatch(
                          addItem({
                            id: plant.id,
                            name: plant.name,
                            price: plant.price,
                            image: plant.image,
                            category: section.category,
                          }),
                        )
                      }
                    >
                      {isItemInCart(plant.id) ? "Added to Cart" : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
