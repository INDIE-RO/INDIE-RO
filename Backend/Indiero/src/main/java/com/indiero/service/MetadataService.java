package com.indiero.service;

import com.indiero.domain.Metadata;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MetadataService {

    public enum MetadataType {
        CATEGORY, REGION, AGE, OPENING_STATUS, SORT_FIELD, FILTER
    }
    private static final Map<MetadataType, List<Metadata>> METADATA = Map.of(
            MetadataType.CATEGORY, List.of(
                    new Metadata(1, "일자리"),
                    new Metadata(2, "주거"),
                    new Metadata(3, "교육"),
                    new Metadata(4, "복지/문화")
            ),
            MetadataType.REGION, List.of(
                    new Metadata(1, "서울"),
                    new Metadata(2, "경기"),
                    new Metadata(3, "대구"),
                    new Metadata(4, "인천"),
                    new Metadata(5, "광주"),
                    new Metadata(6, "대전"),
                    new Metadata(7, "울산"),
                    new Metadata(8, "부산"),
                    new Metadata(9, "강원"),
                    new Metadata(10, "충북"),
                    new Metadata(11, "충남"),
                    new Metadata(12, "전북"),
                    new Metadata(13, "전남"),
                    new Metadata(14, "경북"),
                    new Metadata(15, "경남"),
                    new Metadata(16, "제주"),
                    new Metadata(17, "세종")
            ),
            MetadataType.AGE, List.of(
                    new Metadata(1, "19세 이하"),
                    new Metadata(2, "20~24세"),
                    new Metadata(3, "25~29세"),
                    new Metadata(4, "30~34세"),
                    new Metadata(5, "35세 이상")
            ),
            MetadataType.OPENING_STATUS, List.of(
                    new Metadata(1, "상시모집"),
                    new Metadata(2, "모집중"),
                    new Metadata(3, "모집예정"),
                    new Metadata(4, "마감")
            ),
            MetadataType.SORT_FIELD, List.of(
                    new Metadata(1, "마감순"),
                    new Metadata(2, "조회순")
            )
    );

    public List<Metadata> getMetadata(MetadataType type) {
        return METADATA.get(type);
    }


    // 필터 바텀시트 메타데이터
    public Map<String, List<Metadata>> getFilterBottomSheetMetadata() {
        Map<String, List<Metadata>> map = Map.of(
                "openingStatuses", METADATA.get(MetadataType.OPENING_STATUS),
                "ages", METADATA.get(MetadataType.AGE),
                "regions", METADATA.get(MetadataType.REGION)
        );

        // openingStatuses, ages, regions 순으로 정렬
        return map.entrySet().stream()
                .sorted(Comparator.comparingInt(e -> e.getValue().size()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    public String getOpeningStatusName(int id) {
        return METADATA.get(MetadataType.OPENING_STATUS).get(id-1).getName();
    }

    public List<String> convertCategoryIdsToNames(List<Integer> categoryIds) {
        return categoryIds.stream()
                .map(this::getCategoryName)
                .collect(Collectors.toList());
    }

    String getCategoryName(int categoryId) {
        return METADATA.get(MetadataType.CATEGORY).get(categoryId-1).getName();
    }

    public List<String> getAllCategoryNames() {
        return METADATA.get(MetadataType.CATEGORY).stream()
                .map(Metadata::getName)
                .collect(Collectors.toList());
    }

    public List<String> convertRegionIdsToNames(List<Integer> regionIds) {
        List<String> regionNames = regionIds.stream()
                .map(this::getRegionName)
                .collect(Collectors.toList());
        regionNames.add("중앙정부");
        return regionNames;
    }

    private String getRegionName(int regionId) {
        return METADATA.get(MetadataType.REGION).get(regionId-1).getName();
    }

    public List<String> getAllRegionNames() {
        List<String> regionNames = METADATA.get(MetadataType.REGION).stream()
                .map(Metadata::getName)
                .collect(Collectors.toList());
        regionNames.add("중앙정부");
        return regionNames;
    }
}
