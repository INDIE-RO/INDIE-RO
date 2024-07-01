# 라이브러리 import
import pandas as pd

# 데이터프레임 불러오기
df = pd.read_csv('df_240614.csv')

### title, info, detail

from datetime import datetime

# '신청마감날짜' 열을 datetime 형식으로 변환
df['end_date'] = pd.to_datetime(df['end_date']).dt.date

# 오늘 날짜 가져오기
today = datetime.today().date()

# 모집 중인 프로젝트 추출
recruitment_open = df[(df['end_date'] >= today) | (df['end_date'].isnull())]
recruitment_open.shape

df_sp = df[['title', 'info', 'detail']]
df_sp['sp'] = df_sp.apply(lambda row: ' '.join(row.values.astype(str)), axis=1) # 열을 하나로 합침
df_sp = df_sp['sp']
df_sp


df_sp = df[['title', 'info', 'detail']]

# 열을 행으로 변환하여 하나의 데이터 프레임으로 합치기
combined_column = pd.concat([df_sp[col] for col in df_sp.columns], ignore_index=True)

# 결과를 데이터 프레임으로 변환
df_sp = pd.DataFrame(combined_column, columns=['combined'])
df_sp = df_sp['combined']
print("\nCombined DataFrame:\n", df_sp)


all = ''
for i in range(len(df_sp)):
  all += df_sp[i]
all

len(all)

# 공백을 기준으로 나누어 단어 리스트 생성
words = all.split()
from collections import Counter
# 단어 빈도 계산
word_freq = Counter(words)

# 단어 빈도가 1인 경우 제거
filtered_word_freq = {word: freq for word, freq in word_freq.items() if freq > 1}

# 빈도가 높은 순으로 정렬
sorted_word_freq = dict(sorted(filtered_word_freq.items(), key=lambda x: x[1], reverse=True))
sorted_word_freq

df_sp[df_sp.str.contains('지원금')]
df_sp.str.contains('대학').sum()

# 나눔고딕 설치
! apt-get update -qq
! apt-get install fonts-nanum* -qq

# 한글 폰트 경로 찾기 (나눔)
import matplotlib.font_manager as fm

font_list = fm.findSystemFonts(fontpaths=None, fontext='ttf')

for font in font_list :
  if 'Nanum' in font :
    print(font)

rank_text = dict(지원금=339, 자립수당=150, 장학금=78, 보증금=262, 자립=1310, 보호종료=210, 주택=203, 취업=672, 일자리=234, 창업=653, 자격증=167, 면접=246, 교육=662, 대학생=170, 대출=248)

# 워드 클라우드 생성
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import numpy as np
font_path = '/usr/share/fonts/truetype/nanum/NanumBarunGothicBold.ttf'

wc = WordCloud(font_path=font_path, background_color='white', width=800, height=600, scale=2, prefer_horizontal=1.0)
cloud = wc.generate_from_frequencies(rank_text)
plt.figure(figsize=(8,15))
plt.imshow(cloud)
plt.axis('off')
plt.show()
