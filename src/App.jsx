import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
function App() {
  const initialCart = () => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart());

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 0;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addItemCart(item) {
    const itemExist = cart.findIndex((compras) => compras.id === item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity === MAX_ITEMS) return;
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function incrementarItem(id) {
    const updateCart = cart.map((itemCart) => {
      if (itemCart.id === id && itemCart.quantity < MAX_ITEMS) {
        return {
          ...itemCart,
          quantity: itemCart.quantity + 1,
        };
      }
      return itemCart;
    });
    setCart(updateCart);
  }

  function decrementarItem(id) {
    const update = cart.map((item) => {
      if (item.id === id && item.quantity >= MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    const updateFilter = update.filter((item) => item.quantity !== 0);
    setCart(updateFilter);
  }

  function limpiarCarrito() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarItem={incrementarItem}
        decrementarItem={decrementarItem}
        limpiarCarrito={limpiarCarrito}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addItemCart={addItemCart}
              />
            );
          })}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
