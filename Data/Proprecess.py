#!/usr/bin/env python
# coding: utf-8

# ### 지역

# In[1]:


# 라이브러리 불러오기
import requests
import pandas as pd
import xml.etree.ElementTree as ET

# API 호출을 위한 URL과 지역 파라미터 설정
url = 'https://www.youthcenter.go.kr/opi/youthPlcyList.do'

regions = {
    '003002001' : '서울', '003002002': '부산', '003002003' : '대구', '003002004' : '인천', '003002005' : '광주',
    '003002006' : '대전', '003002007' : '울산', '003002008' : '경기', '003002009' : '강원', '003002010' : '충북',
    '003002011' : '충남', '003002012' : '전북', '003002013' : '전남', '003002014' : '경북', '003002015' : '경남',
    '003002016' : '제주', '003002017' : '세종'
}

# 데이터를 저장할 빈 리스트 초기화
data = []
all_policy_ids = set() # 이미 추출한 정책 ID를 저장할 집합

# 지역별 API 호출
for key, value in regions.items():
  pageIndex = 1
  while True:
    params = {
        'openApiVlak' : '1c09e15e5fd4f47c0dab0e05',
        'display' : '100',
        'pageIndex' : str(pageIndex),
        'srchPolyBizSecd' : key
    }

    # API 호출
    response = requests.get(url, params=params)

    # XML 파싱
    tree = ET.ElementTree(ET.fromstring(response.content))
    root = tree.getroot()

    # XML에서 필요한 데이터 추출 - <youthPolicy> 태그
    items = root.findall('.//youthPolicy')
    if not items :
      break  # 더 이상 데이터가 없으면 반복 종료

    for item in items :
      policy_id = item.find('bizId').text if item.find('bizId') is not None else None

      # XML 태그에서 데이터 추출
      data_dict = {
          '정책ID': item.find('bizId').text,
          '정책명': item.find('polyBizSjnm').text,
          '정책소개': item.find('polyItcnCn').text,
          '지원내용': item.find('sporCn').text,
          '기간유형': item.find('prdRpttSecd').text,
          '신청기간': item.find('rqutPrdCn').text,
          '연령정보': item.find('ageInfo').text,
          '정책분야코드': item.find('polyRlmCd').text,
          '지역': value,
          '거주지및소득조건': item.find('prcpCn').text,
          '참여제한대상': item.find('prcpLmttTrgtCn').text,
          '추가단서사항': item.find('aditRscn').text,
          '학력요건': item.find('accrRqisCn').text,
          '전공요건': item.find('majrRqisCn').text,
          '취업상태': item.find('empmSttsCn').text,
          '제출서류': item.find('pstnPaprCn').text,
          '주관부처명': item.find('mngtMson').text,
          '주관부처담당자이름': item.find('mngtMrofCherCn').text,
          '주관부처담당자연락처' : item.find('cherCtpcCn').text,
          '운영기관명': item.find('cnsgNmor').text,
          '운영기관담당자이름': item.find('tintCherCn').text,
          '운영기관담당자연락처': item.find('tintCherCtpcCn').text,
          '기타사항': item.find('etct').text,
          '신청url': item.find('rqutUrla').text,
          '참고url_1':item.find('rfcSiteUrla1').text,
          '참고url_2': item.find('rfcSiteUrla2').text
      }

      data.append(data_dict)
      all_policy_ids.add(policy_id) # 정책ID 기록

    # 다음 페이지로 이동
    pageIndex += 1

# 중앙부처 API 호출
pageIndex = 1
while True:
    params = {
        'openApiVlak': '1c09e15e5fd4f47c0dab0e05',
        'display': '100',
        'pageIndex': str(pageIndex)
    }

    # API 호출
    response = requests.get(url, params=params)

    # XML 파싱
    tree = ET.ElementTree(ET.fromstring(response.content))
    root = tree.getroot()

    # XML에서 필요한 데이터 추출 - <youthPolicy> 태그
    items = root.findall('.//youthPolicy')
    if not items :
      break  # 더 이상 데이터가 없으면 반복 종료

    for item in items :
      policy_id = item.find('bizId').text if item.find('bizId') is not None else None
      if policy_id in all_policy_ids:
        continue  # 이미 추출한 정책 ID는 제외

      # XML 태그에서 데이터 추출
      data_dict = {
          '정책ID': item.find('bizId').text,
          '정책명': item.find('polyBizSjnm').text,
          '정책소개': item.find('polyItcnCn').text,
          '지원내용': item.find('sporCn').text,
          '기간유형': item.find('prdRpttSecd').text,
          '신청기간': item.find('rqutPrdCn').text,
          '연령정보': item.find('ageInfo').text,
          '정책분야코드': item.find('polyRlmCd').text,
          '지역': '중앙정부',
          '거주지및소득조건': item.find('prcpCn').text,
          '참여제한대상': item.find('prcpLmttTrgtCn').text,
          '추가단서사항': item.find('aditRscn').text,
          '학력요건': item.find('accrRqisCn').text,
          '전공요건': item.find('majrRqisCn').text,
          '취업상태': item.find('empmSttsCn').text,
          '제출서류': item.find('pstnPaprCn').text,
          '주관부처명': item.find('mngtMson').text,
          '주관부처담당자이름': item.find('mngtMrofCherCn').text,
          '주관부처담당자연락처' : item.find('cherCtpcCn').text,
          '운영기관명': item.find('cnsgNmor').text,
          '운영기관담당자이름': item.find('tintCherCn').text,
          '운영기관담당자연락처': item.find('tintCherCtpcCn').text,
          '기타사항': item.find('etct').text,
          '신청url': item.find('rqutUrla').text,
          '참고url_1':item.find('rfcSiteUrla1').text,
          '참고url_2': item.find('rfcSiteUrla2').text
      }

      data.append(data_dict)
      all_policy_ids.add(policy_id) # 정책ID 기록

    # 다음 페이지로 이동
    pageIndex += 1

# DataFrame으로 변환
df = pd.DataFrame(data)
df.head()


# In[2]:


# 결측치 대체
df = df.replace('null', '-')
df.columns # 열 출력


# ### 정책분야

# In[3]:


df['정책분야코드'].value_counts()


# In[4]:


# 정책분야코드 라벨링
policy_code_dict = {
    '023010': '일자리',
    '023020': '주거',
    '023030': '교육',
    '023040': '복지/문화'
}

# '023050' 코드를 갖는 행을 삭제
df = df[df['정책분야코드'] != '023050']

# 정책분야코드를 한글로 변경
df['정책분야'] = df['정책분야코드'].map(policy_code_dict)
df = df.drop('정책분야코드', axis = 1)
df['정책분야'].value_counts()


# ### 연령

# In[5]:


# 연령
import re
import pandas as pd

def extract_ages(data):
    # 정규표현식 패턴: \d+는 하나 이상의 숫자
    pattern = r'(\d+)'

    # 결과를 저장할 리스트
    first_numbers = []
    second_numbers = []

    for entry in data:
        if '이상' in entry:
            # "이상"이 포함된 경우
            numbers = re.findall(pattern, entry)
            if numbers:
                first_numbers.append(int(numbers[0]))
                second_numbers.append(35)  # 두 번째 숫자는 35로 설정
            else:
                first_numbers.append(None)
                second_numbers.append(None)
        elif '이하' in entry:
            # "이하"가 포함된 경우
            numbers = re.findall(pattern, entry)
            if numbers:
                first_numbers.append(0)  # 첫 번째 숫자는 0으로 설정
                second_numbers.append(int(numbers[0]))
            else:
                first_numbers.append(None)
                second_numbers.append(None)
        elif '제한없음' in entry:
            # "제한없음"이 포함된 경우
            first_numbers.append(0)  # 첫 번째 숫자는 0으로 설정
            second_numbers.append(35)  # 두 번째 숫자는 35로 설정
        else:
            # "이상"이나 "이하"가 포함되지 않은 경우
            numbers = re.findall(pattern, entry)
            if len(numbers) == 2:
                first_numbers.append(int(numbers[0]))
                second_numbers.append(int(numbers[1]))
            elif len(numbers) == 1:
                first_numbers.append(int(numbers[0]))
                second_numbers.append(int(numbers[0]))  # 두 번째 숫자가 없는 경우 첫 번째 숫자와 동일하게 채움
            else:
                first_numbers.append(None)
                second_numbers.append(None)

    # 데이터프레임 생성
    g = pd.DataFrame({
        '첫번째 숫자': first_numbers,
        '두번째 숫자': second_numbers
    })

    return g

# 함수 호출
z = extract_ages(df['연령정보'])
z.head()


# In[6]:


def generate_age_sequence(start_age, end_age):
    categories = [
        (0, 19, '1'),
        (20, 24, '2'),
        (25, 29, '3'),
        (30, 34, '4'),
        (35, float('inf'), '5')  # float('inf')를 사용하여 35세 이상을 처리
    ]

    result = ""
    for min_age, max_age, number in categories:
        if start_age <= max_age and end_age >= min_age:
            result += number

    return result

def add_age_sequence_column(df, start_col, end_col, new_col_name):
    # 새로운 열을 데이터프레임에 추가
    df[new_col_name] = df.apply(lambda row: generate_age_sequence(row[start_col], row[end_col]), axis=1)
    return df

# 새로운 열 추가
z1 = add_age_sequence_column(z, '첫번째 숫자', '두번째 숫자', 'age_sequence')
df['연령코드'] = z1['age_sequence'].values
df['연령코드']


# ### 연락처

# In[7]:


# 숫자 포함 여부 확인하는 함수 정의
def has_numbers(text):
    return bool(re.search(r'\d+', text))

# 각 행별로 연락처 찾는 함수
def find_tell (row):
  tells = [row['운영기관담당자연락처'], row['운영기관담당자이름'], row['운영기관명'], row['주관부처담당자연락처'], row['주관부처담당자이름'], row['주관부처명'], row['기타사항']]
  for tel in tells:
      if has_numbers(tel):
          return tel
  return None

# 각 열에 함수 적용하여 숫자가 포함된 열 반환
df['연락처'] = df.apply(find_tell, axis=1)

# 연락처 관련 컬럼 제거
df = df.drop(['운영기관담당자연락처', '운영기관담당자이름', '운영기관명', '주관부처담당자연락처', '주관부처담당자이름', '주관부처명', '기타사항'], axis=1)


# In[8]:


# 이상치 대체
df['연락처'] = df['연락처'].replace('00000000000', '-')


# ### URL

# In[9]:


# URL
import requests
from concurrent.futures import ThreadPoolExecutor # 병렬처리를 위해

# url 유효성 확인 함수
def check_url_alive(url):
    try:
        response = requests.get(url, timeout = 5) # 처리속도 개선을 위해 timeout 설정
        return response.status_code == 200
    except requests.RequestException :
        return None

# 각 행별로 유효한 url 찾는 함수
def find_valid_url(row):
  urls = [row['신청url'], row['참고url_1'], row['참고url_2']]
  for url in urls:
      if check_url_alive(url):
          return url
  return None

# 병렬 처리용 함수
def process_row(row):
    return find_valid_url(row)

# 멀티스레딩 사용
with ThreadPoolExecutor(max_workers=10) as executor:
    valid_urls = list(executor.map(process_row, [row for _, row in df.iterrows()]))

# 결과를 DataFrame에 추가
df['신청사이트주소'] = valid_urls
df = df.drop(['신청url', '참고url_1', '참고url_2'], axis = 1)


# In[10]:


# df[['신청url', '참고url_1', '참고url_2', '신청사이트주소']]
df['신청사이트주소'].isna().sum()


# ### 텍스트 전처리

# In[11]:


# 전공, 취업상태, 학력, 거주지및소득
# 제한없음 함수
def x_text(text):
    if text in ['제한없음', '□ 제한없음', '상관없음', '해당없음', '제한 없음', '무관', '- 제한없음', '없음', '제힌없음', '재한없음', '졔한없음', '기타', '005008',
                '-제한없음', '□  제한없음', '제한없은', '○ 거주지 : 제한없음', '□ 참여자격 : 제한없음(국민 누구나 가능)', '□ 거주지 : 제한없음', '□ 해당없음',
                '해당사항없음', '없음 (온라인 신청양식 제출로 갈음)', '별도 제출 서류 없음']:
        return '-'
    else:
        return text

# 반복문으로 나중에 변환 필요
df['거주지및소득조건'] = df['거주지및소득조건'].apply(x_text)
df['참여제한대상'] = df['참여제한대상'].apply(x_text)
df['추가단서사항'] = df['추가단서사항'].apply(x_text)
df['학력요건'] = df['학력요건'].apply(x_text)
df['전공요건'] = df['전공요건'].apply(x_text)
df['취업상태'] = df['취업상태'].apply(x_text)
df['제출서류'] = df['제출서류'].apply(x_text)


# In[12]:


# 추가단서사항, 참여제한대상, 제출서류
# 신청 사이트 방문 함수
def site_text(text):
    if text in ['공고문 참고', '자세한 내용은 공고문 참조바랍니다.', '운영기관 문의', '안내문 참고', '입주순서는 공고문 참조', '※ 공고문 유의사항 확인',
                '자세한 사항은 붙임 공고문 참조', '더 자세한 내용 제주특별자치도 홈페이지에서 알아보기', '공모전 홈페이지 참고', '복지로 홈페이지 참고',
                '계획안 참고', '신청서 및 보조금 확약서는 사업개요 맨 하단 첨부서류에서 다운 받으셔서 사용하면 됩니다.', '공고 참조', '□ 청년아지트 나와유 공고문 참고',
                '창업분야 : 일부 업종을 제외한 전 분야\n* 제외업종은 공고문에서 확인', '상세 자격요건 모집공고문 확인 필수', '※  신청 등에 대한 세부사항은 반드시 첨부된 파일, 신청사이트를 통해서 확인필수',
                '※ 기타 자세한 세부 내용은 공고문을 참고하시기 바랍니다.', '* 기타 자세한 모집요강 및 세부 내용은 공고문을 참고하시기 바랍니다.', '상세내용 첨부 파일 확인 필수', '❍공고문 참고',
                '개별 공고 참조', '공고문 참조', '참여기업 및 청년 제외대상은 첨부파일 안내문 참고', '공고문 확인 필수', '※공고문 확인', '세부 지원대상 공고문 참조', '첨부파일 공고문 참조',
                '* 공고문 참고', '*입주자 모집공고 확인', '첨부된 공고문 3페이지를 통해 확인가능', '참여요건 참조', '□ 프로그램 별 상이', '□ 참여요건 참조', '참여 제외 대상 조건은 사업 공고문 확인',
                '□ 참여요건 미충족자', '□ 지원제외 대상자 모집공고 확인 필수', '□ 공고문 참조', '모집공고문 확인', '참여대상 요건 제외자', '강릉시 홈페이지 확인', '참고사이트를 통한 관련내용 확인 필수',
                '첨부파일 공고문 참고', '지원조건 및 지원제외 대상등 참고사이트 통한 세부 확인 확인 필수', '공고 확인', '□ 공고 확인', '첨부된 공고문 참고', '공고문 확인', '- 공고문 참고',
                '첨부된 공고문 확인', '첨부파일 공고문 확인', '- 안내문 참조', '사업신청서, 사업계획서 등 첨부파일 공고문 확인', '□ 사업 공고시 참조', '참고사이트 및 공고문(첨부파일) 참고',
                '첨부파일 참고', '붙임 사업계획서 참고', '홈페이지 참고', '공고문 [붙임] 참고', "공고문 참고\n※ 입점신청서 교부 : 하동군청 홈페이지(www.hadong.go.kr) '공고고시'에서 서식 다운로드",
                '붙임 공고문 참조', '첨부된 공고문을 통해 확인', '신청 안내문 참고', '신청인 제출서류 상이하므로 사업관련 참고사이트 2 확인 필수', '지원금 신청시기별 상이\n( 관련사이트 사업공고 참조)',
                '□ 세부내용 붙임 치침 참조', '- 붙임 파일 참고', '공고 시 별도 안내', '사업관련사이트 1참고', '사업신청서 및 사업계획서 등(공고문 참조)','ㅁ 관련 사이트 참고', '지원서(사천문화재단 홈페이지 공지사항 참고)',
                '신청서 및 기타 구비서류(공고문 참고) ', '사업 관련 참고 사이트 붙임 파일 서식 참고', '관련이력 및 자기소개서(공고문 붙임 참조)', '사업신청서 외 (공고문 참고)', '지침 참고',
                '모집 공고문 확인', '지원서 (공고문 참고)', '공모신청서 (공고문 참고)', '응시원서(홈페이지에서 다운로드 가능)', '- 모집 공고 참고', '□ 신청서식 : 울산광역시 남구 일자리 포털 홈페이지 공지사항 참고',
                '▶공고문 및 참고사이트 참고', '❏공고문 참고', '※ 참고사이트 및 공고문 확인', '※참고사이트 및 공고문 확인 필수', '○ 참고사이트 및 공고문 통한 확인 필수', '○참고사이트 및 첨부된 공고문 확인 필수',
                '※ 공고문 및 참고사이트 내 붙임파일들을 통한 세부내용 확인 필수', '❏참고사이트 및 공고문 확인 필수', '공고문 및 참고사이트 확인필수', '문학/시각, 연극, 무용/음악, 전통 등 각 부문별 제출서류 확인 필요(공고문)',
                '■ 참고사이트 및 공고문 확인', '첨부파일 참조', '지원사업 운영 공고문 참조', '청년 임차보증금 이자지원사업 공고문 참고', '서울시 청년안심주택(공공지원민간임대) 임대보증금 지원 신청 안내문 참고',
                '- 세부 내용 안내문 참고', '응시원서 등 첨부파일 모집계획 참고', '사업 수행 구청/사업부서 개별 안내 참조', '미취업 청년 응시료 지원 신청페이지 참조', '□ 참여를 희망하는 프로그램 공고 확인',
                '관련서식 일체', '□ 사업공고문 확인', '공고문(첨부파일) 및 참고사이트 확인 필수', '모집공고문 참조', '충주시청 홈페이지 공고문 확인 (https://www.chungju.go.kr)',
                '□ 부여군청 홈페이지 공고문 확인 후 관련서류 제출', '□ 청년아지트 나와유 정장대여 서비스 신청하기 서비스 확인', '□ 사업공고문 참고', '□ 보령시 홈페이지 참조', '충청북도 기업진흥원 공고 확인',
                '충북인재평생교육진흥원 홈페이지 확인', '각 학사 홈페이지 확인', '복지로 https://www.bokjiro.go.kr 확인', '가치자람 홈페이지 확인', '복지로 사이트 확인 (https://www.bokjiro.go.kr/)',
                '충북광역정신건강복지센터 홈페이지 확인', '충청북도기업진흥원 홈페이지 공고 참고', '충청북도기업진흥원 공고 확인', '신청서 및 구비서류는 충북기업진흥원 홈페이지(www.cba.ne.kr) 지원사업안내(사업공고/신청) 공고문 붙임 서식 참조',
                '충북도내 시군 누리집 공지사항 확인 후', '○구비서류 : 참고사이트 및 공고문(첨부파일 확인 필수)  ※ 제출 서류는 공고일 이후 발급된 것만 인정', '※ 신청・접수 관련 세부사항은 필히 시행지침 참고요망',
                '❍ 신청서류 및 자세한 사항은 의왕시청 홈페이지 공지사항 참조', '*참고사이트 및 공고문(첨부파일) 확인', '참고사이트 및 공고문을 통한 확인 필수', '참고사이트 및 공고문 통해 상세확인 필수', '※참고사이트 및 모집안내문 확인',
                '신청사이트 및 참고사이트 참조', '공고문 첨부파일 및 참고사이트를 통한 상세내용 확인 필수', '참고사이트(양평군청 홈페이지)를 통한 상세확인 필수', '❍ 참고사이트 및 공고문 확인 필수',
                '참고사이트 및 공고문 확인필수', '❍참고사이트 및 공고문(첨부파일)확인 필수', '○참고사이트(양평군청) 공지사항 내 첨부파일 학인 필수', '참고사이트 및 공고문 참고', '❍ 참고사이트 및 공고문 확인',
                '❍ 제출서류: 화성시 청년취업끝까지 지원센터 공지사항 참고', '참고사이트 및 공고문 확인 필수', '❍참고사이트 및 공고문 참고', '□ 공고 붙임서류 참고', '□ 공지사항 신청서 다운로드 (1월중 개정)',
                '□ 입주자 모집 공고 확인요망 (광주시청 홈페이지, 광주시 청년지원센터 누리집)', '※ 해당 안내페이지 및 첨부파일 내용 필수 참고', '첨부파일 확인 필수', '첨부파일 및 참고사이트를 통한 확인필수',
                '○ 첨부파일 및  신청페이지를 통한 참여신청 시 필수 제출서류  확인\n ※ 모든 서류는 주민등록번호 뒷자리 비공개 발급 및 제출', '참고사이트 공고문 참고', '※ 참고사이트 및 첨부 파일을 통해서 필수 확인',
                '※공고문 첨부파일 및 신청페이지를 통해 필수 확인', '※ 첨부자료 및 참고사이트 통해 확인 필수', '첨부파일 및 신청사이트 내 게시된 공고문 내용 확인 필수', '- 참가신청서 및 사업계획서(공고문 참조)',
                '- 참가신청서, 사업계획서 등(공고문 참고)', '기업 및 청년센터 견학 프로그램 참여 신청서\n※ 공고문 참고', '□ 제출서류 : 가입신청서 외 (남해군 홈페이지에서 서식 다운로드 가능)',
                '사업 관련 참고사이트1 [제출서류] 확인']:
        return '신청 사이트 참고'
    else:
        return text

df['참여제한대상'] = df['참여제한대상'].apply(site_text)
df['추가단서사항'] = df['추가단서사항'].apply(site_text)
df['제출서류'] = df['제출서류'].apply(site_text)

# 결측치 대체
df = df.fillna('-')
df.shape


# ### 신청시작/마감날짜, 기간유형

# In[13]:


# 신청기간
import pandas as pd
import re

# 정규 표현식을 사용하여 날짜 포맷 추출하는 함수
def extract_dates(text):
    date_formats = re.findall(r'\d{4}[-/.년]\s*\d{1,2}[-/.월]\s*\d{1,2}\b', text) # 수정완료!
    return date_formats

# 시작 날짜와 끝 날짜 추출하는 함수
def define_start_end_dates(dates):
    start_date = dates[0] if dates else None
    end_date = dates[1] if len(dates) > 1 else None
    return start_date, end_date

# 열에 적용하기
df['Extracted_Dates'] = df['신청기간'].apply(extract_dates)
df['신청시작날짜'], df['신청마감날짜'] = zip(*df['Extracted_Dates'].apply(define_start_end_dates))

# 결과 출력
df = df.drop('Extracted_Dates', axis=1)
df[['신청시작날짜', '신청마감날짜']]


# In[14]:


# 신청시작/마감날짜 date type으로 변경
df['신청시작날짜'] = pd.to_datetime(df['신청시작날짜'], format='%Y-%m-%d', errors='coerce')
df['신청마감날짜'] = pd.to_datetime(df['신청마감날짜'], format='%Y-%m-%d', errors='coerce')


# In[15]:


# 기간유형 : 특정기간 / 상시로 변경
df['기간유형'] = df.apply(lambda row: '특정기간' if pd.notna(row['신청시작날짜']) and pd.notna(row['신청마감날짜']) else '상시', axis=1)
df['기간유형'].value_counts()


# ### 최종데이터프레임 !

# In[16]:


# 인덱스 재설정
df = df.reset_index()
df['ID'] = df.index + 1

# 조회수 칼럼 추가
df['조회수'] = 0

# 컬럼 순서 재설정
df = df[['ID', '정책ID', '정책명', '정책소개', '지원내용', '기간유형', '신청기간', '신청시작날짜', '신청마감날짜',
         '연령정보', '연령코드', '정책분야', '지역', '거주지및소득조건', '참여제한대상', '추가단서사항',
         '학력요건', '전공요건', '취업상태', '제출서류', '연락처', '신청사이트주소', '조회수']]

# 컬럼명 영어로 변경
df.columns = ['id', 'policyid', 'title', 'info', 'detail', 'duration', 'period', 'start_date', 'end_date', 'age',
              'age_code', 'category', 'region', 'residence_income', 'restriction', 'additional_info', 'education',
              'major', 'job_status', 'documents', 'contacts', 'url', 'views']

# csv로 저장
# df.to_csv('df_240614.csv', encoding='utf-8 sig', index = False)

# 최종 데이터프레임
df.head()


# ### DB에 저장

# In[18]:


import pymysql
db = pymysql.connect(host='localhost', port=3306, user='root', password='1227', db='indiero_db', charset='utf8')

from sqlalchemy import create_engine
engine = create_engine('mysql+pymysql://root:1227@localhost:3306/indiero_db')

import sqlalchemy as sa

dt = {'id': sa.types.BIGINT(),
      'policyid': sa.types.VARCHAR(255),
      'title': sa.types.VARCHAR(255),
      'info': sa.types.VARCHAR(255),
      'detail': sa.types.TEXT(),
      'duration': sa.types.VARCHAR(10),
      'period': sa.types.TEXT(),
      'start_date': sa.DATE(),
      'end_date': sa.DATE(),
      'age': sa.types.VARCHAR(15),
      'age_code': sa.types.VARCHAR(10),
      'category': sa.types.VARCHAR(10),
      'region': sa.types.VARCHAR(10),
      'residence_income': sa.types.TEXT(),
      'retriction': sa.types.VARCHAR(255),
      'additional_info': sa.types.TEXT(),
      'education': sa.types.VARCHAR(255),
      'major': sa.types.VARCHAR(255),
      'job_status': sa.types.TEXT(),
      'documents': sa.types.TEXT(),
      'contacts': sa.types.TEXT(),
      'url': sa.types.TEXT(),
      'views': sa.types.INT()
     }
df.to_sql(name='df', dtype = dt, con = engine, if_exists='replace', index = False)
