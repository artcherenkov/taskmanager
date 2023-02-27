import { expect, Locator, Page, test } from "@playwright/test";
import { TestId } from "../src/test-ids";

test.describe("Работает создание карточки", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("Карточка создаётся по нажатию на кнопку создания", async ({ page }) => {
    await createTask(page, "hello world");

    const createdTask = await page
      .getByTestId(TestId.DEFAULT_CARD)
      .getByText(/hello world/i);

    await expect(createdTask).toBeVisible();
  });

  test("Создание карточки отменяется при нажатии на кнопку удаления", async ({
    page,
  }) => {
    await page.getByTestId(TestId.ADD_NEW_CARD).getByRole("button").click();

    const newCard = await page.getByTestId(TestId.EDIT_MODE_CARD);
    await newCard.getByTitle(/delete/i).click();

    await expect(newCard).toBeHidden();
  });

  test("Во время создания карточки невозможно создать еще одну карточку", async ({
    page,
  }) => {
    const addNewCardButton = await page
      .getByTestId(TestId.ADD_NEW_CARD)
      .getByRole("button");

    await addNewCardButton.click();

    await expect(addNewCardButton).toBeDisabled();
  });
});

test.describe("Работает редактирование карточки", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    // создать карточку и нажать кнопку редактирования
    await createTask(page, "hello world");
    const card = await page
      .getByTestId(TestId.DEFAULT_CARD)
      .getByText(/hello world/i);
    await enterCursorIntoCard(page, card);
    await page.getByText(/edit/i).click();
  });

  test("Нажатие на кнопку редактирования переводит карточку в режим редактирования", async ({
    page,
  }) => {
    await expect(page.getByTestId(TestId.EDIT_MODE_CARD)).toBeVisible();
  });

  test("Карточка удаляется по нажатию на кнопку", async ({ page }) => {
    const editingCard = page.getByTestId(TestId.EDIT_MODE_CARD);
    await editingCard.getByTitle(/delete/i).click();
    await expect(editingCard).toBeHidden();
  });

  test("У карточки редактируется название", async ({ page }) => {
    const editingCard = await page.getByTestId(TestId.EDIT_MODE_CARD);

    await editingCard.getByRole("textbox").fill("test");
    await editingCard.getByTitle(/save/i).click();
    await expect(editingCard).toBeHidden();
    const resultCard = await page
      .getByTestId(TestId.DEFAULT_CARD)
      .getByText(/test/i);

    await expect(resultCard).toBeVisible();
  });

  test("В режиме редактирования можно отменить изменение названия", async ({
    page,
  }) => {
    const editingCard = await page.getByTestId(TestId.EDIT_MODE_CARD);
    const textField = await editingCard.getByRole("textbox");
    await textField.fill("test");
    await editingCard.getByTitle(/restore/i).click();
    await expect(textField).toHaveValue(/hello world/i);
  });
});

test.describe("Работает удаление карточки", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("Карточка удаляется при нажатии на кнопку", async ({ page }) => {
    await createTask(page, "hello world");
    const card = await page
      .getByTestId(TestId.DEFAULT_CARD)
      .getByText(/hello world/i);
    await enterCursorIntoCard(page, card);
    await page.getByText(/delete/i).click();
    await expect(card).toBeHidden();
  });
});

const createTask = async (page: Page, title: string) => {
  await page.getByTestId(TestId.ADD_NEW_CARD).getByRole("button").click();

  const newCard = await page.getByTestId(TestId.EDIT_MODE_CARD);
  await newCard.getByRole("textbox").fill(title);
  await newCard.getByTitle(/save/i).click();
};

const enterCursorIntoCard = async (page: Page, card: Locator) => {
  const cardBBox = await card.boundingBox();
  if (!cardBBox) return;

  await page.mouse.move(
    cardBBox.x + cardBBox.width / 2,
    cardBBox.y + cardBBox.height / 2
  );
};
