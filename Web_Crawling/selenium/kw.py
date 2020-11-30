from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request

driver = webdriver.Chrome()
driver.get("https://www.google.co.kr/imghp?hl=ko&ogbl")
elem = driver.find_element_by_name("q")
elem.send_keys("키움 히어로즈")
elem.send_keys(Keys.RETURN)
driver.find_elements_by_css_selector(".rg_i Q4LuWd")[1].click()
# 찾아보니 특정 사이트에서 봇이 접근하는 것을 막아서 안되는 경우가 있는데 header를 바꾸어서 실제 브라우저인 것 처럼 속이면 된다고 합니다! urllib.request.urlretrieve(imgUrl, "test.jpg") 전에 아래와 같은 코드를 추가해주시면 정상 동작합니다.

# opener=urllib.request.build_opener()
# opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
# urllib.request.install_opener(opener)
# urllib.request.urlretrieve(imgUrl, "test.jpg")
time.sleep(4)
imgurl = driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")

opener=urllib.request.build_opener()
opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(imgurl, "test.jpg")
# opener = urllib.request.build_opener()
# opener.addheaders = [('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
# urllib.request.install_opener(opener)
# urllib.request.urlretrieve(imgurl, "Images/" + str(cnt) + ".jpg")