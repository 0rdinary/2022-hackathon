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

    @GetMapping("/doc")
    public String getDocument(@RequestParam String id) throws Exception{
        return firebaseService.selectDocument(id);
    }

    @PostMapping("/insert")
    public String mapRequest(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);

        return firebaseService.insertDocument(param);
    }

    @GetMapping("/comment")
    public String getDocComment(@RequestParam String id) throws Exception{
        return firebaseService.selectComment(id);
    }

    @GetMapping("/documents")
    public String getDocumentsByTag(@RequestParam String tag) throws Exception {
        return firebaseService.selectDocumentsByTag(tag);
    }

    @GetMapping("/vote")
    public String vote(@RequestParam String id, @RequestParam String way) throws Exception {
        return firebaseService.vote(id, way);
    }

    @PostMapping("/edit")
    public String editDocument(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);
        return firebaseService.editDocument(param);
    }
    @GetMapping("/user")
    public String getDocumentsByWriter(@RequestParam String writer) throws Exception {
        return firebaseService.selectDocumentsByWriter(writer);
    }
    @GetMapping("/top")
    public String getTopDocuments() throws Exception {
        return firebaseService.selectTopDocuments();
    }
}
