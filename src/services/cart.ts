// src/api/cart.ts

import client from './client'
import type { Cart, CartItem, CartAddItem } from '../components/types'

const CART_BASE = '/cart'
const CART_ID_KEY = 'cart_id'

function getStoredCartId(): string | null {
  return localStorage.getItem(CART_ID_KEY)
}

function storeCartId(id: string) {
  localStorage.setItem(CART_ID_KEY, id)
}

export const getCart = async (): Promise<Cart | null> => {
  const cartId = getStoredCartId()
  if (!cartId) return null
  const res = await client.get(`${CART_BASE}/${cartId}`)
  return res.data
}

export const addCartItem = async (
  item: CartAddItem,
): Promise<Cart> => {
  const cartId = getStoredCartId()

  // Prepare request body item
  const bodyItem: any = {
    product_id: item.product_id,
    quantity: item.quantity,
  }

  if (item.specs && item.specs.length > 0) {
    bodyItem.specs = item.specs // add variants only if present
  }

  if (!cartId) {
    // No cart: create new cart with an items array
    const body = {
      items: [bodyItem],
    }
    const res = await client.post(`${CART_BASE}/AddCart`, body)

    const newCartId = res.data?.data?.cart_id
    if (newCartId) {
      storeCartId(newCartId)
    } else {
      throw new Error("Cart ID missing from AddCart response")
    }

    return res.data
  } else {
    // Cart exists: add item directly
    const res = await client.post(`${CART_BASE}/${cartId}/AddItem`, bodyItem)
    return res.data
  }
}

export const updateCartItem = async (
  itemId: string,
  quantity: number
): Promise<Cart> => {
  const cartId = getStoredCartId()
  if (!cartId) throw new Error('No cart found')
  const res = await client.put(`${CART_BASE}/${cartId}/UpdateItem/${itemId}`, { quantity })
  return res.data
}

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  const cartId = getStoredCartId()
  if (!cartId) throw new Error('No cart found')
  const res = await client.delete(`${CART_BASE}/${cartId}/RemoveItem/${itemId}`)
  return res.data
}

export const applyPromotion = async (code: string): Promise<Cart> => {
  const cartId = getStoredCartId()
  if (!cartId) throw new Error('No cart found')
  const res = await client.post(`${CART_BASE}/${cartId}/ApplyPromotion`, { code })
  return res.data
}

export const removePromotion = async (code: string): Promise<Cart> => {
  const cartId = getStoredCartId()
  if (!cartId) throw new Error('No cart found')
  const res = await client.delete(`${CART_BASE}/${cartId}/RemovePromotion/${code}`)
  return res.data
}