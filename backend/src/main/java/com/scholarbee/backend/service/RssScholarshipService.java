package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.entity.RssScholarship;
import com.scholarbee.backend.global.rss.HufsScholarshipRssCrawler;
import com.scholarbee.backend.repository.RssScholarshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RssScholarshipService {

    private final HufsScholarshipRssCrawler crawler;
    private final RssScholarshipRepository repository;

    @Transactional
    public List<RssScholarship> crawlAndSave() {

        List<RssScholarship> crawled = crawler.crawl();
        List<RssScholarship> saved = new ArrayList<>();

        for (RssScholarship s : crawled) {
            if (!repository.existsByLink(s.getLink())) {
                saved.add(repository.save(s));
            }
        }

        return saved;
    }

    public List<RssScholarship> findAll() {
        return repository.findAll();
    }
}
