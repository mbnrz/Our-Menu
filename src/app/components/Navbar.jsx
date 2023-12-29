"use client";
import Swal from "sweetalert2";
import { RealTimeUpdate } from "../../hooks/RealTimeUpdate";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import db from "../../FireBase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  let [validation, setValidation] = useState(
    document.cookie ? "Logout" : "Login"
  );
  const { collectionn } = RealTimeUpdate("shop");
  let [target, setTarget] = useState("");
  const router = useRouter();

  let [info, setInfo] = useState([]);
  useEffect(() => {
    const Get = collection(db, "client");
    getDocs(Get).then((data) => {
      if (data.empty) {
        console.log("error");
      } else {
        let result = [];
        data.docs.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setInfo(result);
      }
    });
  }, []);

  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  const searchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?q=${target}`);
  };

  const LoginHandler = () => {};
  const LogoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        info.map(async (data) => {
          if (data.username == mainUser) {
            console.log(data.id);
            try {
              const Delete = doc(db, "client", data.id);
              await deleteDoc(Delete);
            } catch (err) {
              console.log(err);
            }
          }
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
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
        document.cookie = `${mainUser},${mainUserPass}; expires=Thu, 18 Dec 1040 12:00:00 UTC; path=/`;
        setValidation("Login");
      }
    });
  };

  let dataLength = 0;

  collectionn.map((data) => {
    if (data.sender == mainUser) {
      dataLength++;
    }
  });

  return (
    <div className="navbar bg-yellow-400">
      <div className="navbar-start ">
        <div className="lg:block hidden text-white">
          <ul tabIndex={0} className="gap-3 flex flex-row w-full">
            <li className="flex items-center ml-3">
              <Link href={"/"} className="flex items-center text-lg">
                <span
                  className="material-symbols-outlined"
                >
                  home
                </span>{" "}
                Home{" "}
              </Link>
            </li>
            <li className="flex items-center">
              <Link href={"/shop"} className="flex items-center text-lg">
                <span
                  className="material-symbols-outlined"
                >
                  shopping_cart{" "}
                </span>
                Carts{" "}
              </Link>
            </li>
            {document.cookie == `admin,1234` && (
              <li  className="flex items-center">
                <Link href={"/addmenu"} className="flex items-center text-lg ">
                  <span
                    className="material-symbols-outlined"
                  >
                    add_shopping_cart
                  </span>{" "}
                  Add Menu{" "}
                </Link>
              </li>
            )}
            <li
              className="flex items-center"
              onClick={validation == "Login" ? LoginHandler : LogoutHandler}
            >
              <Link
                href={validation == "Login" ? "/login" : "/"}
                className="flex items-center text-lg"
              >
                <span
                  className="material-symbols-outlined"
                >
                  {validation}
                </span>{" "}
                {validation}
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown lg:hidden">
          <div
            id="test"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-white"
          >
            <li className="hover:bg-[#81818188] w-full rounded-md">
              <Link
                href={"/"}
                className="flex items-center text-yellow-400 text-lg"
              >
                <span
                  //   style={{ position: "relative", top: "4px" }}
                  className="material-symbols-outlined"
                >
                  home
                </span>{" "}
                Home{" "}
              </Link>
            </li>
            <li className="hover:bg-[#81818188] w-full rounded-md">
              <Link
                href={"/shop"}
                className="flex items-center text-yellow-400 text-lg"
              >
                <span className="material-symbols-outlined">
                  shopping_cart{" "}
                </span>
                Carts{" "}
              </Link>
            </li>
            {document.cookie == `admin,1234` && (
              <li className="hover:bg-[#81818188] w-full rounded-md">
                <Link
                  href={"/addmenu"}
                  className="flex items-center text-yellow-400 text-lg"
                >
                  <span
                    //   style={{ position: "relative", top: "4px" }}
                    className="material-symbols-outlined"
                  >
                    add_shopping_cart
                  </span>{" "}
                  Add Menu{" "}
                </Link>
              </li>
            )}
            <li
              className="hover:bg-[#81818188] w-full rounded-md"
              onClick={validation == "Login" ? LoginHandler : LogoutHandler}
            >
              <Link
                href={validation == "Login" ? "/login" : "/"}
                className="flex items-center text-yellow-400 text-lg"
              >
                <span className="material-symbols-outlined">{validation}</span>{" "}
                {validation}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={"/"} className="btn btn-ghost text-4xl" id="testt">
          MBNRZ
        </Link>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            className="input input-bordered w-24 md:w-auto bg-white border-none"
          />
        </div>
        <button
          id="test"
          onClick={searchHandler}
          className="btn btn-ghost btn-circle "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
