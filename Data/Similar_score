## 정책 유사도 배너
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# TF-IDF 벡터화
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
tfidf_matrix = vectorizer.fit_transform(df['title'])

# 코사인 유사도 계산
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# 유사한 정책 2개와 유사도 점수를 데이터프레임에 추가하는 함수
def get_similar_policies(df, cosine_sim):
    similar_policies = []
    
    for idx, row in df.iterrows():
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # 본인 제외 상위 2개 유사한 정책 선택
        top_2_similar = sim_scores[1:3]

        similar_1_id = df.iloc[top_2_similar[0][0]]["id"]
        similar_1 = df.iloc[top_2_similar[0][0]]["title"]
        score_1 = top_2_similar[0][1]
        similar_2_id = df.iloc[top_2_similar[1][0]]["id"]
        similar_2 = df.iloc[top_2_similar[1][0]]["title"]
        score_2 = top_2_similar[1][1]

        similar_policies.append({
            "s1_id" : similar_1_id,
            "s1_title": similar_1,
            "s1_score": score_1,
            "s2_id" : similar_2_id,
            "s2_title": similar_2,
            "s2_score": score_2
        })

    return pd.DataFrame(similar_policies)

# 유사한 정책 추가한 데이터프레임 생성
similar_policies_df = get_similar_policies(df, cosine_sim)
df = pd.concat([df,similar_policies_df], axis=1)
