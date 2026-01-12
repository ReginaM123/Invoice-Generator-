import { useState } from "react";

interface Item {
  description: string;
  quantity: number;
  price: number;
}

const InvoiceForm = () => {
  const [client, setClient] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];
    updated[index][field] =
      field === "description" ? value : Number(value);
    setItems(updated);
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="invoice">
      <input
        placeholder="Client Name"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

      <button onClick={addItem}>Add Item</button>

      {items.map((item, index) => (
        <div key={index} className="item">
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              updateItem(index, "description", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              updateItem(index, "price", e.target.value)
            }
          />
        </div>
      ))}

      <h3>Total: R{total.toFixed(2)}</h3>
    </div>
  );
};

export default InvoiceForm;
