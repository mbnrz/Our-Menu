"use client";
import db from "@/FireBase/config";
import { RealTimeUpdate } from "@/hooks/RealTimeUpdate";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import emailjs from "@emailjs/browser";

const shopPage = () => {
  const { collectionn } = RealTimeUpdate("shop");
  const router = useRouter();
  let [stateShop, setStateShop] = useState([]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const Delete = doc(db, "shop", id);
        deleteDoc(Delete);
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
          icon: "error",
          title: `Removed From Cart`,
        });
      }
    });
  };

  const form = useRef();

  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  let trackingCode = "";
  let title = "";
  let total = 0;

  collectionn.map((item) => {
    if (item.sender == mainUser) {
      stateShop.push(item);
      trackingCode += item.id + "+";
      title += item.title + " , ";
      total += parseInt(item.price * item.number);
    }
  });

  const OrderHandler = () => {
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
      title: "Your order has been successfully placed",
    });
    collectionn.map(async (data) => {
      if (data.sender == mainUser) {
        try {
          const Delete = doc(db, "shop", data.id);
          await deleteDoc(Delete);
        } catch (err) {
          console.log(err);
        }
      }
    });
    emailjs
      .sendForm(
        "service_m7idd8j",
        "template_qyalne6",
        form.current,
        "g1O6SmLdVwhpzoEcc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    router.push("/");
  };

  const increaseNumber = (id) => {
    collectionn.map((item) => {
      if (item.id == id) {
        const docRef = doc(db, "shop", id);
        const data = {
          number: item.number + 1,
        };
        updateDoc(docRef, data)
          .then((docRef) => {
            console.log(
              "A New Document Field has been added to an existing document"
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const reduceNumber = (id) => {
    collectionn.map((item) => {
      if (item.id == id) {
        if (item.number >= 2) {
          const docRef = doc(db, "shop", id);
          const data = {
            number: item.number - 1,
          };
          updateDoc(docRef, data)
            .then((docRef) => {
              console.log(
                "A New Document Field has been added to an existing document"
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 h-fit" style={{ height: "100vh" }}>
      <Navbar />
      <form style={{ display: "none" }} ref={form} onSubmit={OrderHandler}>
        <textarea value={`Order Code : ${trackingCode}`} name="messag" />
        <textarea
          value={`Titles : ${collectionn.map(
            (data) =>
              data.sender == mainUser && data.number + " * " + data.title
          )}`}
          name="message"
        />

        <textarea value={`Total : ${total.toFixed(2)}`} name="messagee" />
        <textarea value={`Sender : ${mainUser}`} name="messageee" />
      </form>
      <div className="pt-8 bg-gray-100">
        <h1 className="mb-10 text-center text-2xl font-bold">
          {stateShop == "" ? "Cart List Empty" : "Cart List"}
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {collectionn.map(
              (item) =>
                item.sender == mainUser && (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.img}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h2>
                      </div>
                      <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => reduceNumber(item.id)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <div className="h-8 w-8 border bg-white text-center text-xs outline-none items-center flex justify-center">
                            {item.number}
                          </div>
                          <span
                            onClick={() => increaseNumber(item.id)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            $ {item.price}
                          </p>
                          <svg
                            onClick={() => {
                              deleteHandler(item.id);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            {collectionn.map(
              (item) =>
                item.sender == mainUser && (
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">{item.title}</p>
                    <p className="text-gray-700">
                      $ {item.price * item.number}
                    </p>
                  </div>
                )
            )}

            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$ {total.toFixed(2)}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <div className="text-right mt-3">
              {stateShop == "" ? (
                <button className="btn btn-outline btn-warning w-full">
                  Order Empty
                </button>
              ) : (
                <button
                  onClick={OrderHandler}
                  className="btn btn-outline btn-success w-full"
                >
                  Order
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default shopPage;
