import React from 'react'

const ProfileCard = () => {
    return (
        <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-lg rounded-lg shadow-sm mx-auto">
            <div className="relative h-60">
                <img className="absolute h-full w-full object-cover" src="https://cdn-3.expansion.mx/dims4/default/c7c9aff/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fb3%2Fa4%2Fbba1526d42c0900bfac62f199270%2Fcomercio-unificado-omnicanalidad.jpg" />
            </div>
            <div className="relative shadow mx-auto h-36 w-36 -my-12 border-white rounded-full overflow-hidden border-4">
                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80" />
            </div>
            <div className="mt-16">
                <h1 className="main_typo_color text-lg text-center font-semibold">
                    Cassie
                </h1>
                <p className="text-sm text-green-600 text-center">
                    Active member
                </p>
            </div>

            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center">
                <p className="text-sm text-gray-600 text-center font-bold">
                    Favorite categories
                </p>

                <div className="flex">
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        Beauty
                    </div>
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        Electronics
                    </div>
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        Home & Kitchen
                    </div>
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        Grosery
                    </div>
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        Home
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProfileCard