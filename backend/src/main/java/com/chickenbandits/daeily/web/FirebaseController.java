package com.chickenbandits.daeily.web;

import com.chickenbandits.daeily.domain.document.Comment;
import com.chickenbandits.daeily.domain.document.DocList;
import com.chickenbandits.daeily.domain.document.Document;
import com.chickenbandits.daeily.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fb")
public class FirebaseController {
    @Autowired
    FirebaseService firebaseService;

    // id로 문서 조회
    @GetMapping("/doc")
    public String getDocument(@RequestParam String id) throws Exception{
        return firebaseService.selectDocument(id);
    }

    // 문서 생성
    @PostMapping("/insert")
    public String mapRequest(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);

        return firebaseService.insertDocument(param);
    }

    // 댓글 생성
    @PostMapping("/insertComment")
    public String commentRequest(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);

        return firebaseService.insertComment(param);
    }

    // 글 id로 댓글 조회
    @GetMapping("/comment")
    public String getDocComment(@RequestParam String id) throws Exception{
        return firebaseService.selectComment(id);
    }

    // Tag에 맞는 문서목록 조회
    @GetMapping("/documents")
    public String getDocumentsByTag(@RequestParam String tag) throws Exception {
        return firebaseService.selectDocumentsByTag(tag);
    }

    // 좋아요 싫어요
    @GetMapping("/vote")
    public String vote(@RequestParam String id, @RequestParam String way) throws Exception {
        return firebaseService.vote(id, way);
    }

    // 문서수정 비밀번호 틀릴시 false
    @PostMapping("/edit")
    public boolean editDocument(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);
        return firebaseService.editDocument(param);
    }

    // writer로 문서 조회
    @GetMapping("/user")
    public String getDocumentsByWriter(@RequestParam String writer) throws Exception {
        return firebaseService.selectDocumentsByWriter(writer);
    }

    // 좋아요 상위 5개 조회
    @GetMapping("/top")
    public String getTopDocuments() throws Exception {
        return firebaseService.selectTopDocuments();
    }
}
