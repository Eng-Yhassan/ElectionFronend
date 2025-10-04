import React from 'react'

const Features = (props) => {
    return (
        <div>
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition h-40 w-[290px]">
                <h3 className="font-semibold text-lg mb-2 text-blue-600">
                   {props.title}
                </h3>
                <p className="text-gray-600 text-sm">
                    {props.desc}
                </p>
            </div>
        </div>
    )
}

export default Features