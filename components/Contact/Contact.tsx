"use client";
import Image from "next/image";

import React, { useState } from "react";
import { BsEmojiSunglasses, BsFillSendFill } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const myEmail = "pokharelshankalpa67@gmail.com";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(myEmail).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      },
    );
  };
  const handleForm = async (e: any) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const interest = e.target.interest.value;
    const message = e.target.message.value;
    console.log(fullName, email, interest, message);
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, interest, message }),
    });

    if (response.ok) {
      e.target.reset();
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message. You can direct mail to me.");
    }
  };
  return (
    <div id="contact" className="py-20 lg:flex">
      <div className="text text-4xl font-semibold sm:text-5xl lg:w-1/2">
        <p>Love to here from you, </p>
        <div className="mt-6 flex items-center">
          <p>Get in touch</p>
          <Image
            src={"/images/wavingHand.svg"}
            alt="waving hand"
            width={48}
            height={0}
            className="ml-4"
          />
        </div>

        {/* //copy to clipboard */}
        <p className="mt-4 flex items-center text-base font-normal">
          Hi there! Interested in connecting? unless you are suspicious?{" "}
          <span className="ml-4 text-2xl text-yellow-400">
            <BsEmojiSunglasses />
          </span>{" "}
        </p>
        <div className="mt-6 w-full max-w-[16rem]">
          <div className="relative">
            <label htmlFor="npm-install-copy-text" className="sr-only">
              Label
            </label>
            <input
              id="npm-install-copy-text"
              type="text"
              className="col-span-6 block w-full rounded-lg border border-gray-600 bg-gray-700 px-2.5 py-4 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              value={"Copy my mail"}
              disabled
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="absolute end-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-lg border border-gray-200 bg-gray-800 px-2.5 py-1.5 text-gray-400 hover:bg-gray-700"
            >
              {isCopied ? (
                <span id="success-message" className="inline-flex items-center">
                  <TiTick className="mr-1 inline-block text-xl text-green-700" />
                  <span className="text-xs font-semibold text-green-500">
                    Copied
                  </span>
                </span>
              ) : (
                <span id="default-message" className="inline-flex items-center">
                  <IoCopy className="mr-1 inline-block text-xl" />
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleForm} className="mt-6 w-full lg:mt-0 lg:w-1/2">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium "
            >
              Your Name
            </label>
            <input
              name="fullName"
              type="text"
              id="fullName"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Shankalpa Pokharel"
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium "
            >
              Your Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="example@gmail.com"
              required
            />
          </div>
        </div>
        <div className="mt-4 lg:w-1/2">
          <label
            htmlFor="interest"
            className="mb-2 block text-sm font-medium "
          >
            What you are interested
          </label>
          <select
            name="interest"
            id="interest"
            className="foucs:outline-none block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          >
            {/* <option value="full-stack-web-development">
              Full-Stack Web Development
            </option> */}
            <option value="frontend-development">Frontend Development</option>
            {/* <option value="backend-development">Backend Development</option> */}
            <option value="portfolio-website">Portfolio Website</option>
            <option value="responsive-web-design">Responsive Web Design</option>
            <option value="api-integration">API Integration</option>
            <option value="web-development-consultation">
              Web Development Consultation
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mt-4 w-full">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium"
          >
            Your message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Let tell us know your project about"
          ></textarea>
        </div>

        <button className="mt-4 flex w-fit cursor-pointer items-center rounded-lg bg-slate-600 px-3 py-2.5 text-white shadow-lg shadow-slate-600 hover:bg-slate-900">
          <span>Send Message</span>{" "}
          <BsFillSendFill className="ml-2 inline-block" />
        </button>
      </form>
    </div>
  );
}
