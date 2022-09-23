package com.chickenbandits.daeily.web;

import com.chickenbandits.daeily.domain.document.Comment;
import com.chickenbandits.daeily.domain.document.DocList;
import com.chickenbandits.daeily.domain.document.Document;
import com.chickenbandits.daeily.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @GetMapping("/comment")
    public ArrayList<Comment> getDocComment(@RequestParam String id) throws Exception{
        return firebaseService.selectComment(id);
    }

    @GetMapping("/doclist")
    public List<DocList> getDocList() throws Exception {
        return firebaseService.selectDocList();
    }

    @GetMapping("/documents")
    public List<Document> getAllDocuments() throws Exception {
        List<DocList> docList = firebaseService.selectDocList();
        List<Document> documents = new ArrayList<>();

        int docList_size = docList.size();
        for (int i = 0; i < docList_size; i++) {
            documents.add(getDocument(docList.get(i).getId()));
        }

        return documents;
    }
}
