"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import db from "@/FireBase/config";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

const addmenuPage = () => {
  let [form, setForm] = useState({});
  const router = useRouter();
  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    const Post = collection(db, "info");
    await addDoc(Post, form);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Add Menu in successfully",
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />

      <div
        className="w-[80%] p-10 m-10"
        style={{
          border: "3px solid #fbbf24",
          borderRadius: "20px",
          boxShadow: "1px 3px 13px rgba(0, 0, 0, 0.227)",
        }}
      >
        <h1 className="text-center text-2xl text-gray-600">Add Menu</h1>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                value={form.title}
                name="title"
                onChange={formHandler}
                placeholder="Type Title ..."
                required
                type="text"
                id="first-name"
                autoComplete="given-name"
                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                value={form.price}
                name="price"
                type="number"
                onChange={formHandler}
                required
                placeholder="Type Price ..."
                id="last-name"
                autoComplete="family-name"
                className="px-3 outline-none block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Description
            </label>
            <div className="mt-2">
              <input
                value={form.desc}
                name="desc"
                onChange={formHandler}
                required
                placeholder="Type Description ..."
                type="text"
                id="street-address"
                autoComplete="street-address"
                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Score
            </label>
            <div className="mt-2">
              <input
                value={form.score}
                name="score"
                onChange={formHandler}
                required
                placeholder="Type Score /5 ..."
                min="0"
                max="5"
                type="number"
                id="city"
                autoComplete="address-level2"
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Image
            </label>
            <div className="mt-2">
              <input
                value={form.img}
                name="img"
                onChange={formHandler}
                required
                placeholder="Type Image ..."
                type="text"
                id="region"
                autoComplete="address-level1"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Category
            </label>
            <div className="mt-2">
              <select
                onChange={formHandler}
                value={form.category}
                id="country"
                name="category"
                autoComplete="country-name"
                className="text-center px-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>{`->Select Category<-`}</option>
                <option value="breakfast">breakfast</option>
                <option value="lunch">lunch</option>
                <option value="shakes">shakes</option>
              </select>
            </div>
          </div>
            <button className="btn btn-outline btn-success" onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default addmenuPage;
