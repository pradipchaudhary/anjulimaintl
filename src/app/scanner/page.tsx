import React from 'react'

const ScannerPage = () => {
    return (
        <div className='h-screen w-screen'>
            <div className="container mx-auto flex">
                <div className="scann flex justify-center items-center flex-1">
                    <h1 className='text-3xl'>Scanning</h1>
                </div>
                <div className="scann flex justify-center items-center flex-1">
                    <h1 className='text-3xl'>Result</h1>
                </div>
            </div>
        </div>
    )
}

export default ScannerPage