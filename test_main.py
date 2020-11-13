import time
import unittest
from unittest import TestCase
from test_helper import get_first_accordian_class, find_fist_accordian_btn_and_div, \
    get_courosal_element_ids, find_all_accordian_btns, load_xboard_page_and_wait
from functools import reduce
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

class Test_Main(TestCase):
    def get_web_driver(self):
        options = Options()
        options.add_argument("headless")
        options.add_argument("disable-infobars")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--no-sandbox")
        webdriver_chrome = webdriver.Chrome(options=options)
        return webdriver_chrome

    def test_first_carousel(self):
        driver = self.get_web_driver()
        btn, accordian_div = find_fist_accordian_btn_and_div(driver)
        next_element_path, active_element_path = get_courosal_element_ids(accordian_div)
        active_element = driver.find_element_by_xpath(active_element_path)
        next_element = driver.find_element_by_xpath(next_element_path)
        active_element_id = active_element.get_attribute("id")
        next_element.click()
        time.sleep(3)
        next_id, current_active_element = get_courosal_element_ids(accordian_div)
        current_active_element_id = driver.find_element_by_xpath(current_active_element).get_attribute("id")
        self.assertNotEqual(active_element_id, current_active_element_id)


    def test_accordian(self):
        accordian_class = get_first_accordian_class(self.get_web_driver())
        if not ("collapsing" in accordian_class or "show" in accordian_class) :
            self.fail("One of the class collapsing or show was expected in the accordian classes")

    def test_accordian_exists(self):
        driver = self.get_web_driver()
        btn, accordian_div = find_fist_accordian_btn_and_div(driver)
        self.assertTrue(btn.is_displayed())

    def test_at_least_one_accordian_expanded_on_load(self):
        driver = self.get_web_driver()
        btns, accordian_divs = find_all_accordian_btns(driver)
        divs_visibility = list(map(lambda div_id: driver.find_element_by_id(div_id).is_displayed(),accordian_divs))
        some_visible = reduce((lambda x, y: x or y), divs_visibility)
        self.assertTrue(some_visible)

    def test_only_three_accordians(self):
        driver = self.get_web_driver()
        btns, accordian_divs = find_all_accordian_btns(driver)
        self.assertEqual(len(accordian_divs), 3)

    def test_thirty_cards(self):
        driver = self.get_web_driver()
        load_xboard_page_and_wait(driver)
        cards_xpath = '//div[contains(@class, "card")]'
        all_cards = driver.find_elements_by_xpath(cards_xpath)
        print("number of cards in the html", len(all_cards))
        self.assertGreaterEqual(len(all_cards), 30)

    def test_one_href_related_to_gardian_covid_news(self):
        driver = self.get_web_driver()
        load_xboard_page_and_wait(driver)
        hrefs_xpath = '//div[contains(@class, "card")]//a'
        all_hrefs = driver.find_elements_by_xpath(hrefs_xpath)
        filtered_cards = list(filter(lambda href: "covid-hospital-cases" in href.get_attribute("href"), all_hrefs))
        print("number of cards in the html", len(filtered_cards))
        self.assertGreaterEqual(len(filtered_cards), 1)

    def test_mi_rcb_visible_on_first_load(self):
        driver = self.get_web_driver()
        load_xboard_page_and_wait(driver)
        cards_xpath = '//*[contains(@class, "card-text")]'
        all_cards = driver.find_elements_by_xpath(cards_xpath)
        filtered_cards = list(filter(lambda card_text : "Hello and welcome" in card_text.text, all_cards))
        print("number of cards in the html", len(filtered_cards))
        self.assertGreaterEqual(len(filtered_cards), 1)
        self.assertTrue(filtered_cards[0].is_displayed())

    def test_quim_image_is_displayed_on_first_load(self):
        img_src = 'https://cdn.flipboard.com/guim.co.uk/c018603dc3befcf6285482a0595ea756fa447fba/original.jpg'
        driver = self.get_web_driver()
        load_xboard_page_and_wait(driver)
        imgs_xpath = '//div[contains(@class, "card")]//img'
        all_images = driver.find_elements_by_xpath(imgs_xpath)
        filtered_cards = list(filter(lambda card_img : img_src == card_img.get_attribute("src"), all_images))
        print("number of cards in the html", len(filtered_cards))
        self.assertGreaterEqual(len(filtered_cards), 1)
        self.assertTrue(filtered_cards[0].is_displayed())


if __name__ == '__main__':
    unittest.main()

