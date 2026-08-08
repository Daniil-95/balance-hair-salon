import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { getGalleryCategories, getGalleryImages } from "@/lib/gallery";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const [categories, images] = await Promise.all([getGalleryCategories(), getGalleryImages()]);

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Galerie</h1>
        <p className={styles.panelIntro}>Vytvořte kategorie, nahrajte fotografie a určete jejich pořadí v galerii.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Vytvořit kategorii</h2>
          <form action={actions.createGalleryCategoryAction} method="post" className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název kategorie</label>
              <input name="name" className={styles.input} required />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Přidat kategorii
              </button>
            </div>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {categories.length === 0 ? (
            <div className={styles.card}>
              <p className={styles.cardMeta}>Zatím nejsou vytvořené žádné kategorie.</p>
            </div>
          ) : null}

          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{category.name}</h2>
              <form action={actions.updateGalleryCategoryAction} method="post" className={styles.form}>
                <input type="hidden" name="id" value={category.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="name" className={styles.input} defaultValue={category.name} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={category.order} />
                </div>
                <div className={styles.buttonRow}>
                  <button type="submit" className={styles.button}>
                    Uložit kategorii
                  </button>
                </div>
              </form>
              <ConfirmForm
                action={actions.deleteGalleryCategoryAction}
                method="post"
                className={styles.inlineForm}
                message="Opravdu chcete smazat tuto kategorii? Smažou se i její fotografie."
              >
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className={styles.buttonDanger}>
                  Smazat kategorii
                </button>
              </ConfirmForm>
            </div>
          ))}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Nahrát fotografii</h2>
          <form action={actions.uploadGalleryImageAction} method="post" encType="multipart/form-data" className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název</label>
              <input name="title" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alternativní text</label>
              <input name="alt" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Kategorie</label>
              <select name="categoryId" className={styles.select} required>
                <option value="">Vyberte kategorii</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Soubor fotografie</label>
              <input name="image" type="file" className={styles.input} accept="image/*" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pořadí</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Nahrát fotografii
              </button>
            </div>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {images.length === 0 ? (
            <div className={styles.card}>
              <p className={styles.cardMeta}>Zatím nejsou nahrané žádné fotografie.</p>
            </div>
          ) : null}

          {images.map((image) => (
            <div key={image.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{image.title}</h2>
              <div className={styles.cardMeta}>{image.category.name}</div>
              <Image
                src={`/uploads/${image.filename}`}
                alt={image.alt}
                width={600}
                height={400}
                unoptimized
                className={styles.mediaPreview}
              />
              <form action={actions.updateGalleryImageAction} method="post" className={styles.form}>
                <input type="hidden" name="id" value={image.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="title" className={styles.input} defaultValue={image.title} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Alternativní text</label>
                  <input name="alt" className={styles.input} defaultValue={image.alt} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Kategorie</label>
                  <select name="categoryId" className={styles.select} defaultValue={image.categoryId} required>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={image.order} />
                </div>
                <div className={styles.buttonRow}>
                  <button type="submit" className={styles.button}>
                    Uložit fotografii
                  </button>
                </div>
              </form>
              <ConfirmForm
                action={actions.deleteGalleryImageAction}
                method="post"
                className={styles.inlineForm}
                message="Opravdu chcete smazat tuto fotografii?"
              >
                <input type="hidden" name="id" value={image.id} />
                <button type="submit" className={styles.buttonDanger}>
                  Smazat fotografii
                </button>
              </ConfirmForm>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
