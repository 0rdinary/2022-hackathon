package com.chickenbandits.daeily.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

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

    public String selectDocument(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).get();
        DocumentSnapshot documentSnapshot = apiFuture.get();
        if(documentSnapshot.exists()) {
            return documentSnapshot.getData().toString();
        }
        return "ERROR";
    }

    public String selectComment(String id) throws Exception {
        String ans = "";
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCUMENT).document(id).collection(COLLECTION_COMLIST).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        for (DocumentSnapshot document : documents) {
//            System.out.println(document.getId() + " => " + document.getData().toString());
            ans += (document.getId() + " => " + document.getData().toString() + "\n");
        }
        return ans;
    }
    public String selectDocList() throws Exception{
        String ans = "";
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection(COLLECTION_DOCLIST).whereEqualTo("public", true).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        for (DocumentSnapshot document : documents) {
//            System.out.println(document.getId() + " => " + document.getData().toString());
            ans += (document.getId() + " => " + document.getData().toString() + "\n");
        }
        return ans;
    }
}