package com.indiero.dto.response;

import com.indiero.dto.Description;
import com.indiero.dto.OtherInfo;
import com.indiero.dto.Qualification;
import com.indiero.dto.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DetailPolicyResponse {
    private Long id;
    private String title;
    private String period;
    private List<Tag> tags;
    private String url;
    private List<Description> description;
    private List<Qualification> qualification;
    private List<OtherInfo> otherInfo;

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

    public void setUrl(String url) {
        this.url = url;
    }

    public void setDescription(List<Description> description) {
        this.description = description;
    }

    public void setQualification(List<Qualification> qualification) {
        this.qualification = qualification;
    }

    public void setOtherInfo(List<OtherInfo> otherInfo) {
        this.otherInfo = otherInfo;
    }
}
