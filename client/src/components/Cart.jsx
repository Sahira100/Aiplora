import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "./CartItem";

const Cart = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="fixed right-8 bottom-6 bg-purple-400 text-white btn btn-circle border drop-shadow-md  rounded-full p-3 "
        onClick={openCart}
      >
        <FaShoppingCart size="20px" />
      </div>
      <section
        className={`fixed h-full  ${isOpen ? "w-full" : "hidden"}
          bg-black/50 z-10 flex`}
      >
        <div onClick={closeCart} className="grow"></div>
        <div className="fixed right-0 w-96 h-full bg-white flex flex-col">
          <div className="text-2xl font-normal border-b-2 p-3">
            Shopping Cart
          </div>
          <div className="grow p-3 overflow-y-auto flex flex-col gap-3">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="min-h-44 font-normal flex flex-col border-t drop-shadow">
            <p className="mt-2 text-lg ml-3">Total:</p>
            <h3 className="text-3xl ml-3">$ 74.99</h3>
            <div className="w-1/2 text-center p-2 mt-2 bg-blue-500 text-white rounded-sm self-center ">
              Checkout
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
