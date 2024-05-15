import { useId, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { IProduct } from '@/models/Product'
import useProducts from '@/hooks/useProducts'
import theme from '@/theme'
import Button from './common/Button'
import { useCartContext } from "@/context/cartContext";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: false },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: false },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ProductOverview = ({ selectedProduct }: { selectedProduct: IProduct }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const { cartContextValue, setCartContextValue } = useCartContext()
    const onHandleSubmit = () => {
        const currentProduct = {
            ...selectedProduct, uuid: new Date().valueOf()
        }
        setCartContextValue({ ...cartContextValue, cartItems: [...cartContextValue.cartItems, currentProduct] })
        Cookies.set('cartItems', JSON.stringify([...cartContextValue.cartItems, currentProduct]))
        toast("Item added to cart!")
    }
    return (
        <div className="bg-white">
            <div className="pt-6">


                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.description}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only" >Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">${selectedProduct.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <ToastContainer />
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                selectedProduct.rating.rate > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={'#'} className="ml-3 text-sm review-label font-medium review_label">
                                    {selectedProduct.rating.count} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            {
                                (selectedProduct.category == "men's clothing" || selectedProduct.category == "women's clothing") && (
                                    <>
                                        {/* Colors */}
                                        {/* Sizes */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                <div className="flex items-center space-x-3">
                                                    {product.colors.map((color) => (
                                                        <RadioGroup.Option
                                                            key={color.name}
                                                            value={color}
                                                            className={({ active, checked }) =>
                                                                classNames(
                                                                    color.selectedClass,
                                                                    active && checked ? 'ring ring-offset-1' : '',
                                                                    !active && checked ? 'ring-2' : '',
                                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                )
                                                            }
                                                        >
                                                            <RadioGroup.Label as="span" className="sr-only">
                                                                {color.name}
                                                            </RadioGroup.Label>
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    color.class,
                                                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                )}
                                                            />
                                                        </RadioGroup.Option>
                                                    ))}

                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="mt-10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                                <a href="#" className="text-sm font-medium review_label">
                                                    Size guide
                                                </a>
                                            </div>

                                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                    {product.sizes.map((size) => (
                                                        <RadioGroup.Option
                                                            key={size.name}
                                                            value={size}
                                                            disabled={!size.inStock}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    size.inStock
                                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                                )
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                    {size.inStock ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'border' : 'border-2',
                                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                        >
                                                                            <svg
                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                viewBox="0 0 100 100"
                                                                                preserveAspectRatio="none"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>

                                    </>

                                )
                            }


                            <div
                                className="mt-10"
                            >
                                <Button type='button' onClick={onHandleSubmit} label={'Add to cart'} color='rose' backgroundColor={theme.secondary_color} labelColor={theme.typography.primary_color} />
                            </div>


                        </form>
                    </div>

                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{selectedProduct.title}</h1>
                    </div>



                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{selectedProduct.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Category</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">

                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{selectedProduct.category}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductOverview
