package com.indiero.controller;


import com.indiero.service.MetadataService;
import com.indiero.domain.Metadata;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/policy/metadata")
public class MetadataController {
    private final MetadataService metadataService;

    public MetadataController(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @GetMapping("/categories")
    public ResponseEntity<Map<String, List<Metadata>>> getCategories() {
        List<Metadata> metadata = metadataService.getMetadata(MetadataService.MetadataType.CATEGORY);
        return ResponseEntity.ok(Map.of("categories", metadata));
    }

    @GetMapping("/regions")
    public ResponseEntity<Map<String, List<Metadata>>> getRegions() {
        List<Metadata> metadata = metadataService.getMetadata(MetadataService.MetadataType.REGION);
        return ResponseEntity.ok(Map.of("regions", metadata));
    }

    @GetMapping("/ages")
    public ResponseEntity<Map<String, List<Metadata>>> getAges() {
        List<Metadata> metadata = metadataService.getMetadata(MetadataService.MetadataType.AGE);
        return ResponseEntity.ok(Map.of("ages", metadata));
    }

    @GetMapping("/openingStatuses")
    public ResponseEntity<Map<String, List<Metadata>>> getOpeningStatuses() {
        List<Metadata> metadata = metadataService.getMetadata(MetadataService.MetadataType.OPENING_STATUS);
        return ResponseEntity.ok(Map.of("openingStatuses", metadata));
    }

    @GetMapping("/sortFields")
    public ResponseEntity<Map<String, List<Metadata>>> getSortFields() {
        List<Metadata> metadata = metadataService.getMetadata(MetadataService.MetadataType.SORT_FIELD);
        return ResponseEntity.ok(Map.of("sortFields", metadata));
    }

    @GetMapping("/filters")
    public ResponseEntity<Map<String, List<Metadata>>> getFilterMetadata() {
        Map<String, List<Metadata>> metadata = metadataService.getFilterBottomSheetMetadata();
        return ResponseEntity.ok(metadata);
    }
}
