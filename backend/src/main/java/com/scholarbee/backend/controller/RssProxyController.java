package com.scholarbee.backend.controller;

import com.scholarbee.backend.global.rss.RssBuilder;
import com.scholarbee.backend.service.RssScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rss")
@RequiredArgsConstructor
public class RssProxyController {

    private final RssScholarshipService service;
    private final RssBuilder rssBuilder;

    @GetMapping("/hufs")
    public ResponseEntity<String> rss() {

        service.crawlAndSave(); // DB 저장

        String xml = rssBuilder.build(service.findAll());

        return ResponseEntity.ok()
                .header("Content-Type", "application/xml; charset=UTF-8")
                .body(xml);
    }
}