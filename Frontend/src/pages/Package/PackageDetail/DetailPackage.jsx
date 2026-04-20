import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMapMarkerAlt, faShareAlt, faStar, faStarHalfAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const product = {
  name: "Full Body Checkup - Essential",
  type: "Checkup",
  originalPrice: 6063,
  discountedPrice: 1599,
  discount: "74% Off",
  parameters: 91,
  reportTime: "7 hours",
  rating: 4.5,
  rateCount: 10,
};

const DetailPackage = () => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    qty: 1,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setField = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <section className="py-11 bg-white dark:bg-[#0b1727] text-white relative overflow-hidden z-10">
        <div className="container">
          <button className="bg-blue-600 text-white hover:bg-opacity-90 py-2 px-4 rounded" onClick={handleShow}>
            Product Quick Overview
          </button>
        </div>
      </section>

      <div className={show ? "" : "hidden"}>
        <div className="bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden relative max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-6xl rounded mx-auto my-14">
          <button className="absolute right-0 top-0 mt-4 mr-4" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
          <div className="grid grid-cols-12 gap-6 p-4 lg:p-8">
            <div className="col-span-12 lg:col-span-6 relative">
              <div className="text-center p-1 mb-2 cursor-pointer">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Product"
                  className="max-w-full h-auto rounded-xl w-full"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div>
                <h1 className="text-2xl leading-tight font-medium mb-4">{product.name}</h1>
                <div className="flex items-center">
                  <div className="flex-grow">
                    <p className="inline font-light mb-4">
                      <Rating rating={product.rating} />
                      <a href="#!" className="text-sm text-blue-600 hover:underline font-medium">
                        {product.rateCount} Reviews
                      </a>
                    </p>
                    <p className="mb-0">
                      Type: <span className="font-medium">{product.type}</span>
                    </p>
                  </div>
                  <div className="ml-auto">
                    <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
                      <FontAwesomeIcon icon={faShareAlt} />
                    </button>
                  </div>
                </div>
                <div className="mb-0 mt-6">
                  <span className="text-blue-600 text-2xl font-bold mr-2">
                    {product.discountedPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "BDT",
                    })}
                  </span>
                  <div className="flex flex-wrap items-center">
                    <span className="text-sm opacity-50 line-through mr-2">
                      BDT {product.originalPrice}
                    </span>
                    <span className="text-sm text-red-500 font-medium bg-red-600 bg-opacity-10 px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="dark:border-slate-700 my-6" />
              <form action="#!">
                <table>
                  <tbody>
                    <tr className="flex items-start">
                      <td width="100" className="sm:py-4 text-sm">
                        Parameters
                      </td>
                      <td className="sm:py-4 pl-4">
                        <span className="text-sm">{product.parameters} Parameters</span>
                      </td>
                    </tr>
                    <tr className="flex items-start">
                      <td width="100" className="sm:py-4 text-sm">
                        Report Time
                      </td>
                      <td className="sm:py-4 pl-4">
                        <span className="text-sm">{product.reportTime}</span>
                      </td>
                    </tr>
                    <tr className="flex items-start mb-6">
                      <td width="100" className="sm:py-4 text-sm align-middle">
                        Quantity
                      </td>
                      <td className="sm:py-4 pl-4">
                        <QtyField onChange={setField} name="qty" value={formData.qty} />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex gap-3 items-center my-7">
                  <button className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-10 py-2.5 h-10 md:px-12 w-full sm:w-1/2">
                    BUY NOW
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 w-full sm:w-1/2">
                    Add to cart
                  </button>
                </div>

                <div className="mt-4 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className=" text-3xl opacity-75" />
                  <div className="text-sm leading-normal ml-3">
                    <b>75-Day Buyer Protection</b>
                    <br />
                    <span className="opacity-75">Money back guarantee</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Rating = ({ rating }) => (
  <Fragment>
    <span className="text-sm text-red-500">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";
        if (index <= Math.floor(rating)) content = <FontAwesomeIcon icon={faStar} />;
        else if (rating > i && rating < index + 1) content = <FontAwesomeIcon icon={faStarHalfAlt} />;
        else if (index > rating) content = <FontAwesomeIcon icon={faHeart} />;
        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    <span className="text-sm mx-1">{rating.toFixed(1)}</span>
  </Fragment>
);

const QtyField = ({ name, value, onChange }) => {
  const qtyControl = (qty) =>
    onChange({
      target: {
        name,
        type: "radio",
        value: qty < 1 ? 1 : qty,
      },
    });

  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 bg-gray-100 dark:bg-slate-800 bg-opacity-50 hover:bg-opacity-100 dark:bg-opacity-50 dark:hover:bg-opacity-100 text-blue-600 leading-none flex justify-center items-center rounded-lg font-bold"
        type="button"
        onClick={() => qtyControl(parseInt(value) - 1)}
      >
        -
      </button>
      <input
        className="bg-transparent text-center pl-3 font-bold w-12"
        type="number"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(e.target.value)}
      />
      <div
        className="w-8 h-8 bg-gray-100 dark:bg-slate-800 bg-opacity-50 hover:bg-opacity-100 dark:bg-opacity-50 dark:hover:bg-opacity-100 text-blue-600 leading-none flex justify-center items-center rounded-lg font-bold cursor-pointer"
        onClick={() => qtyControl(parseInt(value) + 1)}
      >
        +
      </div>
    </div>
  );
};

QtyField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DetailPackage;
