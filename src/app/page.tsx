import Link from 'next/link';
import React from 'react'

const Home = () => {
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <h1 className='text-3xl'>anjulimaintl</h1>

            <nav>
                <ul>
                    <li><Link href="/scanner">Create </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;