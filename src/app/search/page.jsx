"use client";
import React from "react";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { BsStarHalf } from "react-icons/bs";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { RealTimeUpdate } from "@/hooks/RealTimeUpdate";
import Navbar from "../components/Navbar";
import db from "@/FireBase/config";
import { useRouter } from "next/navigation";

const searchpage = () => {
  const { collectionn } = RealTimeUpdate("info");
  const router = useRouter();


  const currentUrl = window.location.href;
  let query = currentUrl.split("=")[1];

  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          title: `Menu Deleted`,
        });
        try {
          const Delete = doc(db, "info", id);
          await deleteDoc(Delete);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const OrderHandler = (id) => {
    collectionn.map(async (data) => {
      if (data.id == id) {
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
          title: "Add Cart List in successfully",
        });
        const Post = collection(db, "shop");
        await addDoc(Post, {
          title: data.title,
          category: data.category,
          price: data.price,
          img: data.img,
          desc: data.desc,
          score: data.score,
          sender: mainUser,
          number : 1
        });
      }
    });
  };

  const errorLogin = () => {
    router.push("/login");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: "Login in first they try again",
    });
  };

  return (
    <div className="bg-gray-100 h-fit" style={{ height: "100vh" }}>
      <Navbar />
      <h1 className="text-4xl my-4 text-center">
        {`Search  "${query}"`}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap text-center bg-gray-100">
        {collectionn.map((item) => {
          if (item.title.includes(query) || item.desc.includes(query)) {
            return (
              <div
                id="Cart"
                className="card w-80 lg:w-96 bg-gray-200 shadow-xl cursor-pointer  hover:shadow-2xl my-2"
                data-aos="zoom-in"
                data-aos-duration="300"
              >
                <span
                  style={{
                    position: "absolute",
                    backgroundColor: "#ffc107",
                    width: "60px",
                    height: "30px",
                    lineHeight: "27px",
                    textAlign: "center",
                    borderRadius: "3px 14px",
                    boxShadow: "1px 3px 13px rgba(0, 0, 0, 0.227)",
                  }}
                  className="text-gray-600"
                >
                  $ {item.price}
                </span>
                <figure>
                  <img
                    src={item.img}
                    style={{
                      width: "100%",
                      height: "15rem",
                      objectFit: "cover",
                      borderRadius: "20px 20px 0 0",
                    }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl text-gray-600">
                    {item.title}
                  </h2>
                  <p className="text-justify text-gray-500 mb-4">{item.desc}</p>

                  <div className="card-actions justify-between">
                    <div className="flex items-center text-xl mt-[0.1rem] font-bold">
                      <span
                        style={{
                          color: "yellow",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        {item.score > 2.5 ? <FaStar /> : <BsStarHalf />}
                      </span>
                      <span
                        style={{
                          textAlign: "end",
                          position: "relative",
                          top: "5px",
                          marginLeft: "2px",
                        }}
                        className="text-gray-600"
                      >
                        {item.score}/5
                      </span>
                    </div>

                    <div>
                      <button
                        className="btn btn-outline btn-success mx-2"
                        onClick={
                          document.cookie == `${mainUser},${mainUserPass}`
                            ? () => OrderHandler(item.id)
                            : () => errorLogin()
                        }
                      >
                        Order
                      </button>
                      {document.cookie === `admin,1234` && (
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => {
                            deleteHandler(item.id);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default searchpage;
