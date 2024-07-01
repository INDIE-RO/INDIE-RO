package com.indiero.dto.response;

import com.indiero.domain.Word;

import java.util.List;

public class WordCloudResponse {
    private List<Word> words;

    public WordCloudResponse(List<Word> words) {
        this.words = words;
    }

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }
}

