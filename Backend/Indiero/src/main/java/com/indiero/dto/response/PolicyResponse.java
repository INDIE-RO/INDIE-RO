package com.indiero.dto.response;

import com.indiero.dto.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PolicyResponse {
    private Long id;
    private String title;
    private String period;
    private List<Tag> tags;

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
