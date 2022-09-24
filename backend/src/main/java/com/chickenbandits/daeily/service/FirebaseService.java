package com.chickenbandits.daeily.service;

import com.chickenbandits.daeily.domain.document.Comment;
import com.chickenbandits.daeily.domain.document.DocList;
import com.chickenbandits.daeily.domain.document.Document;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public String insertDocument(HashMap<String, Object> param) throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> docData = new HashMap<>();

        for (String key: param.keySet()) {
            docData.put(key, docData.get(key));
        }

        docData.put("up", 0);
        docData.put("down", 0);
        ApiFuture<DocumentReference> apiFuture = db.collection(COLLECTION_DOCUMENT).add(docData);

        return apiFuture.get().getId();
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

    // TODO: 대체 예정
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

    // TODO: 대체 예정
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
    public List<DocList> selectDocuments(String tag) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        // TODO: DB의 DocList에 Tag 정보 추가
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("isPublic", true).whereEqualTo("tag",tag).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        List<DocList> docList = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            docList.add(document.toObject(DocList.class));
        }
        return docList;
    }

    public String selectDocumentTest(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Document document = null;
        ObjectMapper objectMapper = new ObjectMapper();
        String ans = "{\"id\":\""+id+"\",\"content\":";
        if(documentSnapshot.exists()) {
            document = documentSnapshot.toObject(Document.class);
        ans += objectMapper.writeValueAsString(document) + "}";
        return ans;
        }
        else {
            return "{id : ERROR}";
        }
    }
}