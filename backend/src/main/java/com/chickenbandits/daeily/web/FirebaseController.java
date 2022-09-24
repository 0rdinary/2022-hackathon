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
    public Document getDocument(@RequestParam String id) throws Exception{
        return firebaseService.selectDocument(id);
    }

    @PostMapping("/insert")
    public String mapRequest(@RequestBody HashMap<String, Object> param) throws Exception{
        System.out.println("param : " + param);

        firebaseService.insertDocument(param);
        return param.toString();
    }

    @GetMapping("/comment")
    public ArrayList<Comment> getDocComment(@RequestParam String id) throws Exception{
        return firebaseService.selectComment(id);
    }

    // TODO: 주석 삭제 예정
//    @GetMapping("/doclist")
//    public List<DocList> getDocList() throws Exception {
//        return firebaseService.selectDocList();
//    }
//    @GetMapping("/documents")
//    public List<Document> getAllDocuments(@RequestParam String tag) throws Exception {
//        return firebaseService.selectDocumentByTag(tag);
//    }
    @GetMapping("/documents")
    public List<DocList> getAllDocuments(@RequestParam String tag) throws Exception {
        return firebaseService.selectDocuments(tag);
    }
}
