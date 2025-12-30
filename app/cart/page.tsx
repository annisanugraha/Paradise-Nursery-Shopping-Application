"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { removeItem, updateQuantity } from "@/lib/redux/cart-slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const { toast } = useToast()

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleCheckout = () => {
    toast({
      title: "Coming Soon!",
      description: "Checkout functionality will be available in the next update.",
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-[2]">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-primary">Your Shopping Cart</h1>
              <span className="text-muted-foreground">{totalItems} items</span>
            </div>

            {cartItems.length === 0 ? (
              <Card className="border-dashed border-2 p-12 text-center">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="bg-muted p-6 rounded-full">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Your cart is empty</h3>
                  <p className="text-muted-foreground">Seems like you haven't added any plants to your paradise yet.</p>
                  <Link href="/products">
                    <Button className="mt-4">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold truncate">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <p className="text-lg font-bold text-primary">${item.price}</p>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-9 w-9"
                              onClick={() => dispatch(removeItem(item.id))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="flex-1">
            <Card className="sticky top-24 border-none shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full h-12 text-base font-bold"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    Checkout (Coming Soon)
                  </Button>
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full h-12 text-base bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <p className="mt-6 text-xs text-center text-muted-foreground">
                  Secure checkout powered by Paradise Nursery. All plants are carefully packed for safe delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
