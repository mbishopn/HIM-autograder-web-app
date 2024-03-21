export default function CartList({ cartList, onClickEmpty, onClickRemove }) {
  return (
    <div className="CartList-Container">
      {cartList.length > 0 ? (
        <div>
          <h2>Your Cart</h2>
          <p>No. of Items: {cartList.length}</p>
        </div>
      ) : (
        <div>
          <h2>Your Cart is empty!</h2>
        </div>
      )}

      {cartList.map((d) => (
        <div key={d.id} className="CartList-Card">
          <div className="CartList-Card-Info">
            <p>{d.productName}</p>
            <p>{d.price}</p>
          </div>

          <button className="Remove-Button" onClick={() => onClickRemove(d.id)}>
            Remove
          </button>
        </div>
      ))}
      {cartList.length > 0 && (
        <div className="CartList-Buttons">
          <button className="Remove-Button" onClick={onClickEmpty}>
            Empty Cart
          </button>
          <button id="Buy-Button">
            <span>Buy-Total: $</span>
            {cartList
              .map((item) => parseFloat(item.price.replace("$", "")))
              .reduce((prev, next) => prev + next)
              .toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}
