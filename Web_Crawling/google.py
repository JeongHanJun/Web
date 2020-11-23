# selenium , webdriver, Chromedriver는 사전에 설치후 selenium folder 안에 같이 넣고 시작
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time # 사진을 src로 접근 하는 부분에서 사진 다운받는 시간을 늘려주기 위해 필요
import urllib.request # url에서 사진 다운로드


# 아래 3줄은 urllib.error.HTTPError: HTTP Error 403: Forbidden 오류를 방지하기 위해 나무위키 같은 특정 사이트를 브라우저인것 처럼 보이게 하기 위한 코드
opener = urllib.request.build_opener()
opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
urllib.request.install_opener(opener)


# driver로 웹 실행 , driver 라는 변수가 크롬을 실행하여 url로 이동하고, 검색어창까지 찾는 부분
driver = webdriver.Chrome()
driver.get("https://www.google.co.kr/imghp?hl=ko&ogbl") # 원래 https://www.google.co.kr 인데, 여기서 구글이미지 검색 사이트의 url 은 왼쪽과 같고, 지금 이 프로젝트 상에서는 이미지 검색을 사용할 것이므로 이미지 검색 url을 사용한다.
elem = driver.find_element_by_name("q") # google 사이트에서 개발자 모드로 들어가서 상단좌측의 inspect로 들어가서 마우스 커서를 구글의 검색어 입력창에 가져다 놓으면 
# <input class="gLFyf gsfi" maxlength="2048" name="q" type="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false" title="검색" value="" aria-label="검색" data-ved="0ahUKEwi9uvGs6I7tAhW8L6YKHbpkCTcQ39UDCAM">
# 라고 나온다. 여기서 find_element 의 기능은 class, id, name 등 여러가지로 할 수 있는데, name = "q" 인 부분을 가져와서 해보는 것

# 검색어 입력  , 위에서 찾은 검색어 부분에 검색 키워드 입력
# 이제 검색어를 찾는 부분까지 해결 완료, 이제는 원하는 키워드를 검색하기 위해 입력해야 한다.
elem.send_keys("키움 히어로즈") # send_keys 로 검색창에 원하는 키워드를 자동으로 입력 까지 해준다. 이 경우 실행해보면 구글 검색어창에 "키움 히어로즈" 라고 쌍따옴표를 제외하고 입력한 결과 까지 나온다.

# 이 다음 엔터키를 눌러서 검색을 실행 해야 한다.
#elem.send_keys(Keys.RETURN)
#elem.send_keys(Keys.ENTER)
# 위의 두 줄 코드는 같은 실행결과를 보여준다. 바로 위의 키움 히어로즈  라는 send_keys를 통해 받은 키워드를 입력하고 이를 검색한 실행 결과를 보여준다.
# 그럼 둘의 차이는 무엇일까???
'''
<  elem.send_keys(Keys.RETURN) 와 elem.send_keys(Keys.ENTER) 의 차이  >
엄밀히 말해서 둘은 다르다. 우선 값부터 다르다
RETURN = u'\ue006'          ENTER = u'\ue007'
일반적으로 컴퓨터 키보드에서 Enter 키는 명령 줄 혹은 창의 대화상자 기본 기능을 작동시키는 것을 의미한다.
즉 일반적으로 입력을 마치고 원하는 프로세스를 진행하는 것이고 OK 의 의미이기도 한다.
이것은 Return도 대부분 같은 실행을 한다.
깊숙히 들어가면 이 둘의 의미는 다르다. 정확히는 캐리지 리턴 의 리턴 vs 엔터키 의 차이이다.
CR (Carrige Return) vs LF (Line Feed) 
<캐리지 리턴>
타자기의 줄바꿈에서 유래되었고, 커서를 문서의 왼쪽으로 돌리는 의미를 갖는다.
즉, 한 줄에서 왼쪽끝으로 밀어주는 것이 캐리지 리턴이고
다름 줄에서 입력을 하는것이 Line Feed 이다.

DOS/Windows 계열에서는 엔터를 CR+LF(\r\n) 으로 처리하고

Unix/Linux 계열에서는 엔터를 LF(\n)으로 처리하고

MAC 계열에서는 엔터를 CR(\r)로 처리한다고 한다

어찌됬든 내가 지금 사용하는 윈도우 체제에서는 검색한 입력 결과를 실행하는 명령을 수행하는 것은 둘다 같으므로 어떤것을 사용하든 문제가 없다.

비슷한 예로 html tag 문법중 <p>  와   <br> 의 차이와 같다.
<p> 는 paragraph 즉 문단을 구분한다. 즉 </p> 를 하면 문단을 끝내고 한줄을 띄우고 그 다음 줄이 출력된다.
<br>은 강제 줄바꿈을 의미한다. </p> 처럼 한줄을 띄우려면 <br>을 두번 사용해야한다.

'''
# 입력한 검색어에 대해 검색 실행 ( Enter 키를 누른 것과 같은 실행 )
elem.send_keys(Keys.ENTER)

# 그 다음 검색까지 완료했으면 이미지를 찾아서 클릭해서 다운로드 받아야 한다.
# 검색한 사이트에서 개발자모드 (f12)로 inspect를 통해 사진에 커서를 대보면 html 구조로 알 수 있다.  키움 히어로즈로 검색하면 로고사진들부터 쭉 뜨는데 몇개 사진들의 이미지 코드는
# <img class="rg_i Q4LuWd" src="data:image/png;base64,iVBORw어쩌구저쩌구~~">
# <img class="rg_i Q4LuWd" src="data:image/jpeg;base64,/9j/4AAQS어쩌구저쩌구~~">
# <img class="rg_i Q4LuWd" src="data:image/jpeg;base64,/9j/4AAQSkZJ어쩌구저쩌구~~">
# 위의 3가지 사진은 다 다른 사진이고, 다른 사이트이다. 즉 src (source, 근원지)는 다 다르다. 하지만 img class = rg_i 로 같다. 이 부분을 이용해보면


# 전체 for문으로 다수의 사진 다운 전에 우선 1개의 사진 부터 받는 연습 아래 3따옴표 주석을 풀고 실행을 해보면 됨
'''
# 이미지 선택
driver.find_elements_by_css_selector(".rg_i Q4LuWd")
# 여기서 지금은 사진을 검색하고 다운 받는 것이니까, 사진을 1개만 검색하고 받으려면 find_element 를 쓰고, 여러개를 다운 받으려면 find_elements 를 써서 여러개의 사진들을 리스트에 담아서 다운 받는다.
# css code의 img class 에 대한 것이므로 find_elements_by_css_selector 사용 , 클래스에 대해 검색하므로 '.' 을 붙여줌
# 여기까지 선택 하는 것까지 완료


# 이미지 클릭
driver.find_elements_by_css_selector(".rg_i.Q4LuWd")[0].click()
# 위 코드까지 실행하면 키움 히어로즈라고 검색한 가장 처음의 이미지를 클릭해서 확대하여 보는 창이 뜬다.
# 그럼 여기서 이 클릭한 이미지를 다운로드 받아야 하는데, 이미지 검색의 특성상 해당 이미지의 원본 경로 즉 source 의 주소 url을 알고 있고, 다운로드를 받으려면 해당 url로 들어가서 다운로드 받으면 되겠다.
# 여기서 개발자모드의 inspect를 써서 몇가지 이미지들의 코드를 나열해 보면
# <img class="rg_i Q4LuWd" src="data:image/png;base64,iVBORw0KGgo어쩌구저쩌구~>
# <img class="rg_i Q4LuWd" src="data:image/jpeg;base64,/9j/4AAQSkZJ어쩌구저쩌구~>
# <img class="rg_i Q4LuWd" src="data:image/jpeg;base64,/9j/4AAQSkZJRgAB어쩌구저쩌구~>
# 위의 공통점을 찾아보자 class는 당연히 같은 검색어 결과로 나온것이므로 rg_i Q4LuWd 안에 속해있다. 그외에 사진의 원본주소 src = "주소 어쩌구저쩌구" 라는 정보가 있고, 사진 이름이나 크기, 정보같은 것이 포함되어 있는 코드들이다. 여기서 url로 들어가서 다운을 받아보자
# 첫번째 사진 선택후 크게 확대되었을때 확대된 사진부분에 커서를 올렸을떄의 코드이다.<img alt="키움 히어로즈 - 나무위키" class="n3VNCb" src="https://w.namu.la/s/0e60583cd7853843e777b09ea25d53c35b3bcb883e4df4cd3f092efda5dc1662f112e2625b9840b4f989c7b832a502466c9ce1be2acc90dc318993295b5100490b0a500aa1f091d12df721dfc5863387cc781212cb805f628e2c41cfb49ce69b" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd;" style="width: 434px; height: 321.568px; margin: 0px;">
# 여기서 주목해야 할것은 img alt가 아니라 class="n3VNCb" 이 부분이다. 이 class애 해당하는 url로 들어가는 코드를 짜보면
driver.find_element_by_css_selector(".n3VNCb")  # class 에 접근했다. 이제 src에 대한 부분은 어떻게 가져오는가?

# 사진 src 로 접근
# driver.find_element_by_id("idFOO").get_attribute("src") 의 구문법이다.그러면 위의 코드에 이어붙여서
time.sleep(3)   # 3초면 이미지 하나 다운받는 시간이 될거같아서 3초로 잡음
driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")# 윗줄 time.sleep을 쓰지 않고 단순히 이렇게 이 줄에 print만 붙여서 실행시키면 사진을 다 가져오지 못해서 코드가 어쩌구저쩌구 알수없는 문자열이 출력된다. 다운받는 시간을 주어야 하므로
# 이렇게 여유시간을 주고 출력하면 https://w.namu.la/s/0e60583cd7853843e777b09ea25d53c35b3bcb883e4df4cd3f092efda5dc1662f112e2625b9840b4f989c7b832a502466c9ce1be2acc90dc318993295b5100490b0a500aa1f091d12df721dfc5863387cc781212cb805f628e2c41cfb49ce69b 라는 주소를 출력함 이 주소를 클릭하면

# url에서 사진 다운로드
# python download image by url 을 검색해보면



imgUrl = driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")# 위의 접근한 url을 하나의 변수로 받는다. 
urllib.request.urlretrieve(imgUrl, "KW Heroes.jpg")# 위의 변수를 다운받고, 저장하고자 하는 이미지의 이름을 KW Heroes.jpg로 저장
'''

# 연습끝 이제 여러장의 사진을 다운받아 보자.
images = driver.find_elements_by_css_selector(".rg_i Q4LuWd")   # 다운 받을 이미지들을 images 라는 변수에 넣음
# 반복문, 어떤 내용의 반복이냐하면 , images 사진들에 대해서 각 사진들을 클릭하고 기다리고 다운받는 연산들의 반복
imgcnt = 1
for image in images:# 이미지 가져옴    
    image.click()   # 이미지 클릭
    time.sleep(5)   # 잠시 대기
    imgUrl = driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")
    urllib.request.urlretrieve(imgUrl, "KW" + str(imgcnt) + ".jpg")
    imgcnt = imgcnt + 1
# 위의  urllib.error.HTTPError: HTTP Error 403: Forbidden 오류 해결 코드와 imgUrl 이라는 변수에 이미지의 src 주소를 받고, 이를 urllib를 이용해 다운받으면 현재 이 파이썬 파일이 있는 파일 안에 이미지가 다운로드 받게 된다.
# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")   # driver.find_element -> driver 라는 변수가 ( 여기서는 Chromedriver ) 특정 부분을 찾을 수 있도록 하는 코드
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()