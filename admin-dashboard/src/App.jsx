// import { useState } from 'react'
// import axios from "axios";


// export default function ProductForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "men",
//     imageUrl: "",
//     isDeal: false,
//   });

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.post("http://localhost:4000/api/admin/add-product", formData);
//     alert("Product Added Successfully!");
//   } catch (err) {
//     // This will show the real error in your browser console (F12)
//     console.error("Full Error details:", err);

//     if (err.response) {
//       alert(`Server error: ${err.response.status}`);
//     } else if (err.request) {
//       alert("No response from server. Is your backend running?");
//     } else {
//       alert("Error: " + err.message);
//     }
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: 20 }}>
//       <h3>Add New Product</h3>
//       <input
//         placeholder="Product Name"
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       />
//       <input
//         placeholder="Price"
//         type="number"
//         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//       />
//       <input
//         placeholder="Image URL (Cloudinary Link)"
//         onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//       />

//       <select
//         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//       >
//         <option value="mens">Mens</option>
//         <option value="womens">Womens</option>
//         <option value="kids">Kids</option>
//         <option value="beauty">Beauty</option>
//         <option value="fashion">Fashion</option>
//       </select>

//       <label>
//         Show on Home Page?
//         <input
//           type="checkbox"
//           checked={formData.isFeatured}
//           onChange={(e) =>
//             setFormData({ ...formData, isFeatured: e.target.checked })
//           }
//         />
//       </label>

//       <button type="submit">Upload Product</button>
//     </form>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "mens",
    imageUrl: "",
    isFeatured: true,
    isDeal: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (editProduct) {
        await axios.put(
          `http://localhost:4000/api/admin/edit-product/${editProduct._id}`,
          formData,
        );
        showToast("Product Updated Successfully!", "success");
      } else {
        await axios.post(
          "http://localhost:4000/api/admin/add-product",
          formData,
        );
        showToast("Product Added Successfully!", "success");
      }
      setEditProduct(null);
      setFormData({
        name: "",
        price: "",
        category: "mens",
        imageUrl: "",
        isFeatured: true,
        isDeal: false,
      });
      fetchProducts();
    } catch (err) {
      showToast("Error saving product", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/admin/delete-product/${id}`,
      );
      showToast("Product Deleted Successfully!", "success");
      fetchProducts();
    } catch (err) {
      showToast("Error deleting product", "error");
    }
  };

  return (
    <div style={styles.layout}>
      {toast && (
        <div
          style={{
            ...styles.toast,
            backgroundColor: toast.type === "success" ? "#1e9e5d" : "#e63950",
          }}
        >
          {toast.message}
        </div>
      )}

      <nav style={styles.sidebar}>
        <h2 style={styles.brand}>Akennes Glow</h2>
        {["Dashboard", "Users", "Products", "Logout"].map((item) => (
          <button
            key={item}
            style={styles.navItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#db7093";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        <div style={styles.formSection}>
          <h3 style={styles.formTitle}>
            {editProduct ? "Edit Product" : "Add New Product"}
          </h3>
          <div style={styles.formRow}>
            <input
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
            <select
              style={styles.input}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
              <option value="kids">Kids</option>
              <option value="beauty">Beauty</option>
              <option value="fashion">Fashion</option>
            </select>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              Show on Home
            </label>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.isDeal}
                onChange={(e) =>
                  setFormData({ ...formData, isDeal: e.target.checked })
                }
              />
              Is Deal
            </label>
            <button
              style={styles.saveBtn}
              onClick={handleSave}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c45c7e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#db7093";
              }}
            >
              {editProduct ? "Update Product" : "Upload Product"}
            </button>
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Featured</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}>
                    <img src={p.imageUrl} style={styles.thumb} alt="p" />
                  </td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{p.category}</span>
                  </td>
                  <td style={styles.td}>${p.price}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: p.isFeatured ? "#e6f7ed" : "#f5f5f5",
                        color: p.isFeatured ? "#1e9e5d" : "#999",
                      }}
                    >
                      {p.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionsRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => {
                          setEditProduct(p);
                          setFormData(p);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#db7093";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#fff0f5";
                          e.currentTarget.style.color = "#db7093";
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(p._id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#e63950";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#fdeaec";
                          e.currentTarget.style.color = "#e63950";
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  toast: {
    position: "fixed",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 8,
    fontSize: "14px",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  sidebar: {
    width: "220px",
    flexShrink: 0,
    backgroundColor: "#db7093",
    padding: "24px 16px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  brand: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  navItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 8,
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  main: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fdf7f8",
    minWidth: 0,
  },
  formSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  formTitle: {
    margin: "0 0 16px 0",
    color: "#db7093",
    fontSize: "18px",
  },
  formRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    flex: 1,
    minWidth: "140px",
    fontSize: "14px",
    outline: "none",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "14px",
    color: "#555",
    whiteSpace: "nowrap",
  },
  saveBtn: {
    backgroundColor: "#db7093",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "background-color 0.2s ease",
  },
  tableWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 14px",
    backgroundColor: "#fdf0f4",
    color: "#db7093",
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #f3d8e3",
  },
  tr: {
    borderBottom: "1px solid #f5e9ee",
  },
  td: {
    padding: "10px 14px",
    fontSize: "14px",
    color: "#444",
    verticalAlign: "middle",
  },
  thumb: {
    width: 44,
    height: 44,
    objectFit: "cover",
    borderRadius: 6,
    display: "block",
  },
  badge: {
    backgroundColor: "#fff0f5",
    color: "#db7093",
    padding: "4px 10px",
    borderRadius: 15,
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: 15,
    fontSize: "12px",
    fontWeight: 600,
  },
  actionsRow: {
    display: "flex",
    gap: 8,
  },
  editBtn: {
    border: "1px solid #db7093",
    backgroundColor: "#fff0f5",
    color: "#db7093",
    padding: "6px 14px",
    borderRadius: 6,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  deleteBtn: {
    border: "1px solid #e63950",
    backgroundColor: "#fdeaec",
    color: "#e63950",
    padding: "6px 14px",
    borderRadius: 6,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
