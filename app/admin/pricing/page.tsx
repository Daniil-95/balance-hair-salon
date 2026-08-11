import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { requireAdminSession } from "@/lib/auth";
import { getPriceCategories } from "@/lib/prices";
import Link from "next/link";
import { Fragment } from "react";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

type PricingSearchParams = {
  category?: string | string[];
  edit?: string | string[];
  add?: string | string[];
  editCategory?: string | string[];
};

function getSingleParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function buildPricingHref(categoryId?: string, params?: { edit?: string; add?: string; editCategory?: string }) {
  const query = new URLSearchParams();

  if (categoryId) {
    query.set("category", categoryId);
  }

  if (params?.edit) {
    query.set("edit", params.edit);
  }

  if (params?.add) {
    query.set("add", params.add);
  }

  if (params?.editCategory) {
    query.set("editCategory", params.editCategory);
  }

  const value = query.toString();
  return value ? `/admin/pricing?${value}` : "/admin/pricing";
}

export default async function AdminPricingPage({
  searchParams,
}: {
  searchParams?: Promise<PricingSearchParams>;
}) {
  await requireAdminSession();

  const categories = await getPriceCategories();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const categoryId = getSingleParam(resolvedSearchParams?.category);
  const editItemId = getSingleParam(resolvedSearchParams?.edit);
  const isAddItemOpen = getSingleParam(resolvedSearchParams?.add) === "1";
  const isEditCategoryOpen = getSingleParam(resolvedSearchParams?.editCategory) === "1";

  const selectedCategory = categories.find((category) => category.id === categoryId) ?? categories[0] ?? null;

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Ceník</h1>
        <p className={styles.panelIntro}>Spravujte kategorie a položky přehledně v jednom pracovním panelu.</p>

        <div className={styles.pricingWorkspace}>
          <aside className={`${styles.card} ${styles.pricingSidebar}`}>
            <h2 className={styles.cardTitle}>Kategorie</h2>

            <div className={styles.pricingCategoryList}>
              {categories.length === 0 ? (
                <p className={styles.cardMeta}>Zatím nejsou vytvořené žádné kategorie.</p>
              ) : null}

              {categories.map((category) => {
                const isActive = selectedCategory?.id === category.id;

                return (
                  <Link
                    key={category.id}
                    href={buildPricingHref(category.id)}
                    className={`${styles.pricingCategoryLink} ${isActive ? styles.pricingCategoryLinkActive : ""}`.trim()}
                  >
                    <span className={styles.pricingCategoryName}>{category.name}</span>
                    <span className={styles.pricingCategoryMeta}>{category.items.length} položek</span>
                  </Link>
                );
              })}
            </div>

            <details className={styles.pricingDisclosure}>
              <summary className={styles.buttonSecondary}>+ Přidat kategorii</summary>
              <form action={actions.createPriceCategoryAction} className={`${styles.form} ${styles.pricingCompactForm}`}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="name" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={0} />
                </div>
                <SubmitButton type="submit" className={styles.button}>
                  Uložit kategorii
                </SubmitButton>
              </form>
            </details>
          </aside>

          <div className={`${styles.card} ${styles.pricingContent}`}>
            {!selectedCategory ? (
              <p className={styles.cardMeta}>Vyberte nebo vytvořte kategorii v levém panelu.</p>
            ) : (
              <>
                <div className={styles.pricingContentHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>{selectedCategory.name}</h2>
                    <p className={styles.cardMeta}>Položky v kategorii ceníku.</p>
                  </div>
                  <div className={styles.pricingHeaderActions}>
                    <Link href={buildPricingHref(selectedCategory.id, { add: "1" })} className={styles.buttonSecondary}>
                      + Přidat službu
                    </Link>
                    <Link href={buildPricingHref(selectedCategory.id, { editCategory: "1" })} className={styles.buttonSecondary}>
                      Upravit kategorii
                    </Link>
                  </div>
                </div>

                {isEditCategoryOpen ? (
                  <div className={`${styles.subBlock} ${styles.pricingSubBlock}`}>
                    <h3 className={styles.cardTitle}>Upravit kategorii</h3>
                    <form
                      id={`update-price-category-${selectedCategory.id}`}
                      action={actions.updatePriceCategoryAction}
                      className={`${styles.form} ${styles.pricingCompactForm}`}
                    >
                      <input type="hidden" name="id" value={selectedCategory.id} />
                      <div className={styles.pricingInlineFields}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Název</label>
                          <input name="name" className={styles.input} defaultValue={selectedCategory.name} required />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Pořadí</label>
                          <input name="order" className={styles.input} type="number" defaultValue={selectedCategory.order} />
                        </div>
                      </div>
                    </form>
                    <div className={styles.pricingAdminActions}>
                      <SubmitButton
                        type="submit"
                        form={`update-price-category-${selectedCategory.id}`}
                        className={styles.button}
                      >
                        Uložit
                      </SubmitButton>
                      <ConfirmForm
                        action={actions.deletePriceCategoryAction}
                        className={styles.inlineForm}
                        message="Opravdu chcete smazat tuto kategorii? Smažou se i její položky."
                      >
                        <input type="hidden" name="id" value={selectedCategory.id} />
                        <button type="submit" className={styles.buttonDanger}>
                          Smazat
                        </button>
                      </ConfirmForm>
                    </div>
                  </div>
                ) : null}

                {isAddItemOpen ? (
                  <div className={`${styles.subBlock} ${styles.pricingSubBlock}`}>
                    <h3 className={styles.cardTitle}>Přidat službu</h3>
                    <form action={actions.createPriceItemAction} className={`${styles.form} ${styles.pricingCompactForm}`}>
                      <input type="hidden" name="categoryId" value={selectedCategory.id} />
                      <div className={styles.pricingInlineFieldsThree}>
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
                      </div>
                      <div className={styles.pricingAdminActionsSingle}>
                        <SubmitButton type="submit" className={styles.button}>
                          Uložit službu
                        </SubmitButton>
                      </div>
                    </form>
                  </div>
                ) : null}

                {selectedCategory.items.length === 0 ? (
                  <div className={styles.pricingEmptyState}>Žádné služby. Přidejte první položku.</div>
                ) : (
                  <div className={styles.pricingTableWrap}>
                    <table className={styles.pricingTable}>
                      <thead>
                        <tr>
                          <th>Název</th>
                          <th>Cena</th>
                          <th>Pořadí</th>
                          <th>Akce</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCategory.items.map((item) => {
                          const isEditing = editItemId === item.id;

                          return (
                            <Fragment key={item.id}>
                              <tr>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.order}</td>
                                <td>
                                  <div className={styles.pricingRowActions}>
                                    <Link href={buildPricingHref(selectedCategory.id, { edit: item.id })} className={styles.buttonSecondary}>
                                      Upravit
                                    </Link>
                                    <ConfirmForm
                                      action={actions.deletePriceItemAction}
                                      className={styles.inlineForm}
                                      message="Opravdu chcete smazat tuto položku ceníku?"
                                    >
                                      <input type="hidden" name="id" value={item.id} />
                                      <button type="submit" className={styles.buttonDanger}>
                                        Smazat
                                      </button>
                                    </ConfirmForm>
                                  </div>
                                </td>
                              </tr>

                              {isEditing ? (
                                <tr>
                                  <td colSpan={4}>
                                    <form action={actions.updatePriceItemAction} className={`${styles.form} ${styles.pricingCompactForm}`}>
                                      <input type="hidden" name="id" value={item.id} />
                                      <div className={styles.pricingInlineFieldsThree}>
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
                                      </div>
                                      <div className={styles.pricingEditorActions}>
                                        <SubmitButton type="submit" className={styles.button}>
                                          Uložit změny
                                        </SubmitButton>
                                        <Link href={buildPricingHref(selectedCategory.id)} className={styles.buttonSecondary}>
                                          Zrušit
                                        </Link>
                                      </div>
                                    </form>
                                  </td>
                                </tr>
                              ) : null}
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
