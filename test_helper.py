# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


from selenium.common.exceptions import TimeoutException
import os

# xboard_index_html = "file://" + os.getenv("HTML_FILEPATH")
xboard_index_html = "file:///mnt/g/criodo/me_xboard/index.html"

def get_first_accordian_class(browser):
    # FIXME - We need to add detailed logging so that users can get whats happening behind the scenes.
    btn, div_id = find_fist_accordian_btn_and_div(browser)
    print("div_id of first accordian" + div_id)
    btn.click()
    print("Clicked on " + div_id + "now waiting for page to load")
    WebDriverWait(browser, 10).until(
        EC.visibility_of_element_located((By.ID, div_id)))
    ref_div = browser.find_element_by_id(div_id)
    print("class attribute associated with first accordian after click on expand-collapse" + ref_div.get_attribute("class"))
    return ref_div.get_attribute("class")


def find_fist_accordian_btn_and_div(browser):
    browser.get(xboard_index_html)
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn')))
    elements = browser.find_elements_by_xpath('//button')
    btn = elements[1]
    div_name = btn.get_attribute("data-target")
    return btn, div_name[1:]

def find_all_accordian_btns(browser):
    load_xboard_page_and_wait(browser)
    buttons = browser.find_elements_by_xpath('//button')
    return buttons, list(map(lambda btn: btn.get_attribute("data-target")[1:], buttons))


def load_xboard_page_and_wait(browser):
    browser.get(xboard_index_html)
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn')))
    print("loaded xboard page")


def get_courosal_element_ids(div_name):
    carousel_next_id = '//*[@id="' + div_name + '"]//*[@class="carousel-control-next-icon"]'
    carousel_active_item = '//*[@id="' + div_name + '"]//div[@class="carousel-item active"]'
    return carousel_next_id, carousel_active_item


