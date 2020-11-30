from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request

driver = webdriver.Chrome()#Chrome Driver 실행
driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&authuser=0&ogbl")# 구글 이미지검색 창으로 이동
elem = driver.find_element_by_name("q")# 검색어입력창을 찾음
elem.send_keys("키움 히어로즈")# 검색어에 원하는 검색 키워드 입력
elem.send_keys(Keys.RETURN)# 엔터를 누르는것과 같음  정확히는(Keys,ENTER) 이지만 결과론적으로는 같은 실행결과를 보여줌

SCROLL_PAUSE_TIME = 1#스크롤 대기 시간
# 스크롤바의 길이를 가져옴
last_height = driver.execute_script("return document.body.scrollHeight")# 처음 스크롤 높이를 저장해놓음 ( 계속 갱신됨 )
while True:
    # 스크롤바를 아래로 내림
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")# 스크롤을 내리면서 기다림
    # 페이지 로딩할 시간을 위해 잠시 대기
    time.sleep(SCROLL_PAUSE_TIME)# 내가 입력한 시간만큼 기다림
    # 새 스크롤바를 가져왔으면 이전 스크롤바의 높이 차이를 비교하여 계산, 즉 new_height 를 갱신 시켜서 스크롤바의 높이에 대한 정보를 갱신
    new_height = driver.execute_script("return document.body.scrollHeight")# 스크롤바를 내렸는데, 더 내릴수 있으면 계속 내리는 것을 반복
    if new_height == last_height:# scrollbar를 끝까지 내렸을때 즉 더이상 내릴 수 없을때 라면
        try:# 결과 더보기 버튼이 있으면
            driver.find_element_by_css_selector(".mye4qd").click()# 결과 더보기  를 클릭해서 스크롤바를 더 내릴수 있게 확장하도록 
        except:# 결과 더보기 버튼이 없으면
            break# 오류이므로 break로 빠져나옴
    last_height = new_height# 스크롤바를 계속 내리면서 높이가 변하므로 갱신

images = driver.find_elements_by_css_selector(".rg_i.Q4LuWd")# 이미지를 선택
count = 1
for image in images:
    try:
        image.click()# 해당 이미지를 클릭
        time.sleep(2)# 해당 이미지를 로딩하는 시간을 내가 지정해서 그만큼 대기
        imgUrl = driver.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div/div/div[3]/div[2]/c-wiz/div[1]/div[1]/div/div[2]/a/img').get_attribute("src")
        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(imgUrl, "Images/"+str(count) + ".jpg")# ,(콤마) 뒤에는 원하는 디렉토리 주소를 입력해도됨 저장할 사진의 이름을 입력하면 됨 이 경우 Images 라는 파일 안에 1.jpg, 2.jpg ...이런식으로 순차적으로 저장됨
        count = count + 1
    except:# try-except 를 쓰는 이유, image.click() 부분에서 오류가 발생하기 때문 이 부분 pass로 예외처리 해주면 깔끔하다.
        pass

driver.close()# 웹 스크롤링 다하면 브라우저를 닫음
# 구글 이미지 검색에서 내가 검색하고자 하는 키워드(코드상 "키움 히어로즈" 검색)를 설정하고, 검색한 결과의 이미지들을 스크롤바를 쭉~ 내리면서 더이상 결과더보기 버튼이 없을때까지 내려감
# 그 후 맨위 첫번째 이미지부터 순차적으로 다운로드, Images 라는 폴더 안에 1.jpg, 2.jpg......순으로 자동적으로 약 2초+a 만큼의 시간당 1장의 사진이 다운로드 됨
# 위 코드를 실행하고 싶으면 ChromeDriver를 현재 Chrome version 에 맞게 설치하고 , pip install selenium , 그외에는 이 test.py를 터미널에서 실행시키면 된다.
