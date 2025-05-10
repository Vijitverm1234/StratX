import React from 'react'

const Contact = () => {
    return (
        <div className='flex flex-col items-center justify-center conatiner mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='#contact'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 '>
                Connect <span className='underline underline-offset-4 decoration-1 under font-light'>With Us</span>
            </h1 >
            <p className='text-gray max-w-80 text-center mb-8' >Ready to make a move ? Let's Build Future Together</p>
            <form action="https://api.web3forms.com/submit" method='POST' className='max-2xl: mx-auto text-gray-600 pt-8'>
            <input type="hidden" name="access_key" value="979927bf-936d-40bd-b4d6-d1e37a8a38b1"/>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 text-left">
                        <label className="block font-medium">Your Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                            name="Name"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-left md:pl-4">
                        <label className="block font-medium">Your Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email Id"
                            className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                            name="Email"
                            required
                        />
                    </div>
                </div>
                <div className='my-6 text-left'>
                    Text Message
                    <textarea name="Message" placeholder="Message" required className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none'></textarea>
                </div>
                <button type='submit' className='bg-gray-800 rounded text-white py-2 px-12 mb-10' >Send Message</button>
            </form>

        </div>
    )
}

export default Contact
