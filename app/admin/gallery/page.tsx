import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { getGalleryCategories, getGalleryImages } from "@/lib/gallery";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const [categories, images] = await Promise.all([getGalleryCategories(), getGalleryImages()]);

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Manage Gallery</h1>
        <p>Create categories, upload images, and assign them to the gallery.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Category</h2>
          <form action={actions.createGalleryCategoryAction} method="post">
            <div className={styles.formGroup}>
              <label className={styles.label}>Category Name</label>
              <input name="name" className={styles.input} required />
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
              <form action={actions.updateGalleryCategoryAction} method="post">
                <input type="hidden" name="id" value={category.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input name="name" className={styles.input} defaultValue={category.name} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Order</label>
                  <input name="order" className={styles.input} type="number" defaultValue={category.order} />
                </div>
                <button type="submit" className={styles.button}>
                  Save Category
                </button>
              </form>
              <form action={actions.deleteGalleryCategoryAction} method="post" style={{ marginTop: "1rem" }}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className={styles.buttonSecondary}>
                  Delete Category
                </button>
              </form>
            </div>
          ))}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Upload Image</h2>
          <form action={actions.uploadGalleryImageAction} method="post" encType="multipart/form-data">
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input name="title" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alt Text</label>
              <input name="alt" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select name="categoryId" className={styles.select} required>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Image File</label>
              <input name="image" type="file" className={styles.input} accept="image/*" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
            </div>
            <button type="submit" className={styles.button}>
              Upload Image
            </button>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {images.map((image) => (
            <div key={image.id} className={styles.card}>
              <div className={styles.cardTitle}>{image.title}</div>
              <div className={styles.cardMeta}>{image.category.name}</div>
              <Image src={`/uploads/${image.filename}`} alt={image.alt} width={600} height={400} unoptimized style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginBottom: "1rem" }} />
              <form action={actions.updateGalleryImageAction} method="post">
                <input type="hidden" name="id" value={image.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input name="title" className={styles.input} defaultValue={image.title} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Alt Text</label>
                  <input name="alt" className={styles.input} defaultValue={image.alt} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select name="categoryId" className={styles.select} defaultValue={image.categoryId} required>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Order</label>
                  <input name="order" className={styles.input} type="number" defaultValue={image.order} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="submit" className={styles.button}>
                    Save Image
                  </button>
                </div>
              </form>
              <form action={actions.deleteGalleryImageAction} method="post" style={{ marginTop: "1rem" }}>
                <input type="hidden" name="id" value={image.id} />
                <button type="submit" className={styles.buttonSecondary}>
                  Delete Image
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
