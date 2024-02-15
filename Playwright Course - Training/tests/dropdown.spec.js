import test, {expect} from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Verifies if dropdown works correctly", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await homepage.setDropdownValueAsc();
    await expect(homepage.dropdownElement).toHaveValue("price-asc");
    await expect(homepage.productCardTitle).toHaveText("Baby Zebra with butterfly");
    await homepage.setDropdownValueDefault();
    await expect(homepage.dropdownElement).toHaveValue("default");
    await expect(homepage.productCardTitle).toHaveText("Astronaut dabbing");
})