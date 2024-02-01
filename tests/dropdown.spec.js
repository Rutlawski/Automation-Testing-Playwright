import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test.skip("Verifies if dropdown works correctly", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomePage();
    await homepage.setsDropdownValueAsc();
    await expect(await homepage.productTitle).toHaveText("Baby Zebra with butterfly");
    await homepage.setsDefaultDropdownValue();
    await expect(await homepage.productTitle).toHaveText("Astronaut dabbing");
})