import { AdminShell } from "@/components/admin/AdminShell";
import { getPriceCategories } from "@/lib/prices";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminPricingPage() {
  const categories = await getPriceCategories();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Manage Pricing</h1>
        <p>Create categories and price items, and maintain ordering.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Price Category</h2>
          <form action={actions.createPriceCategoryAction} method="post">
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input name="name" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <input name="description" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
            </div>
            <button type="submit" className={styles.button}>
              Add Category
            </button>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.cardTitle}>{category.name}</div>
              <p>{category.description}</p>
              <form action={actions.updatePriceCategoryAction} method="post">
                <input type="hidden" name="id" value={category.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input name="name" className={styles.input} defaultValue={category.name} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <input name="description" className={styles.input} defaultValue={category.description ?? ""} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Order</label>
                  <input name="order" className={styles.input} type="number" defaultValue={category.order} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="submit" className={styles.button}>
                    Save Category
                  </button>
                </div>
              </form>
              <form action={actions.deletePriceCategoryAction} method="post" style={{ marginTop: "1rem" }}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className={styles.buttonSecondary}>
                  Delete Category
                </button>
              </form>
              <div className={styles.card} style={{ marginTop: "1rem" }}>
                <h3 className={styles.cardTitle}>Add Item</h3>
                <form action={actions.createPriceItemAction} method="post">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input name="title" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Price</label>
                    <input name="price" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <input name="description" className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Order</label>
                    <input name="order" className={styles.input} type="number" defaultValue={0} />
                  </div>
                  <button type="submit" className={styles.button}>
                    Add Item
                  </button>
                </form>
              </div>
              {category.items.map((item) => (
                <div key={item.id} className={styles.card} style={{ marginTop: "1rem" }}>
                  <div className={styles.cardTitle}>{item.title}</div>
                  <div className={styles.cardMeta}>{item.price}</div>
                  <p>{item.description}</p>
                  <form action={actions.updatePriceItemAction} method="post">
                    <input type="hidden" name="id" value={item.id} />
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Title</label>
                      <input name="title" className={styles.input} defaultValue={item.title} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Price</label>
                      <input name="price" className={styles.input} defaultValue={item.price} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Description</label>
                      <input name="description" className={styles.input} defaultValue={item.description ?? ""} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Order</label>
                      <input name="order" className={styles.input} type="number" defaultValue={item.order} />
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <button type="submit" className={styles.button}>
                        Save Item
                      </button>
                    </div>
                  </form>
                  <form action={actions.deletePriceItemAction} method="post" style={{ marginTop: "1rem" }}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className={styles.buttonSecondary}>
                      Delete Item
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
