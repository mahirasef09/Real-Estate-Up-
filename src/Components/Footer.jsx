import React from 'react';
import { MdHomeWork } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='mt-10'>
            <footer className="footer bg-base-200 text-base-content p-10">
                <aside>
                    <h2>
                        <a className="btn text-2xl font-extrabold"><MdHomeWork />Real Estate<span className="text-green-500">Up</span></a>
                    </h2>
                    <p className='text-xl font-bold'>
                        Do You Need Help with Anything?
                    </p>
                    <form>
                        <fieldset className="form-control w-80">
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    className="input input-bordered join-item" />
                                <button className="btn bg-green-500 join-item">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </aside>
                <nav>
                    <h6 className="text-lg font-bold">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="text-lg font-bold">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="text-lg font-bold">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;