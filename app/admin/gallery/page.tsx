import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { getGalleryImages } from "@/lib/gallery";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Galerie</h1>
        <p className={styles.panelIntro}>Nahrajte fotografie, pojmenujte je a určete jejich pořadí v galerii.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Nahrát fotografii</h2>
          <form action={actions.uploadGalleryImageAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název</label>
              <input name="title" className={styles.input} required />
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
              <SubmitButton type="submit" className={styles.button}>
                Nahrát fotografii
              </SubmitButton>
            </div>
          </form>
        </div>

        <div className={styles.galleryAdminGrid}>
          {images.length === 0 ? (
            <div className={styles.card}>
              <p className={styles.cardMeta}>Zatím nejsou nahrané žádné fotografie.</p>
            </div>
          ) : null}

          {images.map((image) => (
            <div key={image.id} className={`${styles.card} ${styles.galleryAdminCard}`}>
              <h2 className={styles.cardTitle}>{image.title}</h2>
              <a href={image.filename.startsWith("http") ? image.filename : `/uploads/${image.filename}`} target="_blank" rel="noreferrer">
                <Image
                  src={image.filename.startsWith("http") ? image.filename : `/uploads/${image.filename}`}
                  alt={image.alt}
                  width={600}
                  height={400}
                  unoptimized
                  className={styles.mediaPreview}
                />
              </a>
              <form id={`update-gallery-image-${image.id}`} action={actions.updateGalleryImageAction} className={styles.form}>
                <input type="hidden" name="id" value={image.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="title" className={styles.input} defaultValue={image.title} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={image.order} />
                </div>
              </form>
              <div className={styles.galleryAdminActions}>
                <SubmitButton type="submit" form={`update-gallery-image-${image.id}`} className={styles.button}>
                  Uložit
                </SubmitButton>
                <ConfirmForm
                  action={actions.deleteGalleryImageAction}
                  className={styles.inlineForm}
                  message="Opravdu chcete smazat tuto fotografii?"
                >
                  <input type="hidden" name="id" value={image.id} />
                  <button type="submit" className={styles.buttonDanger}>
                    Smazat
                  </button>
                </ConfirmForm>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
