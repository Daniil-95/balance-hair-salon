import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { getPriceCategories } from "@/lib/prices";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminPricingPage() {
  const categories = await getPriceCategories();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Ceník</h1>
        <p className={styles.panelIntro}>Spravujte kategorie ceníku, jednotlivé položky, ceny a pořadí zobrazení.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Vytvořit kategorii ceníku</h2>
          <form action={actions.createPriceCategoryAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název</label>
              <input name="name" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pořadí</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
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
              <p className={styles.cardMeta}>Zatím nejsou vytvořené žádné položky ceníku.</p>
            </div>
          ) : null}

          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{category.name}</h2>

              <form id={`update-price-category-${category.id}`} action={actions.updatePriceCategoryAction} className={styles.form}>
                <input type="hidden" name="id" value={category.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="name" className={styles.input} defaultValue={category.name} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={category.order} />
                </div>
              </form>

              <div className={styles.buttonRow}>
                <button type="submit" form={`update-price-category-${category.id}`} className={styles.button}>
                  Uložit kategorii
                </button>
                <ConfirmForm
                  action={actions.deletePriceCategoryAction}
                  method="post"
                  className={styles.inlineForm}
                  message="Opravdu chcete smazat tuto kategorii? Smažou se i její položky."
                >
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit" className={styles.buttonDanger}>
                    Smazat kategorii
                  </button>
                </ConfirmForm>
              </div>

              <div className={styles.subBlock}>
                <h3 className={styles.cardTitle}>Přidat položku</h3>
                <form action={actions.createPriceItemAction} className={styles.form}>
                  <input type="hidden" name="categoryId" value={category.id} />
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Název</label>
                    <input name="title" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cena</label>
                    <input name="price" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Pořadí</label>
                    <input name="order" className={styles.input} type="number" defaultValue={0} />
                  </div>
                  <div className={styles.buttonRow}>
                    <button type="submit" className={styles.button}>
                      Přidat položku
                    </button>
                  </div>
                </form>
              </div>

              {category.items.length === 0 ? <p className={styles.cardMeta}>Tato kategorie zatím nemá žádné položky.</p> : null}

              {category.items.map((item) => (
                <div key={item.id} className={styles.subBlock}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.cardMeta}>{item.price}</div>
                  <form id={`update-price-item-${item.id}`} action={actions.updatePriceItemAction} className={styles.form}>
                    <input type="hidden" name="id" value={item.id} />
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Název</label>
                      <input name="title" className={styles.input} defaultValue={item.title} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Cena</label>
                      <input name="price" className={styles.input} defaultValue={item.price} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Pořadí</label>
                      <input name="order" className={styles.input} type="number" defaultValue={item.order} />
                    </div>
                  </form>
                  <div className={`${styles.buttonRow} ${styles.buttonRowSpaced}`}>
                    <button type="submit" form={`update-price-item-${item.id}`} className={styles.button}>
                      Uložit položku
                    </button>
                    <ConfirmForm
                      action={actions.deletePriceItemAction}
                      method="post"
                      className={styles.inlineForm}
                      message="Opravdu chcete smazat tuto položku ceníku?"
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className={styles.buttonDanger}>
                        Smazat položku
                      </button>
                    </ConfirmForm>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
