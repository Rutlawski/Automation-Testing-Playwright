import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { text } from "../lib/text";

test("Inputs a search phrase in search input and verifies results", async ({page}) => {
    const homePage = new HomePage(page);
    const searchResultPage = new SearchResultPage(page);
    await homePage.openHomePage();
    await homePage.fillSearchInputCloth();
    await expect(searchResultPage.searchHeaderEmpty).toHaveText(text.SearchResultEmptyText);
    await homePage.fillSearchInputTop();
    const expectedText = await searchResultPage.searchHeaderTop.innerText();
    await expect(expectedText).toBe(text.SearchResultTopText);
})