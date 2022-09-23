package com.chickenbandits.daeily.web;

import com.chickenbandits.daeily.service.unit.Comment;
import com.chickenbandits.daeily.service.unit.DocList;
import com.chickenbandits.daeily.service.unit.Document;
import com.chickenbandits.daeily.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
public class IndexController {
    @Autowired
    FirebaseService firebaseService;

    @GetMapping("/api")
    public String index() {
        return "index";
    }

    @GetMapping("/api/hello")
    public String hello() { return "Hi. This is Spring speaking."; }

    @GetMapping("/api/doc")
    public Document getDocument(@RequestParam String id) throws Exception{
        return firebaseService.selectDocument(id);
    }

    @GetMapping("/api/doc/comment")
    public ArrayList<Comment> getDocComment(@RequestParam String id) throws Exception{
        return firebaseService.selectComment(id);
    }

    @GetMapping("/api/docList")
    public ArrayList<DocList> getDocList() throws Exception{
        return firebaseService.selectDocList();
    }
}
