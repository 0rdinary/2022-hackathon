package com.chickenbandits.daeily.service;

import com.chickenbandits.daeily.domain.document.Comment;
import com.chickenbandits.daeily.domain.document.DocList;
import com.chickenbandits.daeily.domain.document.Document;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FirebaseService {

    public static final String COLLECTION_DOCUMENT = "document";
    public static final String COLLECTION_DOCLIST = "docList";
    public static final String COLLECTION_COMLIST = "comment";
    public static final String COLLECTION_TAGLIST = "list";

    public void insertDocument() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> docData = new HashMap<>();
        docData.put("title", "test1");
        docData.put("writer", "admin");
        docData.put("password", "12345");
        docData.put("content", "안녕하세요 ㅎㅇㅎㅇㅎㅇ");
        docData.put("up", 2);
        docData.put("down", 15);
        ApiFuture<WriteResult> apiFuture = db.collection(COLLECTION_DOCUMENT).document("test").set(docData);
    }

    public Document selectDocument(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Document document = null;
        if(documentSnapshot.exists()) {
            document = documentSnapshot.toObject(Document.class);
            return document;
        }
        else {
            return null;
        }
    }

    public ArrayList<Comment> selectComment(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).collection(COLLECTION_COMLIST).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        ArrayList<Comment> commentList = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            commentList.add(document.toObject(Comment.class));
        }
        return commentList;
    }
    public List<DocList> selectDocList() throws Exception{
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        List<DocList> docList = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            docList.add(document.toObject(DocList.class));
        }
        return docList;
    }

    public List<Document> selectDocumentByTag(String tag) throws Exception {
        List<DocList> docList = selectDocList();
        List<Document> documents = new ArrayList<>();

        int docList_size = docList.size();
        Document doc;
        for (int i = 0; i < docList_size; i++) {
            doc = selectDocument(docList.get(i).getId());

            if (doc.getTag().equals(tag)) {
                documents.add(doc);
            }
        }
        return documents;
    }
}